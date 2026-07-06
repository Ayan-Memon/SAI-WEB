"use client";
import { getFaculties } from "@/lib/facultyQueries";
import { useQuery } from "@tanstack/react-query";
import { Heading } from "../UI/Heading";
import Image from "next/image";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import React from "react";

const FacultyPage = () => {
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["faculties"],
    queryFn: getFaculties,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  const departmentDataArr = data?.data?.reduce((acc, data) => {
    if (!acc[data.department]) {
      acc[data.department] = [];
    }

    acc[data.department].push(data);

    return acc;
  }, {});

  return (
    <>
      <section>
        <Heading>Our Faculties</Heading>
        <div>
          {departmentDataArr &&
            Object.entries(departmentDataArr).map(([department, teachers]) => {
              const conditions =
                department.toLowerCase() === "principal" ||
                department.toLowerCase() === "principle";
              return (
                <div
                  key={department}
                  className="my-18 flex flex-col gap-10 justify-center items-center"
                >
                  <h1
                    className={`mt-5 text-center z-10 capitalize font-heading bg-primary text-4xl font-medium text-secondary px-2`}
                  >
                    {`${department} ${conditions ? "" : "department"}`}
                  </h1>
                  <div className="w-full flex justify-center items-center">
                    <div
                      className={`py-6 w-full ${teachers.length === 1 ? "flex justify-center" : "grid grid-cols-[repeat(auto-fit,minmax(360px,450px))] "} gap-2 `}
                    >
                      {teachers.map((teacher) => (
                        <FacultyCard
                          key={`teacher-${teacher.name}`}
                          teacher={teacher}
                          conditions={conditions}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default FacultyPage;

const FacultyCard = ({ teacher, conditions }) => {
  const { name, description, imageUrl } = teacher;

  return (
    <motion.div className="flex justify-center p-3 sm:p-5 md:p-6">
      <div
        className="
          relative
          w-full
          

          rounded-[28px]
          sm:rounded-[34px]
          lg:rounded-[42px]

          overflow-hidden

          bg-linear-to-br
          from-[#655652]
          via-[#4e433f]
          to-[#342d2b]

          border border-white/10
          shadow-[0_25px_80px_rgba(0,0,0,.35)]
        "
      >
        {/* Background Glow */}
        <div className="absolute left-5 top-5 h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full bg-amber-100/10 blur-3xl" />

        <div className="absolute right-5 bottom-0 h-32 w-32 sm:h-44 sm:w-44 lg:h-56 lg:w-56 rounded-full bg-orange-100/10 blur-3xl" />

        {/* Content */}
        <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-6 p-5 sm:p-6">
          {/* Image */}
          <div
            className="
              w-28 h-28
              sm:w-32 sm:h-32
              lg:w-36 lg:h-36

              rounded-full
              overflow-hidden
              border-4 border-primary/80
              shrink-0
            "
          >
            <Image
              src={imageUrl}
              alt={name}
              width={300}
              height={300}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Text */}
          <div className="flex-1 text-primary text-center sm:text-left">
            {/* Heading */}
            <h2 className="font-heading font-semibold text-xl sm:text-2xl lg:text-3xl leading-tight">
              {!conditions && <span>Prof. </span>}

              {name.split(" ").map((curElem, idx) => (
                <React.Fragment key={`${curElem}-${idx}`}>
                  <span>{curElem} </span>

                  {!conditions && idx === 1 && (
                    <br className="hidden lg:block" />
                  )}
                </React.Fragment>
              ))}
            </h2>

            {/* Yellow Line */}
            <div className="flex items-center justify-center sm:justify-start gap-1.5 my-3">
              <div className="h-0.5 w-12 sm:w-14 rounded-full bg-amber-300" />
              <div className="w-2 h-2 rounded-full bg-amber-300" />
            </div>

            {/* Description */}
            <div className="text-sm sm:text-base leading-relaxed space-y-1">
              {description.map((curPara, idx) => (
                <p key={idx}>{curPara}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
// <div className="relative w-70 h-100 rounded-2xl">
//   {/* background  */}
//   <div className="bg absolute w-[calc(100%-60px)] h-[inherit] bg-secondary rounded-[inherit] z-0 -left-14 rotate-12 -top-2 text-primary/10">
//     <p className="absolute -rotate-90 font-bebas font-bold tracking-[0.5rem] text-7xl bottom-20 left-10 -translate-x-1/2 -translate-y-1/2">
//       FACULTY
//     </p>
//   </div>
//   {/* <div className="absolute inset-0 rounded-[inherit]  border border-white/20 bg-linear-to-br bg-primary/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.08)] z-10"> */}
//   <div
//     className="absolute inset-0 rounded-[inherit]  border border-white/10 bg-linear-to-br bg-primary/90 backdrop-blur-md
// shadow-[inset_-12px_-8px_40px_#46464620] z-10"
//   >
//     <Image
//       src={imageUrl}
//       alt={name}
//       width={300}
//       height={300}
//       className="w-35 h-35 rounded-full mx-auto object-cover object-top mt-10 border-4 border-secondary "
//     />
//     <div className="mt-6 px-4">
//       <h1 className="text-center text-secondary font-heading text-2xl font-bold leading-tight ">
//         {name}
//       </h1>
//       <div className="text-center text-secondary font-body text-sm font-medium leading-relaxed mt-2">
//         {description.map((curPara, idx) => (
//           <p key={`para-${idx}`}>{curPara}</p>
//         ))}
//       </div>
//     </div>
//   </div>
// </div>
