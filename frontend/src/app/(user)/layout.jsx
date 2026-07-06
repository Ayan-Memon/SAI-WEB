"use client";
import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="xl:mt-28 lg:mt-24 md:mt-22 mt-20">{children}</main>
      <Footer />
    </>
  );
}
