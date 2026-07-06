import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <footer className="bg-secondary w-full h-max rounded-t-[50px] mt-10 lg:px-20 md:px-16 sm:px-12 px-8 md:py-18 sm:py-12 py-8 ">
        {/* <div className="w-full h-full rounded-[50px] bg-primary/90 px-18 py-10">
          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-2 max-w-130">
              <Image
                src={"/logo.png"}
                alt={""}
                width={100}
                height={100}
                className="w-18"
              />

              <p className="font-body capitalize text-sm text-secondary/90 font-mormal leading-relaxed ">
                <strong>Sir Adamjee Intermediate College</strong> provides
                quality education with modern labs, a well-stocked library, and
                a purpose-built campus to support effective learning.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-12 justify-between">
              <div className="flex flex-col gap-2 text-secondary font-body capitalize text-nowrap leading-relaxed text-md font-medium">
                <h1 className="font-heading font-semibold">About College</h1>
                <Link href={"/"}>Home</Link>
                <Link href={"/about"}>About Us</Link>
                <Link href={"/"}>Courses</Link>
              </div>
              <div className="flex flex-col gap-2 text-secondary/90 font-body capitalize text-nowrap leading-relaxed text-md font-medium">
                <h1 className="font-heading font-semibold">Academic Life</h1>
                <Link href={"/"}>Gallery</Link>
                <Link href={"/"}>Faculty</Link>
              </div>
              <div className="flex flex-col gap-2 text-secondary/90 font-body capitalize text-nowrap leading-relaxed text-md font-medium">
                <h1 className="font-heading font-semibold">Support & Media</h1>
                <Link href={"/"}>Documentry</Link>
                <Link href={"/"}>Downloads</Link>
                <Link href={"/"}>Contact Us</Link>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex lg:justify-between max-lg:flex-col lg:gap-10 gap-6 lg:mb-24 md:mb-20 sm:mb-16 mb-12">
          <div className="flex flex-col gap-2 lg:max-w-100 max-w-150">
            <Image
              src={"/logo.png"}
              alt={""}
              width={100}
              height={100}
              className="w-15"
            />

            <p className="font-body capitalize md:text-sm text-xs text-primary/90 font-mormal leading-relaxed ">
              <strong>Sir Adamjee Intermediate College</strong> provides quality
              education with modern labs, a well-stocked library, and a
              purpose-built campus to support effective learning.
            </p>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-12 sm:gap-10 gap-8 justify-between">
            <div className="flex flex-col gap-2 text-primary font-body capitalize text-nowrap leading-relaxed lg:text-md md:text-sm text-xs font-medium">
              <h1 className="font-heading font-semibold">About College</h1>
              <Link href={"/"}>Home</Link>
              <Link href={"/about"}>About Us</Link>
              <Link href={"/"}>Courses</Link>
            </div>
            <div className="flex flex-col gap-2 text-primary/90 font-body capitalize text-nowrap leading-relaxed lg:text-md md:text-sm text-xs font-medium">
              <h1 className="font-heading font-semibold">Academic Life</h1>
              <Link href={"/"}>Gallery</Link>
              <Link href={"/"}>Faculty</Link>
            </div>
            <div className="flex flex-col gap-2 text-primary/90 font-body capitalize text-nowrap leading-relaxed lg:text-md md:text-sm text-xs font-medium">
              <h1 className="font-heading font-semibold">Support & Media</h1>
              <Link href={"/"}>Documentry</Link>
              <Link href={"/"}>Downloads</Link>
              <Link href={"/"}>Contact Us</Link>
            </div>
          </div>
        </div>
        <hr className="border-0 h-px bg-[repeating-linear-gradient(to_right,#ebe6df_0px,#ebe6df_4px,transparent_4px,transparent_12px)] mb-5" />
        <div className="flex lg:justify-between max-lg:flex-col gap-2">
          <div className="flex flex-wrap gap-2 text-primary font-body capitalize text-nowrap leading-relaxed md:text-sm text-xs font-normal">
            <Link href={"/"}>Cookies Policy</Link>
            <Link href={"/about"}>Legal Terms</Link>
            <Link href={"/"}>Privacy Policy</Link>
          </div>
          <div className="flex flex-wrap gap-2 text-primary font-body capitalize text-nowrap leading-relaxed md:text-sm text-xs font-normal">
            <h1 className="font-heading font-medium ">Connect:</h1>
            <Link href={"/"}>Instagram</Link>
            <Link href={"/about"}>Linkedin</Link>
            <Link href={"/"}>Facebook</Link>
            <Link href={"/"}>Twitter</Link>
            <Link href={"/"}>Youtube</Link>
          </div>
        </div>
      </footer>
    </>
  );
};
