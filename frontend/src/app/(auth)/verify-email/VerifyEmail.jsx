"use client";
import { useMutation } from "@tanstack/react-query";
import Btns from "../../../components/UI/Btns";
import { motion } from "motion/react";
import { verifyEmail } from "@/lib/authQueries";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VerifyEmail = ({ code }) => {
  const [topError, setTopError] = useState("");

  const [isPending, setIsPending] = useState(true);

  const router = useRouter();

  const { mutate, error } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      setTopError("");
      setIsPending(false);
      router.push("/login");
    },
    onError: (error) => {
      setIsPending(false);
      setTopError(error?.response?.data?.message);
    },
  });

  useEffect(() => {
    mutate(code);
  }, [code, mutate]);

  const parentVarient = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const childVarient = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
      <div className="max-w-120 space-y-2 h-max w-full rounded-2xl bg-secondary m-5 p-5 text-white/90">
        <div className="w-full flex justify-center items-center min-h-15 h-full">
          {topError ? (
            <div
              className={`w-max mx-auto ${topError && "bg-red-500"}  p-5 rounded-full flex justify-center items-center mt-4`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon lucide-x"
              >
                <motion.path
                  d="M18 6 6 18"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.path
                  d="m6 6 12 12"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </svg>
            </div>
          ) : isPending ? (
            <div className="w-max mx-auto bg-secondary p-5 rounded-full flex justify-center items-center mt-4">
              <span className="p-6 border-4 border-gray-300 border-t-secondary rounded-full animate-spin"></span>
            </div>
          ) : (
            <div
              className={`w-max mx-auto ${!topError && "bg-green-500"} p-5 rounded-full flex justify-center items-center mt-4`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-check-icon lucide-check"
              >
                <motion.path
                  d="M4 12L9 17L20 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </div>
          )}
        </div>

        <h1 className="font-heading capitalize font-medium text-3xl text-center tracking-wide">
          verifying your email
        </h1>
        <div className="text-center font-body tracking-wide text-gray-300 min-h-8 h-full">
          <p className="text-[#EA4335] underline ">{topError && topError}</p>
        </div>
        <motion.ol
          variants={parentVarient}
          initial="hidden"
          animate="visible"
          className="list-decimal font-body tracking-wide text-gray-300 p-5 space-y-1 min-h-40"
        >
          {topError ? (
            <>
              <motion.li variants={childVarient}>
                <p>Couldn&apos;t verify your email.</p>
              </motion.li>
              <motion.li variants={childVarient}>
                <p>The verification link is invalid or expired.</p>
              </motion.li>
              <motion.li variants={childVarient}>
                <p>Request a new verification email below.</p>
              </motion.li>
            </>
          ) : isPending ? (
            <>
              <motion.li variants={childVarient}>
                <p>Verifying...</p>
              </motion.li>

              <motion.li variants={childVarient}>
                <p>Please wait while we verify your email.</p>
              </motion.li>
            </>
          ) : (
            <>
              <motion.li variants={childVarient}>
                <p>Email verified</p>
              </motion.li>
              <motion.li variants={childVarient}>
                <p>Your email has been verified successfully</p>
              </motion.li>
            </>
          )}
        </motion.ol>
        <Btns />
      </div>
    </>
  );
};

export default VerifyEmail;
