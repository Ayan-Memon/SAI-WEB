"use client";
import {
  deleteFaculty,
  getFaculties,
  uploadFaculty,
} from "@/lib/facultyQueries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heading } from "../UI/Heading";
import Image from "next/image";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import ImageDropzone from "../UI/ImageDropzone";
import { Trash, X } from "lucide-react";
import { useForm } from "react-hook-form";

const MotionCross = motion.create(X);
const MotionTrash = motion.create(Trash);

const DepartmentHeading = ({ children }) => (
  <motion.h1
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-center z-10 capitalize font-heading text-2xl sm:text-3xl md:text-4xl font-medium text-secondary px-2"
  >
    {children}
  </motion.h1>
);

const FacultyPage = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    image: "",
  });

  const [imageError, setIamgeError] = useState("");

  const facultyMutation = useMutation({
    mutationFn: uploadFaculty,
    mutationKey: ["uploading-faculty"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
      setIsModalOpen(false);
      setFormData({ image: "" });
      setIamgeError("");
      reset();
    },
    retry: 1,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFaculty,
    mutationKey: ["deleting-faculty"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculties"] });
      setDeleteFacultyId(null);
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSuccess = (data) => {
    if (!formData.image) {
      setIamgeError("Please upload an image");
      return;
    }
    setValue("image", formData.image);
    facultyMutation.mutate(data);
  };

  const onError = () => {
    if (formData.image) return;
    setIamgeError("Please upload an image");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // [isDropdownOpen, setIsDropdownOpen]

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

  const { data: user } = useCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteFacultyId, setDeleteFacultyId] = useState(null);

  useEffect(() => {
    if (isModalOpen || deleteFacultyId) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      return;
    }
    document.body.style.overflow = "auto";
    document.body.style.height = "100%";
  }, [isModalOpen, deleteFacultyId]);

  const departmentDataArr = data?.data?.reduce((acc, data) => {
    if (!acc[data.department]) {
      acc[data.department] = [];
    }

    acc[data.department].push(data);

    return acc;
  }, {});

  const departments = departmentDataArr && Object.keys(departmentDataArr);

  const isAdminRole = user?.role === "admin" || user?.role === "social_handler";

  const handleFacultyDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <>
      <section className="w-full min-h-[80vh]">
        <div className="flex max-sm:flex-col gap-2 justify-between items-center lg:px-12 md:px-10 sm:px-8 px-4 md:pt-5 sm:pt-4 pt-2">
          <Heading className={`mt-0! ${isAdminRole ? "" : "flex-1"}`}>
            Faculties
          </Heading>

          {isAdminRole && (
            <motion.button
              className="btn px-4 py-2.5 bg-secondary text-primary rounded-4xl font-body font-medium lg:text-xl text-md max-sm:w-full capitalize cursor-pointer"
              whileHover={{ background: "rgba(45, 41, 38, 0.90)" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Upload New Faculty
            </motion.button>
          )}
        </div>

        <div className="px-3 sm:px-6 md:px-10 lg:px-12">
          {departmentDataArr && (
            <div className="my-10 sm:my-16 md:my-20 lg:my-24 flex flex-col gap-4 md:gap-8 justify-center items-center">
              <DepartmentHeading>{`Principal`}</DepartmentHeading>
              <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
                {departmentDataArr["Principal"]?.map((teacher) => (
                  <FacultyCard
                    key={`teacher-${teacher.name}`}
                    teacher={teacher}
                    conditions={true}
                    isAdminRole={isAdminRole}
                    setDeleteFacultyId={setDeleteFacultyId}
                  />
                ))}
              </div>
            </div>
          )}

          {departmentDataArr &&
            Object.entries(departmentDataArr).map(([department, teachers]) => {
              const conditions =
                department.toLowerCase() === "principal" ||
                department.toLowerCase() === "principle";

              if (conditions) {
                return null;
              }

              return (
                <div
                  key={department}
                  className="my-10 sm:my-16 md:my-20 lg:my-24 flex flex-col gap-4 md:gap-8 justify-center items-center"
                >
                  <DepartmentHeading>{`${department} department`}</DepartmentHeading>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
                    {teachers.map((teacher) => (
                      <FacultyCard
                        key={`teacher-${teacher.name}`}
                        teacher={teacher}
                        conditions={conditions}
                        isAdminRole={isAdminRole}
                        setDeleteFacultyId={setDeleteFacultyId}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {(isModalOpen || deleteFacultyId) && (
          <div
            className="modal-overlay fixed w-full left-0 h-[calc(100vh+120px)] -top-30 z-10 bg-black/5 backdrop-blur-md"
            onClick={() => {
              if (isModalOpen) {
                setIsModalOpen((prev) => !prev);
                reset();
                setIsDropdownOpen(false);
                setIamgeError("");
              }
              if (deleteFacultyId) {
                setDeleteFacultyId(null);
              }
            }}
          />
        )}

        {isModalOpen && (
          <div className="bg-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-[40%] min-w-sm sm:min-w-md max-w-xl w-full px-8 py-6 rounded-4xl z-20">
            <div className="w-full">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  reset();
                  setIsDropdownOpen(false);
                  setIamgeError("");
                  setFormData((prev) => ({ ...prev, image: null }));
                }}
                className="w-max ml-auto block"
              >
                <MotionCross
                  className="w-6 h-6 text-gray-500 cursor-pointer"
                  whileHover={{ scale: 1.1, color: "red" }}
                  transition={{ duration: 300 }}
                />
              </button>
            </div>
            {/* faculty name */}
            <form>
              <div className="relative pb-6">
                <label
                  className="block mb-2 text-sm font-semibold text-secondary"
                  htmlFor="facultyname"
                >
                  Faculty Name
                </label>

                <input
                  type="text"
                  placeholder={"Faculty Name"}
                  name="facultyname"
                  id="facultyname"
                  required
                  autoComplete="off"
                  className={`w-full h-14 rounded-2xl bg-white px-5 outline-none transition-all ${false ? "border-red-500 border-2" : "focus:border-secondary/20 border border-transparent"}`}
                  {...register("name", {
                    required: "faculty name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 absolute left-1 bottom-0 font-body text-md">
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* descriptiom */}
              <div className="relative pb-6">
                <label
                  className="block mb-2 text-sm font-semibold text-secondary"
                  htmlFor="facultydescription"
                >
                  Faculty Description
                </label>

                <input
                  type="text"
                  placeholder={"Lecturer English, Lecturer Mathematics..."}
                  name="facultydescription"
                  id="facultydescription"
                  required
                  autoComplete="off"
                  className={`w-full h-14 rounded-2xl bg-white px-5 outline-none transition-all ${false ? "border-red-500 border-2" : "focus:border-secondary/20 border border-transparent"}`}
                  {...register("description", {
                    required: "description is required",
                  })}
                />
                {errors.description && (
                  <p className="text-red-500 absolute left-1 bottom-0 font-body text-md">
                    {errors.description.message}
                  </p>
                )}
              </div>
              {/* department */}
              <div className="relative pb-6">
                <label
                  className="block mb-2 text-sm font-semibold text-secondary"
                  htmlFor="facultydepartment"
                >
                  Department
                </label>

                <input
                  type="text"
                  placeholder={"Physics, Chemistry..."}
                  name="facultydepartment"
                  id="facultydepartment"
                  required
                  autoComplete="off"
                  onFocus={() => setIsDropdownOpen(true)}
                  onBlur={() => setIsDropdownOpen(false)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && setIsDropdownOpen(false)
                  }
                  className={`w-full h-14 rounded-2xl bg-white px-5 outline-none transition-all ${false ? "border-red-500 border-2" : "focus:border-secondary/20 border border-transparent"}`}
                  {...register("department", {
                    required: "department is required",
                  })}
                />
                {errors.department && (
                  <p className="text-red-500 absolute left-1 bottom-0 font-body text-md">
                    {errors.department.message}
                  </p>
                )}
                {isDropdownOpen && (
                  <div className="min-h-60 h-full overflow-auto absolute top-[calc(100%-20px)] left-0 bg-white w-full rounded-2xl z-10">
                    {departments.map((department) => (
                      <div
                        key={department}
                        onClick={() => {
                          setValue("department", department, {
                            shouldValidate: true,
                            shouldDirty: true,
                            shouldTouch: true,
                          });
                          setIsDropdownOpen(false);
                        }}
                        className="px-5 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        {department}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>
            <div className="pb-6 relative">
              <ImageDropzone setFormData={setFormData} type="single" />
              {imageError && (
                <p className="text-red-500 absolute left-1 bottom-0 font-body text-md">
                  {imageError}
                </p>
              )}
            </div>
            <button
              onClick={handleSubmit(onSuccess, onError)}
              disabled={facultyMutation.isPending}
              className="bg-secondary text-primary font-body font-medium uppercase text-lg sm:text-xl rounded-4xl px-8 py-4 w-full mt-4 flex gap-4 justify-center items-center"
            >
              {facultyMutation.isPending && (
                <div className="h-5 w-5 mt-0.5 border-3 border-gray-300 rounded-full border-t-secondary animate-spin"></div>
              )}
              <p className="text-white font-semibold">
                {facultyMutation.isPending
                  ? "Creating Faculty"
                  : "Create Faculty"}
              </p>
            </button>
          </div>
        )}

        {deleteFacultyId && (
          <div
            className={`fixed -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4 max-w-120 py-4 px-8 rounded-4xl w-full z-20 bg-primary flex flex-col gap-4`}
          >
            <div className="flex flex-col gap-2 w-full">
              <h2 className="text-center text-lg text-secondary font-body font-semibold">
                Are you sure you want to delete this Faculty?
              </h2>
              <p className="text-center text-sm text-secondary font-body font-medium capitalize">
                {`Faculty Name : ${data?.data?.filter((curElem) => curElem._id === deleteFacultyId)[0]?.name}`}
              </p>
            </div>
            <div className="flex gap-3 mt-5">
              <motion.button
                className="flex-1 rounded-xl bg-[#DC2626] py-3 font-medium text-white cursor-pointer"
                whileHover={{ background: "#B91C1C" }}
                onClick={() => handleFacultyDelete(deleteFacultyId)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </motion.button>

              <motion.button
                className="flex-1 rounded-xl bg-[#F3F4F6] py-3 font-medium text-[#374151] cursor-pointer"
                whileHover={{ background: "#E5E7EB" }}
                onClick={() => setDeleteFacultyId(null)}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </motion.button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default FacultyPage;

const FacultyCard = ({
  teacher,
  conditions,
  isAdminRole = false,
  setDeleteFacultyId,
}) => {
  const { name, description, imageUrl, _id } = teacher;

  return (
    <div
      className={` ${conditions ? "lg:max-w-100 md:max-w-80 max-w-60" : ""} w-full h-full relative`}
    >
      <div
        className={`
          relative
          w-full
          h-full
          min-h-40.5
          sm:min-h-48.5
          md:min-h-37.5
          lg:min-h-42.5

          flex
          flex-col
          md:flex-row

          items-center
          md:items-start

          text-center
          md:text-left

          gap-3
          md:gap-5

          rounded-2xl
          md:rounded-[28px]

          overflow-hidden

          bg-linear-to-br
          from-[#655652]
          via-[#4e433f]
          to-[#342d2b]

          border border-white/10
          shadow-[0_15px_50px_rgba(0,0,0,.35)]

          p-3
          sm:p-4
          md:p-6
        `}
      >
        <div className="absolute left-3 top-3 h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full bg-amber-100/10 blur-2xl" />

        <div className="absolute right-3 bottom-0 h-16 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-full bg-orange-100/10 blur-2xl" />

        <div
          className="
            relative
            w-14 h-14
            sm:w-16 sm:h-16
            md:w-20 md:h-20
            lg:w-24 lg:h-24

            rounded-full
            overflow-hidden
            border-2 md:border-4 border-primary/80
            shrink-0
          "
        >
          <Image
            src={imageUrl}
            alt={name}
            width={200}
            height={200}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative flex-1 min-w-0 w-full flex flex-col justify-center text-primary">
          <h2 className="font-heading font-semibold text-xs sm:text-sm md:text-base lg:text-lg leading-tight line-clamp-2">
            {!conditions && <span>Prof. </span>}
            {name}
          </h2>

          <div className="flex items-center justify-center md:justify-start gap-1.5 my-1.5 md:my-2">
            <div className="h-0.5 w-8 rounded-full bg-amber-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          </div>

          <div
            className={`text-[10px] sm:text-xs md:text-sm leading-snug space-y-0.5 ${!conditions ? "line-clamp-2 md:line-clamp-3" : ""} `}
          >
            {description.map((curPara, idx) => (
              <p key={idx}>{curPara}</p>
            ))}
          </div>
        </div>
      </div>
      {isAdminRole && (
        <motion.button
          className="absolute right-4 bottom-4 text-primary cursor-pointer z-10"
          whileHover={{ color: "#C3110C" }}
          whileTap={{ color: "#C3110C" }}
          onClick={() => setDeleteFacultyId(_id)}
        >
          <MotionTrash className="sm:w-5.5 sm:h-5.5 w-4 h-4 " />
        </motion.button>
      )}
    </div>
  );
};
