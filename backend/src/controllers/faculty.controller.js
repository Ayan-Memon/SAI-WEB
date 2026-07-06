import facultyModel from "../models/faculty.model.js";
import imagekit from "../utils/imagekit.js";

export const getFacultiesByDepartment = async (req, res) => {
  const { department } = req.params;

  if (!department) {
    return res.status(400).json({
      success: false,
      message: "department is required",
    });
  }
  res
    .status(200)
    .json({ success: true, data: await facultyModel.find({ department }) });
};

export const uploadFaculty = async (req, res) => {
  const { name, department, gender, description } = req.body;
  const file = req.file;
  const user = req.user._id;

  if (!name || !department || !gender || !file || !description) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const descriptionArr = description
    .split(",")
    .map((curElem) => curElem.trim());

  const result = await imagekit.upload({
    file: file.buffer,
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/faculties",
  });

  const faculty = await facultyModel.create({
    user,
    name,
    department,
    gender,
    description: descriptionArr,
    imageUrl: result.url,
    fieldId: result.fileId,
  });

  res.status(201).json({ success: true, data: faculty });
};

export const deleteFaculty = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Faculty id is required",
    });
  }

  const faculty = await facultyModel.findById(id).select("fieldId");

  if (!faculty) {
    return res.status(400).json({
      success: false,
      message: "Faculty not found",
    });
  }

  await imagekit.deleteFile(faculty.fieldId);

  await facultyModel.findByIdAndDelete(id);

  return res.status(200).json({ success: true });
};

export const getAllFaculties = async (req, res) => {
  const faculties = await facultyModel.find();

  res.status(200).json({
    success: true,
    data: faculties,
  });
};
