"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { forgetPasswordEmail, resendEmail } from "@/lib/authQueries";
import { useRouter } from "next/navigation";

const emailSchema = z.object({
  email: z
    .string()
    .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    }),
});

const EmailForm = ({ type }) => {
  const isForgetPassword = type === "forget-password";
  const [topError, setTopError] = useState("");
  const router = useRouter();
  const {
    mutate: emailSubmit,
    isPending,
    error,
  } = useMutation({
    mutationFn: isForgetPassword ? forgetPasswordEmail : resendEmail,
    onSuccess: (data, variables) => {
      setTopError("");
      router.push(`/verify?email=${variables.email}&type=${type}`);
    },
    onError: (error) => {
      setTopError(error?.response?.data?.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    emailSubmit(data);
  };

  const onError = (errors) => {
    setTopError("Please fill all the fields correctly");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-120 w-full rounded-2xl bg-secondary m-5 p-5 text-white shadow-[inset_-12px_-8px_40px_0_rgba(0,0,0,0.1)]"
    >
      <h1 className="font-heading capitalize font-medium text-3xl text-center tracking-wide">
        {isForgetPassword ? "Forgot your password?" : "Send Verification Email"}
      </h1>
      <div className="text-center font-body tracking-wide text-gray-300 min-h-8 h-full mt-2">
        <p className="text-[#EA4335]/90 underline ">
          {!isPending && topError && topError}
        </p>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="relative pb-6">
          <label
            className="block mb-2 text-sm font-semibold text-white"
            htmlFor="email"
          >
            Email Address
          </label>

          <input
            type="text"
            placeholder="example@email.com"
            name="email"
            id="email"
            required
            autoComplete="off"
            className={`w-full h-14 rounded-2xl text-neutral-600 bg-white px-5 outline-none transition-all ${errors.email ? "border-[#EA4335]/90 border-2" : "focus:border-secondary/20 border border-transparent"}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-[#EA4335]/90 absolute bottom-0 left-1 font-body text-md">
              {errors.email.message}
            </p>
          )}
        </div>
        <motion.button
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="w-full h-14 rounded-2xl bg-primary text-seondary  mt-3 shadow-lg shadow-black/10 cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          {!isForgetPassword ? (
            <div className="flex gap-4 justify-center items-center ">
              {isPending && (
                <div className="h-5 w-5 mt-0.5 border-3 border-secondary rounded-full border-t-primary animate-spin"></div>
              )}
              <p className="text-secondary font-semibold capitalize">
                {isPending ? "Sending Verification Email" : "Send Email"}
              </p>
            </div>
          ) : (
            <div className="flex gap-4 justify-center items-center ">
              {isPending && (
                <div className="h-5 w-5 mt-0.5 border-3 border-secondary rounded-full border-t-primary animate-spin"></div>
              )}
              <p className="text-secondary font-semibold capitalize">
                {isPending ? "Sending Reset Link" : "Send Reset Link"}
              </p>
            </div>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmailForm;
