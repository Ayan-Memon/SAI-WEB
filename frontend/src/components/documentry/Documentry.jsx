"use client";

import React, { useEffect, useRef, useState } from "react";
import { Heading } from "../UI/Heading";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Play } from "lucide-react";

const VIDEO_ID = "nHjiRlTW4DM";

export const Documentry = () => {
  const [isPlay, setIsPlay] = useState(false);
  const iframeRef = useRef(null);

  // Jab video play ho, YouTube player ko "listening" mode pe daalo
  // taake wo apni state (play/pause/end) hume postMessage se bhejta rahe.
  useEffect(() => {
    if (!isPlay) return;

    const enableListening = () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: VIDEO_ID }),
        "*",
      );
    };

    // iframe load hote hi listening enable karo
    const iframe = iframeRef.current;
    iframe?.addEventListener("load", enableListening);
    // safety: thora delay dekar bhi try karlo (kabhi load event miss ho jata hai)
    const t = setTimeout(enableListening, 800);

    return () => {
      iframe?.removeEventListener("load", enableListening);
      clearTimeout(t);
    };
  }, [isPlay]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (typeof event.data !== "string") return;
      if (
        !event.data.includes("infoDelivery") &&
        !event.data.includes("onStateChange")
      )
        return;

      try {
        const data = JSON.parse(event.data);
        const playerState = data?.info?.playerState;

        if (playerState === 2 || playerState === 0) {
          setIsPlay(false);
        }
      } catch {}
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <section className="relative w-full min-h-[40vh] sm:min-h-[80vh] overflow-hidden">
      <div className="flex justify-center items-center my-3">
        <Heading className="relative w-max before:content-['Our'] before:absolute before:text-lg before:-top-4 before:left-2 after:content-['By_Sir_Sohail'] after:absolute after:text-lg after:-bottom-4 after:right-9">
          Documentary
        </Heading>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-primary/80 via-transparent to-primary/90" />

      <div className="w-full min-h-[40vh] sm:min-h-[80vh] bg-[radial-gradient(circle,rgba(45,41,38,0.28)_1.2px,transparent_1.2px)] bg-size-[22px_22px] flex justify-center items-center px-3 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-[20px] sm:rounded-[36px] border border-white/40 bg-white/50 shadow-[0_25px_80px_rgba(45,41,38,.18)] backdrop-blur-xl"
        >
          {/* Youtube */}
          <iframe
            ref={iframeRef}
            className="aspect-video w-full"
            src={
              isPlay
                ? `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&enablejsapi=1`
                : `https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1`
            }
            title="Sir Adamjee Documentary"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* Thumbnail */}
          <AnimatePresence>
            {!isPlay && (
              <motion.div
                className="absolute inset-0 cursor-pointer overflow-hidden bg-primary"
                onClick={() => setIsPlay(true)}
              >
                <Image
                  src="/documentry-thumbnail.png"
                  alt="Sir Adamjee Documentary Thumbnail"
                  fill
                  priority
                  className="object-cover select-none"
                />

                {/* Dark Overlay */}

                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute left-1/2 top-1/2 z-30 flex h-14 w-14 sm:h-20 sm:w-20 md:h-24 md:w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-xl shadow-2xl"
                >
                  <Play className="ml-1 fill-white text-white" size={22} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
