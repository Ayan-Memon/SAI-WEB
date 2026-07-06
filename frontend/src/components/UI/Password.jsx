"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const Password = ({ isSignup, type, errors, register, placeholder, className }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <div className="relative w-full h-14 rounded-2xl">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={
            placeholder
              ? placeholder
              : isSignup
                ? "Create password"
                : "Enter password"
          }
          name={type}
          id={type}
          required
          autoComplete="off"
          className={
            className
              ? className
              : `w-full h-full rounded-2xl bg-neutral-100 px-5 outline-none transition-all pr-10 ${errors[type] ? "border-red-500 border-2" : "focus:border-secondary/20 border border-transparent"}`
          }
          {...register(type)}
        />
        <button
          onClick={() => setShowPassword((prev) => !prev)}
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-700"
        >
          {showPassword ? (
            <EyeOff size={24} strokeWidth={1.5} />
          ) : (
            <Eye size={24} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </>
  );
};
