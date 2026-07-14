import React from "react";
import { AnimatePresence, motion } from "motion/react";

const NavbarHover = ({ children, isHovered, className }) => {
  return (
    <>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`${className && className} bg-primary backdrop-blur-md outline-8 outline-secondary/30 mt-9 rounded-xl space-y-2 w-max`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarHover;
