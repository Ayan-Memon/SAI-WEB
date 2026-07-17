"use client";
import {
  GraduationCap,
  Lightbulb,
  Sparkles,
  Quote,
  Users,
  Award,
  Trophy,
  BookOpenCheck,
  FlaskConical,
  Shapes,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { ImFacebook, ImLinkedin, ImTwitter, ImYoutube } from "react-icons/im";
import { HiMiniUserGroup } from "react-icons/hi2";
import { ImUserTie } from "react-icons/im";
import React from "react";
import { motion } from "motion/react";
import { Heading } from "../UI/Heading";
import Image from "next/image";

const coreValues = [
  {
    head: "Excellence",
    para: "We strive for academic excellence and continuous improvement.",
    icon: GraduationCap,
  },
  {
    head: "Integrity",
    para: "We uphold honesty, transparency, and strong ethical values.",
    icon: ImUserTie,
  },
  {
    head: "Respect",
    para: "We value every individual and promote a culture of respect and inclusion.",
    icon: HiMiniUserGroup,
  },
  {
    head: "Innovation",
    para: "We encourage creativity, critical thinking, and modern learning.",
    icon: Lightbulb,
  },
];

const legacyPoints = [
  "Experienced & Qualified Faculty",
  "Modern Labs & Library",
  "Focus on Character Building",
  "Extra-curricular Opportunities",
];

const stats = [
  { icon: Award, value: "22+", label: "Years of Excellence" },
  { icon: Users, value: "1200+", label: "Students" },
  { icon: GraduationCap, value: "60+", label: "Qualified Faculty" },
  { icon: Trophy, value: "100+", label: "Achievements" },
];

const whyChooseUs = [
  {
    icon: BookOpenCheck,
    head: "Quality Education",
    para: "Structured curriculum designed for academic and personal growth.",
  },
  {
    icon: FlaskConical,
    head: "Modern Facilities",
    para: "Advanced labs, library, and digital classrooms for better learning.",
  },
  {
    icon: Shapes,
    head: "Holistic Development",
    para: "Sports, arts, clubs, and leadership opportunities for all-round growth.",
  },
  {
    icon: ShieldCheck,
    head: "Supportive Environment",
    para: "A safe, inclusive, and motivating space for every student.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const About = () => {
  return (
    <section className="w-full">
      <div className="w-full px-6 sm:px-8 lg:px-14 xl:px-20">
        {/* top grid */}
        <div className="about-hero grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-16 lg:py-24 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="content w-full flex flex-col gap-5"
          >
            <p className="uppercase font-body text-[#9C7A4A] tracking-[0.2em] text-xs sm:text-sm flex gap-2 items-center">
              <Sparkles size={16} className="shrink-0" />
              <span>About Our College</span>
            </p>

            <Heading className="p-0! m-0! capitalize leading-[1.1]! text-left! text-4xl! sm:text-5xl! lg:text-[3.4rem]!">
              Building Futures,
              <br />
              Empowering Minds,
              <br />
              Shaping Leaders.
            </Heading>

            <p className="font-body max-w-lg text-[#5A4635]/75 text-sm sm:text-base tracking-wide leading-relaxed">
              Sir Adamjee Intermediate College provides quality education with
              modern labs, a well-stocked library, and a purpose-built campus to
              support effective learning.
            </p>

            <div className="flex items-center gap-6 pt-2">
              <button className="group flex items-center gap-2 bg-[#3B2E20] text-[#F5EFE4] font-body text-sm px-6 py-3 rounded-full transition-all duration-300 hover:bg-[#2A2016] hover:pr-8">
                Our Vision
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
              <button className="font-body text-sm text-[#3B2E20] underline underline-offset-4 decoration-[#D8BC84] hover:text-[#9C7A4A] transition-colors">
                Explore More
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative images-div w-full h-full flex justify-center items-center"
          >
            <Image
              src="/img.jpg"
              alt="Students in a lab at Sir Adamjee Intermediate College"
              width={750}
              height={800}
              className="w-full max-w-[420px] lg:max-w-[480px] aspect-square object-cover rounded-[2rem] shadow-2xl outline outline-offset-2 outline-white/60"
            />
            <div className="absolute -bottom-6 right-8 sm:right-14 lg:right-20 w-20 h-20 sm:w-24 sm:h-24 bg-white/30 outline outline-1 outline-white/80 backdrop-blur-md rounded-full z-10 flex justify-center items-center shadow-lg">
              <Image
                src="/logo.png"
                alt="Sir Adamjee logo"
                width={200}
                height={200}
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            </div>
          </motion.div>
        </div>

        {/* section divider heading */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="flex items-center justify-center py-10 lg:py-14"
        >
          <div className="flex-1 max-w-16 sm:max-w-28 md:max-w-36 h-px bg-[#D8BC84]" />
          <div className="mx-3 w-2 h-2 rotate-45 border border-[#D8BC84] shrink-0" />
          <h2 className="text-center px-2 z-10 capitalize font-heading text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#3B2E20]">
            Our Core Values
          </h2>
          <div className="mx-3 w-2 h-2 rotate-45 border border-[#D8BC84] shrink-0" />
          <div className="flex-1 max-w-16 sm:max-w-28 md:max-w-36 h-px bg-[#D8BC84]" />
        </motion.div>

        {/* core values grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-16 lg:pb-24">
          {coreValues.map(({ head, para, icon: Icon }, i) => (
            <motion.div
              key={head}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col gap-4 bg-white/60 border border-[#E4D5B7] rounded-2xl p-5 sm:p-6 transition-colors duration-300 hover:bg-[#3B2E20] cursor-default"
            >
              <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#3B2E20] group-hover:bg-[#D8BC84] flex items-center justify-center transition-colors duration-300">
                <Icon
                  size={20}
                  className="text-[#F5EFE4] group-hover:text-[#3B2E20] transition-colors duration-300"
                />
              </span>
              <div>
                <h3 className="font-heading text-base sm:text-lg font-semibold text-[#3B2E20] group-hover:text-[#F5EFE4] transition-colors duration-300">
                  {head}
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#5A4635]/70 group-hover:text-[#F5EFE4]/70 leading-relaxed mt-1 transition-colors duration-300">
                  {para}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* legacy section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center pb-20 lg:pb-28">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full"
          >
            <Image
              src="/about-img-2.png"
              alt="College principal addressing students at the podium"
              width={700}
              height={520}
              className="w-full border-t-0 max-w-lg aspect-4/3 object-cover rounded-4xl shadow-2xl mx-auto"
            />
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3B2E20]">
              A Legacy of Education
            </h3>
            <p className="font-body text-sm sm:text-base text-[#5A4635]/75 leading-relaxed max-w-lg">
              Since our inception, Sir Adamjee Intermediate College has been
              committed to nurturing young minds and preparing them for a
              successful future. Our dedicated faculty and state-of-the-art
              facilities ensure a holistic learning experience.
            </p>
            <ul className="flex flex-col gap-3 mt-2">
              {legacyPoints.map((point, i) => (
                <motion.li
                  key={point}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex items-center gap-3 font-body text-sm sm:text-base text-[#3B2E20]"
                >
                  <CheckCircle2 size={18} className="text-[#9C7A4A] shrink-0" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <div className=" bg-secondary rounded-2xl sm:mx-6 md:mx-10 px-6 sm:px-8 lg:px-14 xl:px-20 py-20 lg:py-28">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center text-center gap-3 mb-14 lg:mb-20"
        >
          <p className="uppercase font-body text-[#D8BC84] tracking-[0.3em] text-xs sm:text-sm">
            Our Leadership
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5EFE4] max-w-2xl">
            Guided by Vision, Driven by Purpose
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 lg:gap-14 items-center max-w-4xl mx-auto mb-16 lg:mb-24">
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="flex flex-col items-center gap-3 mx-auto"
          >
            <Image
              src="/about-img-1.png"
              alt="Mr. S.M. Naseem, President"
              width={220}
              height={260}
              className="w-40 sm:w-48 aspect-3/4 object-cover rounded-2xl shadow-2xl outline outline-1 outline-[#D8BC84]/40 outline-offset-4"
            />
            <div className="text-center">
              <p className="font-heading text-[#F5EFE4] font-semibold text-lg">
                Mr. S.M. Naseem
              </p>
              <p className="font-body text-[#D8BC84] text-xs uppercase tracking-widest">
                President
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="relative"
          >
            <Quote className="text-[#D8BC84]/40 mb-2" size={36} />
            <p className="font-body text-[#F5EFE4]/85 text-base sm:text-lg lg:text-xl leading-relaxed italic">
              Our mission is to create an environment where students are
              inspired to learn, encouraged to innovate, and empowered to lead
              with integrity.
            </p>
            <p className="font-heading text-[#D8BC84] italic text-xl mt-4">
              S.M. Naseem
            </p>
          </motion.div>
        </div>

        {/* stats bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 max-w-4xl mx-auto border-y border-[#D8BC84]/20 py-8 mb-16 lg:mb-24"
        >
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 text-center sm:border-l sm:first:border-l-0 border-[#D8BC84]/20 px-2"
            >
              <Icon size={22} className="text-[#D8BC84]" />
              <p className="font-heading text-2xl sm:text-3xl font-bold text-[#F5EFE4]">
                {value}
              </p>
              <p className="font-body text-[10px] sm:text-xs text-[#F5EFE4]/60 uppercase tracking-wide">
                {label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* why choose us */}
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="font-heading text-2xl sm:text-3xl font-bold text-[#F5EFE4] text-center mb-10"
        >
          Why Choose Us?
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {whyChooseUs.map(({ icon: Icon, head, para }, i) => (
            <motion.div
              key={head}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ x: 4 }}
              className="flex gap-4 items-start bg-white/[0.03] border border-[#D8BC84]/15 rounded-xl p-5 hover:border-[#D8BC84]/40 transition-colors duration-300"
            >
              <span className="w-10 h-10 shrink-0 rounded-full bg-[#D8BC84]/10 flex items-center justify-center">
                <Icon size={18} className="text-[#D8BC84]" />
              </span>
              <div>
                <p className="font-heading text-[#D8BC84] font-semibold text-sm sm:text-base mb-1">
                  {head}
                </p>
                <p className="font-body text-[#F5EFE4]/60 text-xs sm:text-sm leading-relaxed">
                  {para}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
