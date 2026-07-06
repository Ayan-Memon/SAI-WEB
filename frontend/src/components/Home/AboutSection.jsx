"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { Heading } from "../UI/Heading";
import { motion, useScroll, useTransform } from "motion/react";
import useResize from "@/hooks/useResize";
import useMediaQuery from "@/hooks/useMediaQuery";

const AboutSection = () => {
  const targetRef = useRef(null);

  const { width } = useResize();

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    console.log(scrollYProgress);
  }, [scrollYProgress]);

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);
  return (
    <div
      className="w-full h-max"
      // className="w-full h-screen snap-start"
    >
      <Heading className={"lg:mt-20 md:mt-16 mt-5"}>
        22+ Years of Excellence
      </Heading>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full h-max lg:py-14">
        <div className="flex justify-center items-center px-4 lg:py-10 sm:py-8 py-5 w-full h-full relative">
          <motion.div
            className="w-full h-full flex justify-center items-center z-10"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, amount: 0.8, delay: 0.2 }}
          >
            <Image
              src="/building.png"
              alt=""
              width={400}
              height={200}
              className="w-full xl:max-w-180 lg:max-w-160 md:max-w-140 sm:max-w-120 max-w-100 grayscale-70 z-10"
            />
          </motion.div>
          <div className="circle lg:w-95 lg:h-95 md:w-100 md:h-100 sm:w-90 sm:h-90 w-40 h-40 bg-secondary rounded-full  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"></div>
        </div>
        <div
          className="w-full h-full  px-4 flex justify-center items-center relative overflow-hidden"
          ref={targetRef}
        >
          <motion.div
            className="flex flex-col lg:gap-20 md:gap-6 gap-4 lg:absolute lg:px-6 md:px-4 px-2"
            style={width >= 1024 || isDesktop ? { y } : { y: "0%" }}
          >
            <p className="font-body md:text-md sm:text-sm text-xs font-normal leading-relaxed text-wide text-secondary">
              For over 22 years, we have been dedicated to delivering
              exceptional education while embracing innovation, technology, and
              academic excellence. Our institution has built a strong reputation
              for nurturing young minds, fostering intellectual curiosity, and
              creating opportunities for students to achieve their full
              potential. Through state-of-the-art laboratories, modern
              classrooms, digital learning resources, and a student-centered
              approach, we provide an engaging and supportive environment that
              encourages creativity, critical thinking, and lifelong learning.
            </p>
            <p className="font-body md:text-md sm:text-sm text-xs font-normal leading-relaxed text-wide text-secondary">
              We believe that education extends beyond textbooks, which is why
              we focus on the holistic development of every student by promoting
              leadership, collaboration, problem-solving, and personal growth.
              Our experienced faculty members are committed to guiding students
              through their academic journey while inspiring them to become
              confident, responsible, and future-ready individuals. By combining
              traditional educational values with modern teaching methodologies
              and technological advancements, we equip students with the
              knowledge, skills, and confidence needed to thrive in an
              ever-evolving global landscape and achieve success in their chosen
              careers.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;

// <div className="relative overflow-hidden rounded-2xl">
//   <Image
//     src="/building.png"
//     alt=""
//     width={800}
//     height={600}
//     className="w-full h-full object-cover grayscale"
//     // className="w-full h-full object-cover grayscale brightness-90"
//     // className="w-full h-full object-cover grayscale contrast-110 brightness-75"
//   />

//   {/* Overlay */}
//   <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/40 to-black/70" />

//   {/* <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" /> */}

//   {/* <div className="absolute inset-0 bg-linear-to-br from-zinc-950/80 via-zinc-900/40 to-transparent" /> */}

//   {/* <div className="absolute inset-0 bg-black/30" /> */}
// </div>
