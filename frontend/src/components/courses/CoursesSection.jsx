"use client";

import { motion } from "framer-motion";
import {
  Laptop2,
  Calculator,
  Cog,
  HeartPulse,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { Heading } from "../UI/Heading";

const courses = [
  {
    title: "Computer Science with Physics",
    icon: Laptop2,
    description:
      "Build strong programming fundamentals while mastering Physics to prepare for engineering, AI, software development and emerging technologies.",
  },
  {
    title: "Computer Science with Statistics",
    icon: Calculator,
    description:
      "Combine computer science with statistics to explore data science, machine learning, analytics and intelligent decision-making.",
  },
  {
    title: "Pre-Engineering",
    icon: Cog,
    description:
      "Designed for future engineers with an advanced curriculum covering Mathematics, Physics and problem-solving skills.",
  },
  {
    title: "Pre-Medical",
    icon: HeartPulse,
    description:
      "A comprehensive foundation in Biology, Chemistry and Physics for students aspiring to become healthcare professionals.",
  },
  {
    title: "Commerce",
    icon: Briefcase,
    description:
      "Develop practical knowledge in Accounting, Business, Economics and Finance for successful careers in commerce and entrepreneurship.",
  },
];

export default function CoursesSection() {
  return (
    <section className="py-10 md:py-18 px-6 ">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-white border border-[#d3c3ae] text-[#7A5533] text-sm font-medium">
            Our Programs
          </span>

          <Heading className=" mt-6">Explore Premium Academic Programs</Heading>

          <p className="text-[#5E554D] md:mt-6 mt-4 md:leading-8 leading-6">
            Choose from carefully designed intermediate programs that prepare
            students for higher education and successful professional careers.
            Every course focuses on academic excellence, practical learning and
            future opportunities.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => {
            const Icon = course.icon;

            return (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                }}
                whileTap={{
                  y: -10,
                }}
                className="group bg-white/70 border border-[#d8cbb9] rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="md:w-16 md:h-16 w-12 h-12 rounded-2xl bg-secondary text-white flex items-center justify-center mb-6 group-hover:rotate-6 transition">
                  <Icon className="md:w-10 md:h-10 w-8 h-8" />
                </div>

                <h3 className=" text-xl md:text-2xl font-semibold text-[#2D2926] mb-2 sm:mb-4">
                  {course.title}
                </h3>

                <p className="text-[#5E554D] leading-7 mb-4 sm:mb-8">
                  {course.description}
                </p>

                <button className="flex items-center gap-2 text-[#7A5533] font-semibold group-hover:gap-4 transition-all">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
