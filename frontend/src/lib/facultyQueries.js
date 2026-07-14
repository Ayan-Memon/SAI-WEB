import axios from "axios";
import api from "./axios.instance";

export const getFaculties = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/faculties`,
  );
  return res.data;
};

export const uploadFaculty = async (data) => {
  const formData = new FormData();

  for (let key in data) {
    formData.append(key, data[key]);
  }

  const res = await api.post("/upload-faculty", formData);
  return res.data;
};

export const deleteFaculty = async (id) => {
  const res = await api.delete(`faculty/${id}`);
  return res.data;
};
