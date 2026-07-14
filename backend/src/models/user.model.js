import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User is required"],
    },
    email: {
      type: String,
      required: [true, "Email must be required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["student", "admin", "teacher", "social_handler"],
      default: "student",
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.index({ username: 1 });

const userModel =
  mongoose.model.userModel || mongoose.model("User", userSchema);

export default userModel;
