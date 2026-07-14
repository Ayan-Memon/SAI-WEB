import Image from "next/image";
import React from "react";
import { Heading } from "../UI/Heading";

const programs = [
  {
    id: 1,
    group: "Pre-Engineering",
    subjects: ["Chemistry", "Physics", "Maths"],
  },
  {
    id: 2,
    group: "Pre-Medical",
    subjects: ["Chemistry", "Physics", "Botany", "Zoology"],
  },
  {
    id: 3,
    group: "Commerce",
    subjects: ["Economics", "POC", "Accounting", "B. Maths"],
  },
  {
    id: 4,
    group: "Computer Science Group 1",
    subjects: ["Maths", "Physics", "Computer Science"],
  },
  {
    id: 5,
    group: "Computer Science Group 2",
    subjects: ["Maths", "Statistics", "Computer Science"],
  },
];

const CoursesSection = () => {
  return (
    <div className="w-full h-max px-4">
      <Heading>Programs We Offer</Heading>

      <div className="grid lg:grid-cols-2 grid-cols-1 w-full h-full mt-5">
        <div className="w-full h-full md:p-8 p-2 flex flex-col md:gap-8 sm:gap-6 gap-4 justify-between">
          {programs.map((curElem) => (
            <CourseCard key={"course-card" + curElem.id} program={curElem} />
          ))}
        </div>
        <div className="w-full flex flex-col justify-between md:gap-2 gap-1 md:p-8 p-2 max-md:rounded-2xl max-md:my-6 max-md:bg-secondary/10">
          <p className="font-body md:text-sm text-xs font-normal leading-relaxed text-wide text-secondary">
            Admission will remain provisional until the announcement of SSC-II
            or equivalent exam results. If the applicant does not meet the
            admission criteria after the results, their admission will be
            cancelled. The only refundable fees are the admission fee and other
            charges, monthly fee is non-refundable
          </p>
          <p className="font-body md:text-sm text-xs font-normal leading-relaxed text-wide text-secondary">
            <strong>Previous Result: </strong>
            Minimum 60% marks in SSC Part I or its equivalent. Note: O'
            Levels/IB students must have appeared in Minimum 8 subjects
            including English, Urdu, Islamiat and Pakistan Studies.
          </p>
          <p className="font-body md:text-sm text-xs font-normal leading-relaxed text-wide text-secondary">
            <strong>Age Limit: </strong>
            Maximum 18 Years on Aug 01 of current year. (1 year relaxation for
            Hafiz-e-Quran).
          </p>
          <p className="font-body md:text-sm text-xs font-normal leading-relaxed text-wide text-secondary">
            <strong>Computerized Admission Test (CAT): </strong>
            Eligible Candidates appear in Computerized Admission Test based on
            MCQs and Essay Writing in Urdu and English. Candidates unable to
            clear CAT will be given only one chance to re-appear.
          </p>
          <p className="font-body md:text-sm text-xs font-normal leading-relaxed text-wide text-secondary">
            <strong>Interview: </strong>
            Candidates are required to appear for interview, where they are
            evaluated for their confidence, behaviour, appearance, communication
            skills and participation in co-curricular activities and sports.
            Parents should accompany the candidate.
          </p>
          <p className="font-body md:text-sm text-xs font-normal leading-relaxed text-wide text-secondary">
            <strong>Note: </strong>
            Admissions are offered for class XI only. Promotion to class XII is
            based on students performance in class XI and may subject to an
            interview along with parents.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesSection;

const CourseCard = ({ program }) => {
  const { id, group, subjects } = program;
  return (
    <>
      <div
        className=" py-4 outline-secondary/20 outline-1  px-6 rounded-full relative flex flex-col justify-center"
        // className="w-full h-screen snap-start outline-secondary/20 outline-1  px-6 rounded-full relative flex flex-col justify-center"
      >
        {/* bg image */}
        <div className="absolute rounded-[inherit] inset-0 overflow-hidden z-0">
          <Image
            src={`/cards-img/card-img-${id}.jpg`}
            alt=""
            width={160}
            height={80}
            className="w-full"
          />
        </div>
        {/* overlay */}
        <div className="bg-[#ffffff19] backdrop-blur-lg absolute inset-0 rounded-[inherit] z-10"></div>
        {/* descriptioms */}
        <div className="relative z-20 flex flex-col justify-center">
          <h1 className="font-heading capitalize md:text-[20px] text-lg font-medium leading-none mb-0.5">
            {group}
          </h1>
          <p className="font-body capitalize md:text-[15px] text-xs font-mormal leading-relaxed ">
            {subjects.join(", ")}
          </p>
        </div>
      </div>
    </>
  );
};
