"use client";
import React, { useEffect, useState } from "react";
import { Heading } from "../UI/Heading";
import Image from "next/image";
import { motion } from "motion/react";

export const Documentry = () => {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <section className="w-full min-h-[80vh] relative">
      <div className="flex justify-center items-center my-2">
        <Heading
          className={
            "relative w-max before:content-['Our'] before:absolute before:text-lg before:-top-4 before:left-2 after:content-['By_Sir_Sohail'] after:absolute after:text-lg after:-bottom-4 after:right-9"
          }
        >
          Documentry
        </Heading>
      </div>

      <div
        className="absolute inset-0 pointer-events-none
        bg-linear-to-b from-primary/80 via-transparent to-primary/90"
      ></div>
      {/* main div */}
      <div className="w-full min-h-[80vh] bg-[radial-gradient(circle,rgba(45,41,38,0.28)_1.2px,transparent_1.2px)] bg-size-[22px_22px] flex justify-center items-center">
        {/* iframe div */}
        <div className="mx-auto w-full max-w-5xl rounded-4xl border border-white/40 bg-white/60 p-4 shadow-[0_25px_80px_rgba(45,41,38,0.18)] backdrop-blur-xl relative overflow-hidden">
          <iframe
            className="aspect-video w-full rounded-2xl"
            src="https://www.youtube.com/embed/nHjiRlTW4DM"
            title="Sir Adamjee Documentary"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
          {/* overlay */}
          <div className="absolute inset-0 bg-primary py-4 px-8">
            <div className="head flex gap-2 justify-center items-center">
              <Image src={"/logo.png"} alt={"logo"} width={70} height={70} />
              <Heading className={"text-center text-4xl! mt-0!"}>
                Sir Adamjee Institute - Documentary
              </Heading>
            </div>
            {/* bg brown circle */}
            <div className="absolute down-circle w-full bg-secondary rounded-t-full z-0 h-150 left-0 -bottom-80"></div>
          </div>
          {/* image */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true, amount: 0.8, delay: 0.2 }}
          >
            <Image
              src="/building.png"
              alt=""
              width={600}
              height={400}
              className="w-full absolute -bottom-20 left-1/2 -translate-x-1/2 xl:max-w-200 lg:max-w-180 md:max-w-160 sm:max-w-140 max-w-120 grayscale-90 z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
