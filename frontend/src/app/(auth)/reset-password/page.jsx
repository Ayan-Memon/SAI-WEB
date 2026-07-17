import { PasswordResetForm } from "@/components/UI/PasswordResetForm";
import React from "react";

export const metadata = {
  title: "Reset Password",
};

const resetPassword = async ({ searchParams }) => {
  const params = await searchParams;
  const code = params.code;
  return (
    <>
      <section className="w-full max-h-screen h-full flex justify-center items-center ">
        <PasswordResetForm code={code} />
      </section>
    </>
  );
};

export default resetPassword;
