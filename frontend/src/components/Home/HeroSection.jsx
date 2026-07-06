"use client";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

// swiper css
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

const slides = [
  {
    image: "/banner-img-1.jpg",
    heading: "Empowering Future Leaders",
    subheading:
      "Quality education, modern facilities, and endless opportunities to help students achieve their dreams.",
  },
  {
    image: "/banner-img-2.webp",
    heading: "Excellence Beyond Academics",
    subheading:
      "Building confidence, teamwork, and leadership through sports and extracurricular activities.",
  },
  {
    image: "/banner-img-3.jpg",
    heading: "A Journey Begins Here",
    subheading:
      "Welcoming students into a vibrant learning environment where growth and success thrive.",
  },
  {
    image: "/banner-img-4.jpg",
    heading: "Shaping Bright Futures",
    subheading:
      "Preparing students with knowledge, skills, and values for tomorrow.",
  },
];

const HeroSection = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
      loop
      speed={2000}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      className="w-full h-[65vh] md:h-[75vh] lg:h-[85vh]"
      // className="w-full h-screen snap-start"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={"slide" + index}>
          <div className="relative h-full w-full">
            {/* Background Image */}
            <Image
              src={slide.image}
              alt={`banner-img-${index + 1}`}
              fill
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10" />

            {/* Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="max-lg:px-2">
                <h1 className="font-heading uppercase font-bold lg:text-5xl md:text-3xl sm:text-xl  text-lg tracking-wide text-primary text-nowrap text-center">
                  {slide.heading}
                </h1>
                <p className="font-body text-wide lg:text-xl md:text-lg sm:text-sm text-xs  md:max-w-2/3 font-medium text-center mx-auto md:mt-2  text-primary">
                  {slide.subheading}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSection;
