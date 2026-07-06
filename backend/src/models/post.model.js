import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },

    image: {
      type: String,
      required: [true, "Image is required"],
    },
    folderName: {
      type: String,
      required: [true, "Folder name is required"],
    },
    imageId: {
      type: String,
      required: [true, "Image id is required"],
    },
  },
  { timestamps: true },
);

postSchema.index({ folderName: 1 });

const postModel = mongoose.model("Post", postSchema);

export default postModel;
