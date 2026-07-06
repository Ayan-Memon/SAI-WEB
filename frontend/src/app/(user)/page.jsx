import AboutSection from "@/components/Home/AboutSection";
import CoursesSection from "@/components/Home/CoursesSection";
import FacilitiesSection from "@/components/Home/FacilitiesSection";
import HeroSection from "@/components/Home/HeroSection";
import WhySection from "@/components/Home/WhySection";

export default function Home() {
  return (
    <>
      <section className="h-full w-full">
        <HeroSection />
        <AboutSection />
        <WhySection />
        <CoursesSection />
        <FacilitiesSection />
      </section>
    </>
  );
}
