"use client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
const Btns = ({ type }) => {
  const isVerification = type === "verification";
  const router = useRouter();
  return (
    <>
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 cursor-pointer bg-primary text-black py-2 rounded-full font-medium hover:bg-primary/80 transition"
          onClick={() =>
            isVerification
              ? router.push("/resend-email")
              : router.push("/forgot-password")
          }
        >
          Resend Email
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 cursor-pointer border border-white/20 py-2 rounded-full hover:bg-white/10 transition"
          onClick={() => router.push("/login")}
        >
          Back to Login
        </motion.button>
      </div>
    </>
  );
};

export default Btns;
