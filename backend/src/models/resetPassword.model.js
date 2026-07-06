import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  passwordResetToken: {
    type: String,
    required: [true, "Password reset token is required"],
  },
  passwordResetTokenExpireAt: {
    type: Date,
    required: [true, "Link expire at is required"],
    expires: 0,
  },
});

const passwordResetModel = mongoose.model("PasswordReset", passwordResetSchema);

export default passwordResetModel;
