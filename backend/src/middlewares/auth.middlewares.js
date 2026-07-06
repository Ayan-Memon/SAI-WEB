import { ACCESS_JWT_SECRET } from "../config/config.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authCheck = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }

    const decoded = jwt.verify(token, ACCESS_JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }

    const user = await userModel.findById(decoded.user).select("-password");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
