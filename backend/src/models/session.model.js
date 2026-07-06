import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User is not define"],
  },
  refreshToken: {
    type: String,
    required: [true, "Refresh Token is not defined"],
  },
  ip: {
    type: String,
    required: [true, "ip is not defined"],
  },
  userAgent: {
    type: String,
    required: [true, "user agent is not defined"],
  },
  revoked: {
    type: Boolean,
    default: false,
  },
});

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;
