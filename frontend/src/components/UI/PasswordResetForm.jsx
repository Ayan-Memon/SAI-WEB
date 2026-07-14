"use client";
import React from "react";
import { motion } from "motion/react";
import { Password } from "./Password";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/authQueries";

const resetPasswordSchema = z
  .object({
    password: z.string().refine((val) => val === "" || val.length >= 8, {
      message: "Password must be at least 8 characters long",
    }),

    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === "" || data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

export const PasswordResetForm = ({ code }) => {
  const [topError, setTopError] = useState("");

  const router = useRouter();

  const {
    mutate: setPassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      setTopError("");
      router.push("/login");
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
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setPassword({ ...data, passwordResetToken: code });
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
        Reset Password
      </h1>
      <div className="text-center font-body tracking-wide text-gray-300 min-h-8 h-full mt-2">
        <p className="text-[#EA4335]/90 underline ">{topError && topError}</p>
      </div>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="relative pb-6">
          <label
            className="block mb-2 text-sm font-semibold text-white"
            htmlFor="email"
          >
            Password
          </label>
          <Password
            placeholder={"Create new password"}
            register={register}
            errors={errors}
            type={"password"}
            className={`w-full h-full rounded-2xl bg-white text-neutral-600 px-5 outline-none transition-all pr-10 ${errors.password ? "border-[#EA4335]/90 border-2" : "focus:border-secondary/20 border border-transparent"}`}
          />
          {errors.password && (
            <p className="text-[#EA4335]/90 absolute bottom-0 left-1 font-body text-md">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="relative pb-6">
          <label
            className="block mb-2 text-sm font-semibold text-white"
            htmlFor="email"
          >
            Confirm Password
          </label>

          <Password
            placeholder={"Confirm Password"}
            register={register}
            errors={errors}
            type={"confirmPassword"}
            className={`w-full h-full rounded-2xl bg-white text-neutral-600 px-5 outline-none transition-all pr-10 ${errors.confirmPassword ? "border-[#EA4335]/90 border-2" : "focus:border-secondary/20 border border-transparent"}`}
          />
          {errors.confirmPassword && (
            <p className="text-[#EA4335]/90 absolute bottom-0 left-1 font-body text-md">
              {errors.confirmPassword.message}
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
          {isPending && (
            <div className="h-5 w-5 mt-0.5 border-3 border-secondary rounded-full border-t-primary animate-spin"></div>
          )}
          <p>{isPending ? "Resetting..." : "Reset Password"}</p>
        </motion.button>
      </form>
    </motion.div>
  );
};
