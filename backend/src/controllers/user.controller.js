import userModel from "../models/user.model.js";

export const getUser = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const getAllUsers = async (req, res) => {
  res.status(200).json({ success: true, data: await userModel.find() });
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await userModel.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.role = role;
  await user.save();

  res.status(200).json({ success: true, message: "User role updated" });
};
