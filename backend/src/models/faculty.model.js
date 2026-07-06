import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    name: {
      type: String,
      required: [true, "Faculty name is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image is required"],
    },
    fieldId: {
      type: String,
      required: [true, "Image id is required"],
    },
    department: {
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: Array,
      required: [true, "Description is required"],
    },
  },
  { timestamps: true },
);

facultySchema.index({ department: 1 });

const facultyModel = mongoose.model("Faculty", facultySchema);

export default facultyModel;
