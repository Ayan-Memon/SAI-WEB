import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import { success } from "zod";

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const getUser = (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

export const getAllUsers = async (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const cursor = req.query.cursor;
  const role = req.query.role;
  let search = req.query.search;
  search = search.toLowerCase().trim().replace("  ", " ");

  const query = {};

  if (role && role !== "all") {
    query.role = role;
  }

  if (search && search.length) {
    const regex = new RegExp(escapeRegex(search), "i");
    query.$or = [{ username: regex }, { email: regex }];
  }

  if (cursor) {
    query._id = {
      $gt: new mongoose.Types.ObjectId(cursor),
    };
  }

  const users = await userModel
    .find(query, { password: 0 })
    .sort({ _id: 1 })
    .limit(limit + 1);

  const hasNextPage = users.length > limit;

  if (hasNextPage) {
    users.pop();
  }

  const totalUsers = await userModel.countDocuments(
    role && role !== "all" ? { role } : {},
  );

  res.status(200).json({
    success: true,
    users,
    nextCursor: hasNextPage ? users[users.length - 1]._id : null,
    totalUsers,
  });
};

export const updateUserRole = async (req, res) => {
  const users = req.body.users;

  if (!users.length) {
    return res.status(400).json({
      success: false,
      message: "No users to update",
    });
  }

  await userModel.bulkWrite(
    users.map((curElem) => ({
      updateOne: {
        filter: { _id: curElem._id },
        update: { $set: { role: curElem.role } },
      },
    })),
    { ordered: false },
  );

  res.status(200).json({
    success: true,
    message: "Users Roles are updated",
  });
};
