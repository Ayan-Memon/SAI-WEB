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

// ----- CONFIG -----
const MAX_FILES = 20;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// Sirf images allow (extension pe bharosa nahi, MIME type check hoga)
const ACCEPTED_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export default function ImageDropzone({ setFormData }) {
  // accepted files (jinke andar preview url bhi hai)
  const [accepted, setAccepted] = useState([]);
  // rejected files (reason ke sath)
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
      if (!files) return;

      setFormData((prev) => ({
        ...prev,
        images: files,
      }));
    },
    [setFormData],
  );

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    // Kitni files already accepted hain, us hisab se limit lagao
    setAccepted((prev) => {
      const availableSlots = MAX_FILES - prev.length;

      // Agar limit se zyada files drop hui to extra ko reject list me daal do
      const filesToAdd = acceptedFiles.slice(0, availableSlots);
      const overflow = acceptedFiles.slice(availableSlots);

      if (overflow.length > 0) {
        setRejected((r) => [
          ...r,
          ...overflow.map((file) => ({
            file,
            id: generateId(),
            reason: `Max ${MAX_FILES} images allowed hain`,
          })),
        ]);
      }

      const mapped = filesToAdd.map((file) => ({
        file,
        id: generateId(),
        preview: URL.createObjectURL(file),
      }));

      // NOTE: yahan parent ka setFormData call NAHI karna (render phase ke
      // andar doosre component ka state update karna React error deta hai).
      // Parent ko sync karne ka kaam ab neeche wala useEffect karega.
      return [...prev, ...mapped];
    });

    // react-dropzone ke apne rejections (galat type / size se bade)
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
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: ACCEPTED_TYPES,
      maxSize: MAX_SIZE_BYTES,
      multiple: true,
      // maxFiles yahan hard-cap nahi lagata jab multiple selections ho rahi hon,
      // isliye overflow handling upar manually ki gayi hai
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

  // Jab bhi accepted files change hon, parent (formData) ko sync karo.
  // Yeh commit ke baad, alag se chalta hai — isliye "update while rendering
  // another component" wala error nahi aata.
  useEffect(() => {
    onFilesChange(accepted.map((f) => f.file));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accepted]);

  // Cleanup preview URLs jab component unmount ho
  useEffect(() => {
    return () => accepted.forEach((f) => URL.revokeObjectURL(f.preview));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remainingSlots = MAX_FILES - accepted.length;

  const isDisable = accepted.length === 0 && rejected.length === 0;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-2 ">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`
          relative flex flex-col items-center justify-center gap-3
          border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
          transition-colors duration-200
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
          <p className="text-red-600 font-medium">Only Images are Allowed</p>
        ) : isDragActive ? (
          <p className="text-blue-600 font-medium">Drop the images here...</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium">
              Drag & drop images here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              JPG, PNG, WEBP &middot; Max {MAX_SIZE_MB}MB per image &middot;{" "}
              {remainingSlots} / {MAX_FILES} slots remaining
            </p>
          </>
        )}
      </div>
      <div className="ml-auto w-max bg-primary ">
        <button
          className={`text-secondary/90 underline font-medium ${isDisable ? "cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => setShowPreview((prev) => !prev)}
          disabled={isDisable}
        >
          Show Images Preview
        </button>
      </div>
      {showPreview && !isDisable && (
        <div
          className={`files absolute inset-0 px-8 py-6 rounded-4xl overflow-y-auto bg-primary`}
        >
          {/* Clear all button */}
          {(accepted.length > 0 || rejected.length > 0) && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  clearAll();
                  setShowPreview((prev) => !prev);
                }}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Accepted (success) previews */}
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

          {/* Rejected previews */}
          {rejected.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-semibold text-gray-700">
                  Rejected ({rejected.length})
                </h3>
              </div>
              <div className="space-y-2">
                {rejected.map(({ id, file, reason }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between gap-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <ImageIcon className="w-4 h-4 text-red-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-gray-800 truncate">
                          {file.name}
                        </p>
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// react-dropzone ke error codes ko readable message me convert karta hai
function humanizeError(error) {
  switch (error.code) {
    case "file-invalid-type":
      return "Only image files are allowed";
    case "file-too-large":
      return `File exceeds ${MAX_SIZE_MB}MB`;
    case "too-many-files":
      return `Maximum ${MAX_FILES} images allowed`;
    default:
      return error.message;
  }
}