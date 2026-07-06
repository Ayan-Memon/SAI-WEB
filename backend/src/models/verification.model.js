import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  verificationCode: {
    type: String,
    required: [true, "Code is required"],
  },
  verificationLinkExpireAt: {
    type: Date,
    required: [true, "Link expire at is required"],
    expires: 0,
  },
});

const verificationModel = mongoose.model("Verification", verificationSchema);

export default verificationModel;
