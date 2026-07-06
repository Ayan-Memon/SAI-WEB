"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getGalleryFolders, uploadFolder } from "@/lib/postQueries";
import { Heading } from "../UI/Heading";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import ImageDropzone from "../UI/ImageDropzone";

export const GalleryFolders = () => {
  const {
    data = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["gallery-folders"],
    queryFn: getGalleryFolders,
    staleTime: 1000 * 60 * 20,
    gcTime: 1000 * 60 * 10,
  });

  const postMutation = useMutation({
    mutationFn: uploadFolder,
    mutationKey: ["uploading-folder"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-folders"] });
    },
  });

  const { data: user } = useCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    folderName: "",
    images: [],
  });

  const [topError, setTopError] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [isModalOpen]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const submitFormHandler = () => {
    if (!formData.folderName || !formData.images) {
      setTopError("Please fill all fields correctly");
      return;
    }
    setTopError("");

    // real posting
    postMutation.mutate(formData);
  };

  return (
    <section className=" w-full min-h-[80vh] relative">
      <Heading>Our Gallery</Heading>

      {(user?.role === "admin" || user?.role === "social_handler") && (
        <motion.button
          className="btn px-4 py-2 mt-2 mr-10 bg-secondary text-primary rounded-4xl font-body font-medium text-xl capitalize absolute -top-0.5 right-0 cursor-pointer"
          whileHover={{ background: "rgba(45, 41, 38, 0.90)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={() => setIsModalOpen((prev) => !prev)}
        >
          Create New Folder
        </motion.button>
      )}
      <div
        className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-8 lg:py-14
      md:py-12 sm:py-10 py-8 lg:px-12 md:px-10 sm:px-8 px-4 w-full h-full"
      >
        {data?.folders?.map((folder) => (
          <GalleryFolder key={folder.folderName} folder={folder} />
        ))}
      </div>
      {/* overlay */}
      {isModalOpen && (
        <div
          className="modal-overlay absolute inset-0 h-screen -top-30 z-10 bg-black/5 backdrop-blur-md "
          onClick={() => setIsModalOpen((prev) => !prev)}
        ></div>
      )}

      {/* create folder div */}
      {isModalOpen && (
        <div className="bg-primary absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 min-w-sm sm:min-w-md max-w-4xl px-8 py-6 rounded-4xl z-20">
          <div className="relative pb-6">
            <label
              className="block mb-2 text-sm font-semibold text-secondary"
              htmlFor="username"
            >
              Folder Name
            </label>

            <input
              type="text"
              placeholder="SAI INDEPEDENCE DAY"
              name="username"
              id="username"
              value={formData.folderName}
              required
              autoComplete="off"
              className={`w-full h-14 rounded-2xl bg-white px-5 outline-none   transition-all ${false ? "border-red-500 border-2" : "focus:border-secondary/20 border border-transparent"}`}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, folderName: e.target.value }))
              }
            />
          </div>
          <ImageDropzone setFormData={setFormData} />
          <button
            onClick={submitFormHandler}
            className="bg-secondary text-primary font-body font-medium uppercase text-xl rounded-4xl px-8 py-4 w-full mt-4"
          >
            Create Folder
          </button>
        </div>
      )}
      {isModalOpen && topError && (
        <p className="absolute top-4 px-4 py-2 text-sm font-body -translate-x-2/4 left-2/4 bg-red-200 text-red-500">
          {topError}
        </p>
      )}
    </section>
  );
};

const GalleryFolder = ({ folder }) => {
  const router = useRouter();
  const { coverImage, totalImages, folderName } = folder;
  const height = "aspect-[1/0.9]";
  const fontSize = folderName.length > 14 ? "text-lg" : "text-xl";
  return (
    <div
      className="folder w-full relative rounded-3xl h-full cursor-pointer "
      onClick={() => router.push(`/gallery/${folderName}`)}
    >
      <div
        className={`block w-40 h-10 rounded-tl-3xl rounded-tr-[50px] bg-secondary -z-20 absolute left-0 -top-3
         [clip-path:polygon(0%_0%,50%_0%,100%_100%,0%_100%)]`}
      />
      <div className=" front bg-[#3F3631] backdrop-blur-lg w-full h-full  bottom-0 rounded-[inherit] p-4 flex flex-col gap-2  ">
        <div
          className="image mx-auto bg-white w-full h-30 rounded-[inherit]
          overflow-hidden  "
        >
          <Image
            src={coverImage}
            alt=""
            width={200}
            height={200}
            className="w-full object-cover object-center"
          />
        </div>
        <div className="content text-primary pl-2">
          <h2
            className={`font-heading font-medium ${fontSize} capitalize line-clamp-1`}
          >
            {folderName}
          </h2>
          <p className="font-body text-sm ">{totalImages} images</p>
        </div>
      </div>
    </div>
  );
};
