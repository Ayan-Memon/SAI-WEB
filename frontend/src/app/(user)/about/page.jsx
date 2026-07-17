import { About } from "@/components/about/About";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Sir Adamjee Intermediate College's mission, core values, and legacy of academic excellence in Karachi.",
  alternates: { canonical: "/about" },
};
const page = () => {
  return <About />;
};

export default page;
