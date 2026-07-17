import { Downloads } from "@/components/downloads/Downloads";
import React from "react";

export const metadata = {
  title: "Downloads",

  description:
    "Download admission forms, fee structure, prospectus, syllabus, notices, academic calendar, and other important documents.",

  alternates: {
    canonical: "/downloads",
  },
};

const downloads = () => {
  return <Downloads />;
};

export default downloads;
