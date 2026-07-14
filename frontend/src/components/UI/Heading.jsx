import React from "react";

export const Heading = ({ children, className }) => {
  return (
    <h1
      className={`mt-5 text-center z-10 capitalize font-heading xl:text-5xl lg:text-4xl text-3xl font-bold text-secondary px-2 ${className && className}`}
    >
      {children}
    </h1>
  );
};
