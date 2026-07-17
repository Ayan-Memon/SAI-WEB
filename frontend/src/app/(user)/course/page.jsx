import CoursesSection from "@/components/courses/CoursesSection";
import React from "react";

export const metadata = {
  title: "Courses",

  description:
    "Explore HSC Pre-Medical, Pre-Engineering, Commerce, Computer Science and other academic programs offered by Sir Adamjee Institute.",

  alternates: {
    canonical: "/course",
  },
};

const courses = () => {
  return <CoursesSection />;
};

export default courses;
