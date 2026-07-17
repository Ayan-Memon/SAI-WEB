"use client";
import React from "react";
import { Heading } from "../UI/Heading";
import {
  LaptopMinimal,
  BriefcaseMedical,
  ChartLine,
  ArrowDownToLine,
  MonitorSpeaker,
  Newspaper,
  BookText,
  Stethoscope,
  ChartNoAxesCombined,
} from "lucide-react";
import { PiUsersThreeFill } from "react-icons/pi";
import { motion } from "motion/react";

const downloadObj = [
  {
    title: "Admission Forms",
    para: "Download admission forms for various programs",
    icon: Newspaper,
    child: [
      {
        icon: LaptopMinimal,
        link: "/downloads/computer_science_with_statistic.pdf",
        head: "Computer SC. With Statistic",
      },
      {
        icon: LaptopMinimal,
        link: "/downloads/computer_science_with_physics.pdf",
        head: "Computer SC. With Physics",
      },
      {
        icon: BriefcaseMedical,
        link: "/downloads/pre_medical.pdf",
        head: "Pre Medical",
      },
      {
        icon: PiUsersThreeFill,
        link: "/downloads/pre_engineering.pdf",
        head: "Pre Engineering",
      },
      { icon: ChartLine, link: "/downloads/commerce.pdf", head: "Commerce" },
    ],
  },
  {
    title: "Book Lists",
    para: "Download book lists for all program and year",
    icon: BookText,
    child: [
      {
        icon: MonitorSpeaker,
        link: "/downloads/first_year_computer_science_book_list.pdf",
        head: "First Year Computer Science",
      },
      {
        icon: PiUsersThreeFill,
        link: "/downloads/first_year_pre_engineering_book_list.pdf",
        head: "First Year Pre Engineering",
      },
      {
        icon: Stethoscope,
        link: "/downloads/first_year_pre_medical_book_list.pdf",
        head: "First Year Pre Medical",
      },
      {
        icon: ChartNoAxesCombined,
        link: "/downloads/first_year_commerce_book_list.pdf",
        head: "First Year Commerce",
      },
      {
        icon: LaptopMinimal,
        link: "/downloads/second_year_computer_science_book_list.pdf",
        head: "Second Year Computer Science",
      },
      {
        icon: PiUsersThreeFill,
        link: "/downloads/second_year_pre_engineering_book_list.pdf",
        head: "Second Year Pre Engineering",
      },
      {
        icon: BriefcaseMedical,
        link: "/downloads/second_year_pre_medical_book_list.pdf",
        head: "Second Year Pre Medical",
      },
      {
        icon: ChartNoAxesCombined,
        link: "/downloads/second_year_commerce_book_list.pdf",
        head: "Second Year Commerce",
      },
    ],
  },
  {
    title: "Others",
    para: "Other important documents and information",
    icon: Newspaper,
    child: [
      {
        icon: Newspaper,
        link: "/downloads/prospectus.pdf",
        head: "Prospectus",
      },
    ],
  },
];

export const Downloads = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-8">
      <div className="py-1">
        <Heading
          className={
            "text-left! mt-6 sm:mt-8 md:mt-10! relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-[0.8px] after:w-32 sm:after:w-42 after:bg-secondary px-0!"
          }
        >
          Downloads
        </Heading>
        <p className="font-body text-sm sm:text-base md:text-md max-w-md pt-3 sm:pt-4">
          Access admission forms, book lists, and important documents all in one
          place.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeIn" }}
        className="bg-white/80 rounded-3xl sm:rounded-4xl mt-6 sm:mt-8 md:mt-10 w-full flex flex-col gap-8 sm:gap-10 md:gap-12 py-8 sm:py-10 md:py-12"
      >
        {downloadObj.map((curSection, idx) => {
          return (
            <DownloadSection
              key={curSection.title + idx}
              section={curSection}
            />
          );
        })}
      </motion.div>
    </section>
  );
};

const DownloadSection = ({ section }) => {
  const { title, para, child } = section;
  const HeadIcon = section.icon;
  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="head-div flex gap-3 sm:gap-4 items-center">
        <div className="icon relative w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 shrink-0 bg-[#EEE1CF] rounded-full">
          <HeadIcon className="absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-2/4 text-secondary/80 w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="my-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary font-body leading-tight sm:leading-6 capitalize">
            {title}
          </h2>
          <p className="font-body max-w-lg text-sm sm:text-base md:text-md font-extralight text-neutral-700">
            {para}
          </p>
        </div>
      </div>

      <div className="main mt-6 sm:mt-8 md:mt-10">
        <div className="grid gap-4 sm:gap-5 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
          {child.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.head + index}
                href={item.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-[#E7DAC9] bg-white px-4 py-4 sm:px-5 sm:py-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#C7A57B] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5EBDD] text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white">
                    <Icon size={18} className="sm:hidden" />
                    <Icon size={20} className="hidden sm:block" />
                  </div>

                  <h3 className="flex-1 font-body text-sm sm:text-[15px] font-medium leading-5 text-secondary wrap-break-words">
                    {item.head}
                  </h3>
                </div>

                <div className="ml-3 sm:ml-4 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-white">
                  <ArrowDownToLine size={16} className="sm:hidden" />
                  <ArrowDownToLine size={18} className="hidden sm:block" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
