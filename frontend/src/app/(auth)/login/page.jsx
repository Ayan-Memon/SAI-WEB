import AuthForm from "@/components/UI/AuthForm";
import React from "react";

export const metadata = {
  title: "Student Login",
};

const login = () => {
  return <AuthForm type="login" />;
};

export default login;
