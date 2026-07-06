"use client";
import { getPost } from "@/lib/postQueries";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";
import Masonry from "react-masonry-css";
import { Heading } from "../UI/Heading";

export const Posts = ({ folder }) => {
  const breakpointColumns = {
    default: 5,
    1280: 4,
    1024: 3,
    768: 2,
  };

  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["posts", folder],
    queryFn: () => getPost(folder),
    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 10,
  });
  return (
    <section className="w-full min-h-screen">
      <Heading>{decodeURIComponent(folder)}</Heading>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex md:gap-4 gap-2 lg:px-16 lg:py-8 md:px-12 md:py-6 sm:px-8 sm:py-4 px-4 py-2"
        columnClassName="md:space-y-4 space-y-2"
      >
        {data?.map((post, index) => (
          <div
            key={post.title + index}
            className=" bg-secondary rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={1000}
                height={1000}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </Masonry>
    </section>
  );
};
