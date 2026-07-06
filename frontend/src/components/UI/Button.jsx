"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Button({ text, onClick, inverted, href }) {
  const router = useRouter();

  const handleOnClick = () => {
    if (href) {
      router.push(href);
      return;
    }
    if (onClick) {
      onClick();
    }
    return;
  };
  return (
    <motion.button
      className={`mt-4 font-body text-xl px-6 py-2 rounded-full  w-max whitespace-nowrap relative cursor-pointer group overflow-hidden ${inverted ? "bg-white text-secondary" : "bg-secondary text-white"}`}
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      variants={{
        initial: { y: 0 },
        hover: { y: -4 },
        tap: { y: 0 },
      }}
      onClick={handleOnClick}
    >
      {/* Expanding Circle Effect */}
      <motion.div
        className={`rounded-full ${inverted ? "bg-secondary" : "bg-white"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 origin-center z-0`}
        variants={{
          initial: { width: 0, height: 0, opacity: 0 },
          hover: {
            width: "180px",
            height: "180px",
            opacity: 1,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.4,
        }}
      />

      {/* Button Text */}
      <motion.span
        className="z-10 relative inline-block mix-blend-difference"
        variants={{
          initial: { color: "#ffffff" },
          hover: { color: "#ffffff" },
        }}
      >
        {text}
      </motion.span>
    </motion.button>
  );
}
