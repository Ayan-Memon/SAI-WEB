import FacultyPage from "@/components/faculty/FacultyPage";
import React from "react";

export const metadata = {
  title: "Faculty",

  description:
    "Meet the experienced and qualified faculty members dedicated to providing quality education at Sir Adamjee Institute.",

  alternates: {
    canonical: "/faculty",
  },
};

const page = () => {
  return <FacultyPage />;
};

export default page;
