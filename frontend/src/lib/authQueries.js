// authApi.js
import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

export const loginUser = async (userData) => {
  const res = await authApi.post("/auth/login", userData);
  return res.data;
};

export const registerUser = async (userData) => {
  const res = await authApi.post("/auth/register", userData);
  return res.data;
};

export const logoutUser = async () => {
  const res = await authApi.post("/auth/logout");
  return res.data;
};

export const verifyEmail = async (code) => {
  const res = await authApi.get(`/auth/verify-email?code=${code}`);
  return res.data;
};

export const forgetPasswordEmail = async (email) => {
  const res = await authApi.post(`/auth/forget-password`, email);
  return res.data;
};

export const resendEmail = async (email) => {
  const res = await authApi.post("/auth/resend-email", email);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await authApi.post(`/auth/reset-password`, data);
  return res.data;
};
