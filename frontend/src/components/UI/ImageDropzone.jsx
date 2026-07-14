"use client";

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  X,
  UploadCloud,
  ImageIcon,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

const MAX_FILES = 20;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const ACCEPTED_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

const MotionCross = motion.create(X);

export default function ImageDropzone({ setFormData, type = "multiple" }) {
  const isSingle = type === "single";
  const maxFiles = isSingle ? 1 : MAX_FILES;

  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  function generateId() {
    if (
      typeof crypto !== "undefined" &&
      typeof crypto.randomUUID === "function"
    ) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  const onFilesChange = useCallback(
    (files) => {
      if (isSingle) {
        setFormData((prev) => ({
          ...prev,
          image: files[0] ?? null,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          images: files,
        }));
      }
    },
    [setFormData, isSingle],
  );

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setAccepted((prev) => {
        if (isSingle) {
          const [newFile, ...extra] = acceptedFiles;

          if (extra.length > 0) {
            setRejected((r) => [
              ...r,
              ...extra.map((file) => ({
                file,
                id: generateId(),
                reason: "Only 1 image is allowed",
              })),
            ]);
          }

          if (!newFile) return prev;

          prev.forEach((f) => URL.revokeObjectURL(f.preview));

          return [
            {
              file: newFile,
              id: generateId(),
              preview: URL.createObjectURL(newFile),
            },
          ];
        }

        const availableSlots = maxFiles - prev.length;

        const filesToAdd = acceptedFiles.slice(0, availableSlots);
        const overflow = acceptedFiles.slice(availableSlots);

        if (overflow.length > 0) {
          setRejected((r) => [
            ...r,
            ...overflow.map((file) => ({
              file,
              id: generateId(),
              reason: `Maximum ${maxFiles} images allowed`,
            })),
          ]);
        }

        const mapped = filesToAdd.map((file) => ({
          file,
          id: generateId(),
          preview: URL.createObjectURL(file),
        }));

        return [...prev, ...mapped];
      });

      if (fileRejections.length > 0) {
        setRejected((prev) => [
          ...prev,
          ...fileRejections.map(({ file, errors }) => ({
            file,
            id: generateId(),
            reason: errors.map((e) => humanizeError(e)).join(", "),
          })),
        ]);
      }
    },
    [isSingle, maxFiles],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: ACCEPTED_TYPES,
      maxSize: MAX_SIZE_BYTES,
      multiple: !isSingle,
    });

  const removeAccepted = (id) => {
    setAccepted((prev) => {
      const target = prev.find((f) => f.id === id);
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  const removeRejected = (id) => {
    setRejected((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => {
    accepted.forEach((f) => URL.revokeObjectURL(f.preview));
    setAccepted([]);
    setRejected([]);
  };

  useEffect(() => {
    onFilesChange(accepted.map((f) => f.file));
  }, [accepted]);

  useEffect(() => {
    return () => accepted.forEach((f) => URL.revokeObjectURL(f.preview));
  }, []);

  const remainingSlots = maxFiles - accepted.length;
  const isDisable = accepted.length === 0 && rejected.length === 0;
  const singleFile = isSingle ? accepted[0] : null;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2">
      <div
        {...getRootProps()}
        className={`
          relative flex flex-col items-center justify-center gap-3
          border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
          transition-colors duration-200 overflow-hidden
          ${
            isDragReject
              ? "border-red-400 bg-red-50"
              : isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100"
          }
        `}
      >
        <input {...getInputProps()} />

        {isSingle && singleFile ? (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image
              src={singleFile.preview}
              alt={singleFile.file.name}
              fill
              className="object-cover"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeAccepted(singleFile.id);
              }}
              className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5"
              aria-label="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[11px] px-2 py-1 truncate">
              {singleFile.file.name} &middot;{" "}
              {(singleFile.file.size / 1024 / 1024).toFixed(1)}MB
            </div>
          </div>
        ) : (
          <>
            <UploadCloud
              className={`w-full max-w-3xl h-10 ${
                isDragReject
                  ? "text-red-500"
                  : isDragActive
                    ? "text-blue-500"
                    : "text-gray-400"
              }`}
            />
            {isDragReject ? (
              <p className="text-red-600 font-medium">
                Only images are allowed
              </p>
            ) : isDragActive ? (
              <p className="text-blue-600 font-medium">
                Drop the image{isSingle ? "" : "s"} here...
              </p>
            ) : (
              <>
                <p className="text-gray-700 font-medium">
                  Drag & drop {isSingle ? "an image" : "images"} here, or click
                  to select
                </p>
                <p className="text-sm text-gray-500">
                  JPG, PNG, WEBP &middot; Max {MAX_SIZE_MB}MB per image
                  {!isSingle && (
                    <>
                      {" "}
                      &middot; {remainingSlots} / {maxFiles} slots remaining
                    </>
                  )}
                </p>
              </>
            )}
          </>
        )}
      </div>

      {rejected.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <h3 className="text-sm font-semibold text-gray-700">
                Rejected ({rejected.length})
              </h3>
            </div>
            <button
              onClick={() => setRejected([])}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          </div>
          {rejected.map(({ id, file, reason }) => (
            <div
              key={id}
              className="flex items-center justify-between gap-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <ImageIcon className="w-4 h-4 text-red-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-red-600">{reason}</p>
                </div>
              </div>
              <button
                onClick={() => removeRejected(id)}
                className="text-gray-400 hover:text-gray-600 shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {!isSingle && (
        <>
          <div className="ml-auto w-max bg-primary">
            <button
              className={`text-secondary/90 underline font-medium ${isDisable ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => setShowPreview((prev) => !prev)}
              disabled={isDisable}
            >
              Show Images Preview
            </button>
          </div>
          {showPreview && !isDisable && (
            <div className="files absolute inset-0 px-8 py-6 rounded-4xl overflow-y-auto bg-primary">
              {(accepted.length > 0 || rejected.length > 0) && (
                <div className="flex justify-between">
                  <motion.button
                    onClick={() => {
                      clearAll();
                      setShowPreview((prev) => !prev);
                    }}
                    whileHover={{ scale: 1.1, color: "red" }}
                    transition={{ duration: 300 }}
                    className="text-md text-gray-500 cursor-pointer"
                  >
                    Clear All
                  </motion.button>
                  <button onClick={() => setShowPreview(false)}>
                    <MotionCross
                      className="w-6 h-6 text-gray-500 cursor-pointer"
                      whileHover={{ scale: 1.1, color: "red" }}
                      transition={{ duration: 300 }}
                    />
                  </button>
                </div>
              )}

              {accepted.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <h3 className="text-sm font-semibold text-gray-700">
                      Accepted ({accepted.length})
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {accepted.map(({ id, file, preview }) => (
                      <div
                        key={id}
                        className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white"
                      >
                        <Image
                          src={preview}
                          alt={file.name}
                          fill
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeAccepted(id)}
                          className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Remove image"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[11px] px-2 py-1 truncate">
                          {file.name} &middot;{" "}
                          {(file.size / 1024 / 1024).toFixed(1)}
                          MB
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function humanizeError(error) {
  switch (error.code) {
    case "file-invalid-type":
      return "Only image files are allowed";
    case "file-too-large":
      return `File exceeds ${MAX_SIZE_MB}MB`;
    case "too-many-files":
      return "Too many files selected";
    default:
      return error.message;
  }
}
