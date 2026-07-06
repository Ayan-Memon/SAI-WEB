"use client";
import { MailCheck } from "lucide-react";
import Btns from "./Btns";
import { motion } from "motion/react";
export const ErrorForm = ({ email, type }) => {
  const isVerification = type === "verification";
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
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-120 space-y-2 min-h-120 w-full rounded-2xl bg-secondary m-5 p-5 text-white/90 shadow-[inset_-12px_-8px_40px_0_rgba(0,0,0,0.1)]"
      >
        <div className="w-max mx-auto p-5 bg-primary rounded-full flex justify-center items-center mt-4">
          <MailCheck size={60} className="text-secondary" />
        </div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="font-heading capitalize font-medium text-3xl text-center tracking-wide"
        >
          Check your email
        </motion.h1>
        <p className="text-center font-body tracking-wide text-gray-300">
          We&apos;ve sent a {isVerification ? "verification" : "password reset"}{" "}
          link to: <br />{" "}
          <span className="text-[#EA4335] underline">{email}</span>
        </p>
        <motion.ol
          variants={parentVarient}
          initial="hidden"
          animate="visible"
          className="list-decimal font-body tracking-wide text-gray-300 p-5 space-y-1"
        >
          <motion.li variants={childVarient}>
            {isVerification ? (
              <p>Click the link in the email to verify your account.</p>
            ) : (
              <p>Click the link in the email to reset your password.</p>
            )}
          </motion.li>
          <motion.li variants={childVarient}>
            <p>If you don&apos;t receive the email, check your spam folder.</p>
          </motion.li>
          <motion.li variants={childVarient}>
            {isVerification ? (
              <p>You can close this tab after verification.</p>
            ) : (
              <p>You can close this tab after password reset.</p>
            )}
          </motion.li>
          <motion.li variants={childVarient}>
            {isVerification ? (
              <p>Verification link expires in 15 minutes.</p>
            ) : (
              <p>Password reset link expires in 10 minutes.</p>
            )}
          </motion.li>
        </motion.ol>
        <Btns type={type} />
      </motion.div>
    </>
  );
};
