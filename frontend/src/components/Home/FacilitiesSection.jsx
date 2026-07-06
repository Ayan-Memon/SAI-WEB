"use client";
import React from "react";
import { Heading } from "../UI/Heading";
import Image from "next/image";
import Masonry from "react-masonry-css";

const facilities = [
  {
    title: "Separate Classes for Girls",
    description:
      "Dedicated learning spaces for female students, ensuring a comfortable and focused academic environment.",
    image: "/facility-img-2.jpg",
  },
  {
    title: "Indoor Sports",
    description:
      "A dedicated indoor sports area that promotes teamwork, fitness, and recreational activities in a safe and engaging environment.",
    image: "/facility-img-1.jpg",
  },
  {
    title: "Outdoor Sports",
    description:
      "Spacious outdoor grounds designed for athletic development, competitive sports, and healthy physical growth.",
    image: "/banner-img-3.jpg",
  },

  {
    title: "Library",
    description:
      "A well-stocked library providing access to academic resources, reference materials, and a quiet space for learning.",
    image: "/facility-img-3.jpg",
  },
  {
    title: "Modern Premises",
    description:
      "A clean, secure, and student-friendly campus designed to support academic excellence and personal development.",
    image: "/banner-img-1.jpg",
  },
  {
    title: "Labs",
    description:
      "State-of-the-art computer and science labs designed to foster innovation, critical thinking, and experiential learning through practical applications and experimentation.",
    image: "/banner-img-4.jpg",
  },
];

const FacilitiesSection = () => {
  const breakpointColumns = {
    default: 3,
    1024: 3,
    768: 2,
  };

  return (
    <div
      className="w-full min-h-150"
      // className="w-full h-screen snap-start"
    >
      <Heading>Facilities & Resources</Heading>
      <div className="lg:p-20 md:p-16 sm:p-10 p-4 ">
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex md:gap-6 sm:gap-4 gap-2"
          columnClassName="md:space-y-6 sm:space-y-4 space-y-2"
        >
          {facilities.map((item, index) => (
            <div
              key={index}
              className="group bg-secondary rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="lg:text-lg md:text-sm text-xs font-semibold text-primary">
                  {item.title}
                </h3>

                <p className="md:text-sm text-xs text-primary/90 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default FacilitiesSection;
