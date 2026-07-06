import { Posts } from "@/components/Gallery/Posts";

import React from "react";

const postPage = async ({ params }) => {
  const { folder } = await params;

  return (
    <Posts folder={folder} />
  );
};

export default postPage;
