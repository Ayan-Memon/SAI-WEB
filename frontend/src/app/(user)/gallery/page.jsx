import { GalleryFolders } from "@/components/Gallery/GalleryFolders";
import React from "react";

export const metadata = {
  title: "Gallery",

  description:
    "Browse campus photos, student activities, academic events, seminars, sports, and memorable moments at Sir Adamjee Institute.",

  alternates: {
    canonical: "/gallery",
  },
};

const gallery = () => {
  return <GalleryFolders />;
};

export default gallery;
