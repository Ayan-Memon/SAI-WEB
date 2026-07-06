"use client";

import { loginUser, registerUser } from "@/lib/authQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { Password } from "./Password";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authSlice";

const signUpSchema = z
  .object({
    username: z.string().refine((val) => val === "" || val.length >= 3, {
      message: "Username must be at least 3 characters long",
    }),

    email: z
      .string()
      .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Please enter a valid email address",
      }),

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

const loginSchema = z.object({
  email: z
    .string()
    .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address",
    }),

  password: z.string().refine((val) => val === "" || val.length >= 8, {
    message: "Password must be at least 8 characters long",
  }),
});

const AuthForm = ({ type }) => {
  const isSignup = type === "signup";

  const [topError, setTopError] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

  const {
    mutate: submitAuth,
    isPending,
    error,
  } = useMutation({
    mutationFn: isSignup ? registerUser : loginUser,
    onSuccess: (data) => {
      setTopError("");
      if (isSignup) {
        router.push(`/verify?email=${data.user.email}&type=verification`);
      } else {
        dispatch(
          setCredentials({
            user: data.user,
            accessToken: data.accessToken,
            isAuthenticated: true,
          }),
        );
        router.push(
          data.user.role === "admin" || data.user.role === "social_handler"
            ? "/dashboard"
            : "/",
        );
      }
    },
    onError: (err) => {
      setTopError(err?.response?.data?.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: isSignup ? zodResolver(signUpSchema) : zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    submitAuth(data);
  };

  const onError = (errors) => {
    setTopError("Please fill all the fields correctly");
  };

  return (
    <section className="w-full m-auto py-8 bg-primary p-5 flex items-center justify-center lg:h-full h-max">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-6xl bg-white rounded-4xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05),0_30px_80px_rgba(0,0,0,0.08)] grid lg:grid-cols-2"
      >
        {/* LEFT SIDE */}

        <div className="relative bg-secondary text-white px-10 md:px-16 py-20 flex flex-col justify-center overflow-hidden">
          {/* CIRCLES */}

          <div className="absolute w-70 h-70 rounded-full bg-white/5 -top-24 -right-20" />

          <div className="absolute w-70 h-70 rounded-full bg-white/5 -bottom-20 -left-16" />

          {/* LOGO */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-10 left-10 text-2xl font-bold tracking-wide"
          >
            SAI INSTITUTE
          </motion.div>

          {/* CONTENT */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl leading-tight font-bold mb-6"
          >
            Start <br /> Your Learning <br />
            Journey.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 leading-8 max-w-md"
          >
            {isSignup
              ? "Register now and explore a modern learning environment designed for future innovators."
              : "Login to your account and unlock a world of knowledge and opportunities."}
          </motion.p>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center px-6 py-14 md:px-14">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md"
          >
            <h2 className="text-5xl font-bold text-secondary mb-3">
              {isSignup ? "Create Account" : "Login Account"}
            </h2>

            <p className="text-[#7a746d] leading-7 mb-8">
              Enter your details and start your journey today.
            </p>

            {/* GOOGLE BTN */}

            <motion.button
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="w-full h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center gap-3 text-secondary font-semibold shadow-sm cursor-pointer"
            >
              <FcGoogle size={24} />
              Continue with Google
            </motion.button>

            {/* SEPARATOR */}

            <div className="flex items-center gap-4 mt-8 ">
              <div className="h-px flex-1 bg-black/10" />

              <span className="text-sm text-[#8d857d]">OR</span>

              <div className="h-px flex-1 bg-black/10" />
            </div>

            {/* ERROR */}

            <div className="w-full h-10 flex items-center justify-center">
              <AnimatePresence>
                {topError && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ ease: "easeOut", duration: 0.5 }}
                    className="text-red-500 text-center font-wide font-body text-lg"
                  >
                    {topError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            {/* FORM */}

            <form
              className="space-y-1"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              {/* NAME */}

              {isSignup && (
                <div className="relative pb-6">
                  <label
                    className="block mb-2 text-sm font-semibold text-secondary"
                    htmlFor="username"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="John Doe"
                    name="username"
                    id="username"
                    required
                    autoComplete="off"
                    className={`w-full h-14 rounded-2xl bg-neutral-100 px-5 outline-none   transition-all ${errors.username ? "border-red-500 border-2" : "focus:border-secondary/20 border border-transparent"}`}
                    {...register("username")}
                  />
                  {errors.username && (
                    <p className="text-red-500 absolute left-1 bottom-0 font-body text-md">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              )}

              {/* EMAIL */}

              <div className="relative pb-6">
                <label
                  className="block mb-2 text-sm font-semibold text-secondary"
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
                  className={`w-full h-14 rounded-2xl bg-neutral-100 px-5 outline-none   transition-all ${errors.email ? "border-red-500 border-2" : "focus:border-secondary/20 border border-transparent"}`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 absolute bottom-0 left-1 font-body text-md">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}

              <div className="relative pb-6">
                <label
                  className="block mb-2 text-sm font-semibold text-secondary"
                  htmlFor="password"
                >
                  Password
                </label>

                <Password
                  isSignup={isSignup}
                  type={"password"}
                  errors={errors}
                  register={register}
                />
                {errors.password && (
                  <p className="text-red-500 absolute bottom-0 left-1 font-body text-md">
                    {errors.password.message}
                  </p>
                )}
                {!isSignup && (
                  <div className="block text-right text-sm mt-0.5 font-body text-wide text-blue-600 underline">
                    <Link href="/forgot-password">forget password?</Link>
                  </div>
                )}
              </div>

              {/* CONFIRM PASSWORD */}

              {isSignup && (
                <div className="relative pb-6">
                  <label
                    className="block mb-2 text-sm font-semibold text-secondary"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>

                  <Password
                    isSignup={isSignup}
                    type={"confirmPassword"}
                    errors={errors}
                    placeholder={"Confirm password"}
                    register={register}
                  />

                  {errors.confirmPassword && (
                    <p className="text-red-500 absolute bottom-0 left-1 font-body text-md">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              )}

              {/* BUTTON */}

              <motion.button
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-14 rounded-2xl bg-secondary  mt-3 shadow-lg shadow-black/10 cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                {isSignup ? (
                  <div className="flex gap-4 justify-center items-center ">
                    {isPending && (
                      <div className="h-5 w-5 mt-0.5 border-3 border-gray-300 rounded-full border-t-secondary animate-spin"></div>
                    )}
                    <p className="text-white font-semibold">
                      {isPending ? "Creating Account" : "Create Account"}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-4 justify-center items-center ">
                    {isPending && (
                      <div className="h-5 w-5 mt-0.5 border-3 border-gray-300 rounded-full border-t-secondary animate-spin"></div>
                    )}
                    <p className="text-white font-semibold">
                      {isPending ? "Logging In" : "Login"}
                    </p>
                  </div>
                )}
              </motion.button>
            </form>

            {/* LOGIN / SIGNUP */}

            <Link href={isSignup ? "/login" : "/signup"}>
              <p className="text-center text-sm text-[#7a746d] mt-7">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <span className="text-secondary font-semibold cursor-pointer">
                  {isSignup ? "Login" : "Sign Up"}
                </span>
              </p>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default AuthForm;
