// security
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  emailZodSchema,
  forgetPasswordZodSchema,
  loginZodSchema,
  registerZodSchema,
  zodErrorValidator,
} from "../validators/auth.validator.js";
// modles
import userModel from "../models/user.model.js";
import verificationModel from "../models/verification.model.js";
import sessionModel from "../models/session.model.js";
import passwordResetModel from "../models/resetPassword.model.js";
// email
// import { sendEmail } from "../services/email/resend.email.service.js";  <RESEND EMAIL SERVICE>
// import sendEmail from "../services/email/nodemailer.email.service.js"; <NODEMAILER EMAIL SERVICE>
import sendEmail from "../services/email/brevo.email.service.js";
import sendEmail from "../services/email/nodemailer.email.service.js";
import verifyEmailTemplate from "../services/email/templates/verifyEmail.template.js";
import forgetPasswordTemplate from "../services/email/templates/forgetPassword.template.js";
// config
import {
  ACCESS_JWT_SECRET,
  REFRESH_JWT_SECRET,
  NODE_ENV,
  FRONTEND_URL,
} from "../config/config.js";

export const register = async (req, res) => {
  const { refreshToken } = req.cookies;
  const validation = registerZodSchema.safeParse(req.body);

  if (refreshToken) {
    return res.status(409).json({
      success: false,
      message: "Already logged in",
    });
  }

  if (!validation.success) {
    zodErrorValidator(validation, res);
  }

  const { username, email, password, confirmPassword } = validation.data;

  // check if user exist

  const user = await userModel.findOne({ email });

  if (user) {
    return res.status(409).json({
      success: false,
      message: "Email already registered",
    });
  }

  if (password !== confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Password does not match",
    });
  }

  // hash password

  const hashedPassword = await bcrypt.hash(password, 10);

  // create user

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  //  genrate verification code
  const verificationCode = crypto.randomBytes(32).toString("hex");
  const hexVerificationCode = crypto
    .createHash("sha256")
    .update(verificationCode)
    .digest("hex");

  // create verification
  const verification = await verificationModel.create({
    user: newUser._id,
    email,
    verificationCode: hexVerificationCode,
    verificationLinkExpireAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  //   send verification email
  const verificationLink = `${FRONTEND_URL}/verify-email?code=${verificationCode}`;

  const subject = "Verify your email";

  const html = verifyEmailTemplate(verificationLink);

  await sendEmail(email, subject, html);

  // await sendEmail(email, subject, "Verification Link", html);

  //   const refreshToken = jwt.sign({ user: newUser._id }, REFRESH_JWT_SECRET, {
  //     expiresIn: "7d",
  //   });

  //   const hashRefreshToken = crypto
  //     .createHash("sha256")
  //     .update(refreshToken)
  //     .digest("hex");

  //   res.cookie("refreshToken", refreshToken, {
  //     httpOnly: true,
  //     secure: NODE_ENV === "production",
  //     sameSite: NODE_ENV === "production" ? "none" : "strict",
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });

  //   const session = await sessionModel.create({
  //     user: newUser._id,
  //     refreshToken: hashRefreshToken,
  //     ip: req.ip,
  //     userAgent: req.headers["user-agent"],
  //   });

  //   const accessToken = jwt.sign(
  //     { user: newUser._id, session: session._id },
  //     ACCESS_JWT_SECRET,
  //     {
  //       expiresIn: "15m",
  //     },
  //   );

  res.status(201).json({
    success: true,
    message: "User registered successfully & verification link is sended",
    user: {
      username: newUser.username,
      email: newUser.email,
      verified: newUser.verified,
    },
  });
};
export const login = async (req, res) => {
  const validation = loginZodSchema.safeParse(req.body);
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    return res.status(409).json({
      success: false,
      message: "You are already logged in",
    });
  }

  if (!validation.success) {
    zodErrorValidator(validation, res);
  }

  const { email, password } = validation.data;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (!user.verified) {
    return res.status(401).json({
      success: false,
      message: "You are not verified",
    });
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      success: false,
      message: "Wrong Password",
    });
  }

  const newRefreshToken = jwt.sign({ user: user._id }, REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });

  const hashRefreshToken = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const session = await sessionModel.create({
    user: user._id,
    refreshToken: hashRefreshToken,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  const accessToken = jwt.sign(
    { user: user._id, session: session._id },
    ACCESS_JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.status(200).json({
    success: true,
    message: "Login successfully",
    user: {
      username: user.username,
      email: user.email,
      role: user.role,
      verified: user.verified,
    },
    accessToken,
  });
};
export const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  try {
    jwt.verify(refreshToken, REFRESH_JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  const hashRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshToken: hashRefreshToken,
    revoked: false,
  });

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  const user = await userModel.findOne({ _id: session.user });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user not found",
    });
  }

  if (!user.verified) {
    return res.status(401).json({
      success: false,
      message: "You are not verified",
    });
  }

  const newRefreshToken = jwt.sign({ user: user._id }, REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });

  const newHashRefreshToken = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  session.refreshToken = newHashRefreshToken;
  await session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  const accessToken = jwt.sign(
    { user: user._id, session: session._id },
    ACCESS_JWT_SECRET,
    {
      expiresIn: "15m",
    },
  );

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    accessToken,
  });
};

export const sendVerificationEmail = async (req, res) => {
  const validation = emailZodSchema.safeParse(req.body);

  if (!validation.success) {
    zodErrorValidator(validation, res);
  }

  const { email } = validation.data;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.verified) {
    return res.status(401).json({
      success: false,
      message: "User is already verified",
    });
  }

  const verificationCode = crypto.randomBytes(32).toString("hex");

  const hashCode = crypto
    .createHash("sha256")
    .update(verificationCode)
    .digest("hex");

  const verification = await verificationModel.create({
    user: user._id,
    email,
    verificationCode: hashCode,
    verificationLinkExpireAt: new Date(Date.now() + 15 * 60 * 1000),
  });

  const verificationLink = `${FRONTEND_URL}/verify-email?code=${verificationCode}`;

  const subject = "Verify your email";

  const html = verifyEmailTemplate(verificationLink);

  await sendEmail(email, subject, html);

  // await sendEmail(email, subject, "Verification Link", html);

  res.status(200).json({
    success: true,
    message: "Verification email sent successfully",
  });
};
export const verifyEmail = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(404).json({
      success: false,
      message: "Code is required",
    });
  }

  const hashCode = crypto.createHash("sha256").update(code).digest("hex");

  const verification = await verificationModel.findOne({
    verificationCode: hashCode,
  });

  if (!verification) {
    return res.status(401).json({
      success: false,
      message: "Invalid code or code is expired",
    });
  }

  if (Date.now() > verification.verificationLinkExpireAt) {
    return res.status(401).json({
      success: false,
      message: "Link is expired",
    });
  }

  const user = await userModel.findById(verification.user);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (user.verified) {
    return res.status(401).json({
      success: false,
      message: "User is already verified",
    });
  }

  user.verified = true;

  await user.save();

  await verification.deleteOne();

  res.status(200).json({
    success: true,
    message: "Email verified successfully",
  });
};
// for reset password link in email
export const forgetPasswordRequest = async (req, res) => {
  const validation = emailZodSchema.safeParse(req.body);

  if (!validation.success) {
    zodErrorValidator(validation, res);
  }

  const { email } = validation.data;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const passwordReset = await passwordResetModel.findOne({
    user: user._id,
  });

  if (passwordReset) {
    await passwordReset.deleteOne();
  }

  const passwordResetToken = crypto.randomBytes(32).toString("hex");

  const hashedPasswordResetToken = crypto
    .createHash("sha256")
    .update(passwordResetToken)
    .digest("hex");

  const passwordResetTokenExpireAt = new Date(Date.now() + 10 * 60 * 1000);

  await new passwordResetModel({
    user: user._id,
    passwordResetToken: hashedPasswordResetToken,
    passwordResetTokenExpireAt,
  }).save();

  // backend url
  const passwordResetLink = `localhost:3000/api/auth/forget-password?token=${passwordResetToken}`;

  const html = forgetPasswordTemplate(passwordResetLink);

  // await sendEmail(email, "Reset Password", html);

  await sendEmail(email, "Reset Password", "Reset Your Password", html);

  res.status(200).json({
    success: true,
    message: "Email sent successfully",
  });
};
export const forgetPassword = async (req, res) => {
  const validation = forgetPasswordZodSchema.safeParse(req.body);

  if (!validation.success) {
    zodErrorValidator(validation, res);
  }

  const { password, confirmPassword, passwordResetToken } = validation.data;

  const hashedPasswordResetToken = crypto
    .createHash("sha256")
    .update(passwordResetToken)
    .digest("hex");

  const passwordReset = await passwordResetModel.findOne({
    passwordResetToken: hashedPasswordResetToken,
  });

  if (!passwordReset) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or token is expired",
    });
  }

  if (Date.now() > passwordReset.passwordResetTokenExpireAt) {
    return res.status(401).json({
      success: false,
      message: "Token is expired",
    });
  }

  const user = await userModel.findById(passwordReset.user);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  if (password !== confirmPassword) {
    return res.status(401).json({
      success: false,
      message: "Password and confirm password do not match",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;

  await user.save();

  await passwordReset.deleteOne();

  res.status(201).json({
    success: true,
    message: "Password reset successfully",
  });
};
export const loginOut = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  try {
    jwt.verify(refreshToken, REFRESH_JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  const hashRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const session = await sessionModel.findOne({
    refreshToken: hashRefreshToken,
    revoked: false,
  });

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
export const loginOutAll = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  let decodedRefreshToken = {};

  try {
    decodedRefreshToken = jwt.verify(refreshToken, REFRESH_JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "You are not logged in",
    });
  }

  await sessionModel.updateMany(
    { user: decodedRefreshToken.user, revoked: false },
    { revoked: true },
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out all successfully",
  });
};
