"use client";
import Link from "next/link";

export const NavLinks = ({
  ref, // React 19 direct ref
  page,
  idx,
  setIsHovered,
  setIsOpen,
  resize,
  showHoverBg,
}) => {
  // 🌟 handleMouseEnter delete kar diya, movement ab parent ka effect handle karega

  return (
    <Link
      href={page.link}
      ref={ref}
      // Bas parent ki state update karo on mouse entry/leave
      onMouseEnter={() => {
        setIsHovered(idx);
      }}
      onMouseLeave={() => {
        setIsHovered(null);
      }}
      onClick={() => (resize <= 1024 ? setIsOpen(false) : null)}
      className={`xl:py-2 lg:py-3 py-4 px-4 relative xl:text-lg md:text-md text-sm font-heading capitalize cursor-pointer max-lg:border-b border-b-secondary/30 block lg:inline-block`}
    >
      <span
        className={`relative z-10 transition-colors duration-200 ${
          showHoverBg ? "text-white" : "text-secondary"
        }`}
      >
        {page.name}
      </span>
    </Link>
  );
};
