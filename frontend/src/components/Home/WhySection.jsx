"use client";
import Image from "next/image";
import React from "react";
import { Heading } from "../UI/Heading";
import { motion } from "motion/react";
import useResize from "@/hooks/useResize";
import useMediaQuery from "@/hooks/useMediaQuery";

const features = [
  {
    id: 1,
    heading: "Academics",
    points: [
      "Quality Education at an Affordable Fee",
      "Experienced & Dedicated Faculty",
      "Merit Scholarships",
      "Financial Assistance",
    ],
  },
  {
    id: 2,
    heading: "Campus",
    points: [
      "Purpose-Built Huge Campus (10,000 sq. yards)",
      "Air-Conditioned Classrooms",
      "Stand-by Generators",
      "Personality & Moral Development",
    ],
  },
  {
    id: 3,
    heading: "Digital Learning",
    points: [
      "Learning Management System (LMS)",
      "3 Hi-Tech Computer Labs",
      "Library & E-Library (8000+ Books)",
    ],
  },
  {
    id: 4,
    heading: "Science Labs",
    points: ["Well-Equipped Science Labs"],
  },
  {
    id: 5,
    heading: "Student Life",
    points: [
      "Indoor & Outdoor Sports Facilities",
      "State-of-the-Art Auditorium (550 Persons)",
      "Cafeteria (Separate for Boys & Girls)",
    ],
  },
];

const WhySection = () => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { width } = useResize();
  return (
    <div
      className="w-full lg:min-h-250 lg:bg-[linear-gradient(rgba(45,41,38,0.12)_1px,transparent_1px)] lg:bg-size-[100%_64px] md:bg-size-[100%_44px] bg-size-[100%_34px] bg-[linear-gradient(rgba(45,41,38,0.15)_1px,transparent_1px)] relative max-lg:flex flex-col justify-center items-center mt-4"
      // className="w-full h-screen snap-start bg-[linear-gradient(rgba(45,41,38,0.12)_1px,transparent_1px)] bg-size-[100%_64px] relative "
    >
      <div
        className="absolute inset-0 pointer-events-none
        bg-linear-to-r from-primary/90 via-transparent to-primary/90"
      ></div>
      <Heading className={"relative"}>Why Sir Adamjee Institute?</Heading>
      {/* cards */}
      <div className="lg:relative grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-6 gap-4 md:px-12 sm:px-6 px-4 md:py-8 py-6">
        <WhyCard
          feature={features[0]}
          className="lg:absolute lg:top-20  lg:left-20  "
          initial={(width >= 1024 || isDesktop) && { rotate: -4 }}
        />

        <WhyCard
          feature={features[1]}
          className="lg:absolute lg:top-60  lg:left-1/2 lg:-translate-x-1/2 "
          initial={(width >= 1024 || isDesktop) && { rotate: 3 }}
        />

        <WhyCard
          feature={features[2]}
          className="lg:absolute lg:top-20  lg:right-24 "
          initial={(width >= 1024 || isDesktop) && { rotate: -5 }}
        />

        <WhyCard
          feature={features[3]}
          className="lg:absolute lg:top-135 lg:left-28 "
          initial={(width >= 1024 || isDesktop) && { rotate: 4 }}
        />

        <WhyCard
          feature={features[4]}
          className="lg:absolute lg:top-130 xl:right-52 lg:right-30  "
          initial={(width >= 1024 || isDesktop) && { rotate: -3 }}
        />
      </div>
    </div>
  );
};

export default WhySection;

const WhyCard = ({ feature, className, initial }) => {
  return (
    <motion.div
      className={` w-full flex justify-center items-center max-w-70 ${className && className}`}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0, ...initial }}
      whileHover={{ scale: 1.05, rotate: 0, cursor: "grab", zIndex: 10 }}
      whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.1 * feature.id }}
    >
      <div
        className="card rounded-3xl w-full lg:h-max h-full bg-white
    shadow-[inset_-12px_-8px_40px_#46464620] md:px-4 px-2.5 relative md:pt-14 pt-8 md:pb-4 pb-2.5"
      >
        {/* pin */}
        <Image
          src={"/pin.png"}
          alt=""
          width={50}
          height={50}
          className="absolute md:w-15 w-12 top-2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 
        drop-shadow-[10px_10px_25px_rgba(45,41,38,0.25)]"
        />
        <div className="w-full h-full flex flex-col gap-2 bg-secondary/8 rounded-2xl lg:justify-center px-2 py-2">
          <p className="font-heading lg:text-xl md:text-lg text-md font-semibold text-secondary">
            {`0${feature.id}`}
          </p>
          <h2 className="font-heading font-semibold lg:text-[1.7rem] md:text-2xl text-xl text-secondary leading-tight">
            {feature.heading}
          </h2>
          <ul className="list-disc ml-5 flex flex-col gap-1.5 font-body lg:text-[15px] md:text-sm text-xs font-medium  text-secondary ">
            {feature.points.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
