import AuthForm from "@/components/UI/AuthForm";
import React from "react";

export const metadata = {
  title: "Create Account",
};

const signup = () => {
  return <AuthForm type="signup" />;
};

export default signup;
