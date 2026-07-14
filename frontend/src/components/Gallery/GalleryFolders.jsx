"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteFolderApi,
  getGalleryFolders,
  uploadFolder,
} from "@/lib/postQueries";
import { Heading } from "../UI/Heading";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import ImageDropzone from "../UI/ImageDropzone";
import useTypeWriter from "@/hooks/useTyperWriter.js";
import { Folder, Trash, X } from "lucide-react";

// motion cross
const MotionCross = motion.create(X);
const MotionTrash = motion.create(Trash);

export const GalleryFolders = () => {
  const [formData, setFormData] = useState({
    folderName: "",
    images: [],
  });

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
      const queryFolderName = decodeURIComponent(formData?.folderName)
        .replace(/%20/g, " ")
        .toLocaleLowerCase()
        .trim();
      queryClient.invalidateQueries({ queryKey: ["gallery-folders"] });
      queryClient.invalidateQueries({
        queryKey: ["posts", queryFolderName],
      });
    },
    retry: 1,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFolderApi,
    mutationKey: ["deleting-folder"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery-folders"] });
    },
  });

  const { data: user } = useCurrentUser();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // delete folder state with foldername
  const [deleteFolder, setDeleteFolder] = useState(null);

  const [topError, setTopError] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isModalOpen || deleteFolder) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";

      return;
    }
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }, [isModalOpen, deleteFolder]);

  const submitFormHandler = () => {
    if (!formData.folderName || formData.images.length === 0) {
      setTopError("Please fill all fields correctly");
      return;
    }
    setTopError("");

    // real posting
    postMutation.mutate(formData);
  };

  const [isPlaceholderStop, setIsPlaceholderStop] = useState(true);

  const placeholder = useTypeWriter({
    words: [
      "SAI INDEPENDENCE DAY",
      "SAI ORIENTATION DAY",
      "SAI CAMPUS FESTIVAL",
    ],
    stop: isPlaceholderStop,
  });

  const isAdminRole = user?.role === "admin" || user?.role === "social_handler";

  const handleFolderDelete = () => {
    deleteMutation.mutate(deleteFolder);
  };

  return (
    <section className=" w-full min-h-[80vh]">
      <div className="flex max-sm:flex-col gap-2 justify-between items-center lg:px-12 md:px-10 sm:px-8 px-4 md:pt-5 sm:pt-4 pt-2">
        <Heading className={`mt-0! ${isAdminRole ? "" : "flex-1"}`}>
          Our Gallery
        </Heading>

        {isAdminRole && (
          <motion.button
            className="btn px-4 py-2.5 bg-secondary text-primary rounded-4xl font-body font-medium lg:text-xl  text-md max-sm:w-full  capitalize cursor-pointer"
            whileHover={{ background: "rgba(45, 41, 38, 0.90)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => {
              setIsModalOpen(true);
              setIsPlaceholderStop(!isPlaceholderStop);
            }}
          >
            Create New Folder
          </motion.button>
        )}
      </div>
      {/* folders*/}
      <div
        className={`grid max-[400px]:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] grid-cols-[repeat(auto-fit,minmax(160px,1fr))] ${data?.folders?.length >= 5 ? "md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]" : "md:flex md:flex-wrap md:gap-4"} gap-x-6 gap-y-8 lg:py-14
      md:py-12 sm:py-10 py-8 lg:px-12 md:px-10 sm:px-8 px-4 w-full h-full ${!data?.folders?.length ? "relative min-h-[80vh]" : ""} `}
      >
        {data?.folders?.map((folder) => (
          <GalleryFolder
            key={folder.folderName}
            folder={folder}
            foldersLength={data?.folders?.length}
            isAdminRole={isAdminRole}
            setDeleteFolder={setDeleteFolder}
          />
        ))}
        {!data?.folders?.length && (
          <div className="absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 w-max flex flex-col gap-2 justify-center items-center">
            <div className="icon text-primary bg-secondary w-30 h-30 relative rounded-full mb-2">
              <Folder className="w-18 h-18 absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4" />
            </div>
            <h2 className="text-center font-heading font-medium text-2xl">
              There is no folder in this gallery
            </h2>
          </div>
        )}
      </div>
      {/* overlay */}
      {(isModalOpen || deleteFolder) && (
        <div
          className="modal-overlay fixed w-full left-0 h-[calc(100vh+120px)] -top-30 z-10 bg-black/5 backdrop-blur-md "
          onClick={() => {
            if (isModalOpen) {
              setIsModalOpen((prev) => !prev);
              setIsPlaceholderStop(!isPlaceholderStop);
            }
            if (deleteFolder) {
              setDeleteFolder(null);
            }
          }}
        />
      )}

      {/* create folder div */}
      {isModalOpen && (
        <div className="bg-primary fixed -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 min-w-sm sm:min-w-md max-w-4xl px-8 py-6 rounded-4xl z-20">
          <div className="w-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-max ml-auto block"
            >
              <MotionCross
                className="w-6 h-6 text-gray-500 cursor-pointer"
                whileHover={{ scale: 1.1, color: "red" }}
                transition={{ duration: 300 }}
              />
            </button>
          </div>
          <div className="relative pb-6">
            <label
              className="block mb-2 text-sm font-semibold text-secondary"
              htmlFor="username"
            >
              Folder Name
            </label>

            <input
              type="text"
              placeholder={placeholder}
              name="username"
              id="username"
              value={formData.folderName}
              required
              autoComplete="off"
              className={`w-full h-14 rounded-2xl bg-white px-5 outline-none   transition-all ${false ? "border-red-500 border-2" : "focus:border-secondary/20 border border-transparent"}`}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, folderName: e.target.value }))
              }
              onFocus={() => setIsPlaceholderStop(!isPlaceholderStop)}
              onBlur={() => setIsPlaceholderStop(!isPlaceholderStop)}
            />
          </div>
          <ImageDropzone setFormData={setFormData} />
          <button
            onClick={submitFormHandler}
            className="bg-secondary text-primary font-body font-medium uppercase text-xl rounded-4xl px-8 py-4 w-full mt-4 flex gap-4 justify-center items-center"
          >
            {postMutation.isPending && (
              <div className="h-5 w-5 mt-0.5 border-3 border-gray-300 rounded-full border-t-secondary animate-spin"></div>
            )}
            <p className="text-white font-semibold">
              {postMutation.isPending ? "Creating Folder" : "Create Folder"}
            </p>
          </button>
        </div>
      )}
      {/* top errror */}
      {isModalOpen && topError && (
        <div className="absolute top-4 px-8 py-3 text-lg font-body -translate-x-2/4 left-2/4 bg-red-600/20  text-red-800 z-10 rounded-full flex gap-8 items-center font-medium">
          <p>{topError}</p>
        </div>
      )}

      {/* delete folder model */}
      {deleteFolder && (
        <div
          className={`fixed -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4 max-w-120 py-4 px-8 rounded-4xl w-full z-20 bg-primary flex flex-col gap-4`}
        >
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-center text-lg text-secondary font-body font-semibold">
              Are you sure you want to delete this folder?
            </h2>
            <p className="text-center text-sm text-secondary font-body font-medium capitalize">
              {`Folder Name : ${deleteFolder}`}
            </p>
          </div>
          <div className="flex gap-3 mt-5">
            <motion.button
              className="flex-1 rounded-xl bg-[#DC2626] py-3 font-medium text-white cursor-pointer"
              whileHover={{ background: "#B91C1C" }}
              onClick={() => handleFolderDelete(deleteFolder)}
            >
              Delete
            </motion.button>

            <motion.button
              className="flex-1 rounded-xl bg-[#F3F4F6] py-3 font-medium text-[#374151] cursor-pointer"
              whileHover={{ background: "#E5E7EB" }}
              onClick={() => setDeleteFolder(null)}
            >
              Cancel
            </motion.button>
          </div>
        </div>
      )}
    </section>
  );
};

const GalleryFolder = ({
  folder,
  foldersLength,
  isAdminRole,
  setDeleteFolder,
}) => {
  const router = useRouter();
  const { coverImage, totalImages, folderName } = folder;
  const fontSize =
    folderName.length > 14
      ? "lg:text-lg md:text-md text-sm"
      : "lg:text-xl md:text-lg text-md";
  return (
    <div
      className={`folder flex justify-center items-center w-full  ${foldersLength < 5 ? "md:w-max" : ""} h-full cursor-pointer `}
    >
      <div
        className={`${foldersLength < 5 ? "md:min-w-60" : ""} max-w-60 front bg-[#3F3631] backdrop-blur-lg w-full h-full  bottom-0 rounded-3xl relative`}
      >
        <div
          className={`block inset-x-[30%] h-10 rounded-tl-3xl rounded-tr-[50px] bg-secondary -z-20 absolute left-0 -top-3
         [clip-path:polygon(0%_0%,50%_0%,100%_100%,0%_100%)]`}
        />
        <div
          className="rounded-[inherit] w-full h-full z-10 bg-[#3F3631] p-4 flex flex-col gap-2 "
          onClick={() => router.push(`/gallery/${folderName}`)}
        >
          <div
            className="image mx-auto bg-white w-full md:h-32 sm:h-28 h-24 max-[400px]:h-20 rounded-[inherit]
          overflow-hidden  "
          >
            <Image
              src={coverImage}
              alt=""
              width={400}
              height={400}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="content text-primary pl-2">
            <h2
              className={`font-heading font-medium ${fontSize} capitalize line-clamp-2 sm:line-clamp-1`}
            >
              {folderName}
            </h2>
            <p className="font-body text-sm ">{totalImages} images</p>
          </div>
        </div>
        {/* for admin 3 dots icon */}
        {isAdminRole && (
          <motion.button
            className="absolute right-4 bottom-4 text-primary cursor-pointer z-10"
            whileHover={{ color: "#C3110C" }}
            whileTap={{ color: "#C3110C" }}
            onClick={() => setDeleteFolder(folderName)}
          >
            <MotionTrash className="sm:w-5.5 sm:h-5.5 w-4 h-4 " />
          </motion.button>
        )}
      </div>
    </div>
  );
};
