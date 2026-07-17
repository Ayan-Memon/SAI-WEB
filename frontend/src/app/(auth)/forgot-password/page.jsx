import EmailForm from "@/components/UI/EmailForm";
import React from "react";

export const metadata = {
  title: "Forget Password",
};

const forgotPassword = () => {
  return (
    <>
      <section className="w-full max-h-screen h-full flex justify-center items-center ">
        <EmailForm type={"forget-password"} />
      </section>
    </>
  );
};

export default forgotPassword;
