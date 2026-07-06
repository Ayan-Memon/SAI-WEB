import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export const getFaculties = async () => {
  const res = await api.get("/faculties");
  return res.data;
};
