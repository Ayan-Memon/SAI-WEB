import imagekit from "../utils/imageKit.js";
import postModel from "../models/post.model.js";

// upload posts
export const uploadPosts = async (req, res) => {
  const files = req.files || [];
  let { folderName } = req.body;
  const user_id = req.user._id;

  if (!folderName) {
    return res.status(400).json({
      success: "false",
      message: "foldername is required",
    });
  }

  folderName = folderName.trim();

  if (files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
  }

  const uploaded = [];
  const failed = [];

  for (const file of files) {
    try {
      // safety check (extra layer)
      if (!file) continue;

      const result = await imagekit.upload({
        file: file.buffer,
        fileName: `${Date.now()}-${file.originalname}`,
        folder: "/posts",
        useUniqueFileName: true,
      });

      uploaded.push({
        user: user_id,
        image: result.url,
        title: file.originalname,
        folderName,
        imageId: result.fileId,
      });
    } catch (err) {
      failed.push({
        file: file?.originalname,
        reason: "Upload failed (size/type/server issue)",
      });
    }
  }

  if (uploaded.length > 0) {
    await postModel.insertMany(uploaded);
  }

  return res.status(201).json({
    success: true,
    uploaded,
    failed,
  });
};

// get all folder names
export const getAllFolderNames = async (req, res) => {
  const folders = await postModel.aggregate([
    {
      $group: {
        _id: "$folderName",
        totalImages: { $sum: 1 },
        coverImage: { $first: "$image" },
      },
    },
    {
      $project: {
        _id: 0,
        folderName: "$_id",
        totalImages: 1,
        coverImage: 1,
      },
    },
  ]);
  res.status(200).json({ success: true, folders });
};

export const getPostByFolderName = async (req, res) => {
  const { folderName } = req.query;

  if (!folderName) {
    return res.status(400).json({
      success: false,
      message: "Folder name is required",
    });
  }
  res
    .status(200)
    .json({ success: true, data: await postModel.find({ folderName }) });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Post id is required",
    });
  }

  const post = await postModel.findById(id).select("imageId");

  if (!post) {
    return res.status(400).json({
      success: false,
      message: "Post not found",
    });
  }

  await imagekit.deleteFile(post.imageId);

  await postModel.findByIdAndDelete(id);

  return res.status(200).json({ success: true });
};
