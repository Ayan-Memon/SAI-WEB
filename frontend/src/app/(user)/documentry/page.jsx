import { Documentry } from "@/components/documentry/Documentry";
import React from "react";

export const metadata = {
  title: "Documentary",

  description:
    "Watch the official documentary of Sir Adamjee Institute and explore its history, achievements, campus, and academic journey.",

  alternates: {
    canonical: "/documentary",
  },
};

const page = () => {
  return <Documentry />;
};

export default page;
