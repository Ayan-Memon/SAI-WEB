"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { UserProfile } from "@/components/UI/UserProfile";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Menu, X } from "lucide-react";
import NavbarHover from "../UI/NavbarHover";
import useMediaQuery from "@/hooks/useMediaQuery";

const links = [
  {
    name: "dashboard",
    link: "/dashboard",
  },
  {
    name: "home",
    link: "/",
  },
  {
    name: "about",
    link: "/about",
  },
  {
    name: "faculty",
    link: "/faculty",
  },
  {
    name: "courses",
    link: "/course",
  },
  {
    name: "gallery",
    link: "/gallery",
  },
  {
    name: "downloads",
    link: "/downloads",
  },
  {
    name: "documentry",
    link: "/documentry",
  },
  {
    name: "contact us",
    link: "/contact-us",
  },
  {
    name: "login",
    link: "/login",
  },
  {
    name: "sign up",
    link: "/signup",
  },
  {
    name: "logout",
    link: "/logout",
  },
];
export const Navbar = () => {
  const [isHovered, setIsHovered] = useState(null);

  const [extraIsHoverd, setExtraIsHovered] = useState(false);

  const activeRef = useRef(null);
  const bgRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const [resize, setResize] = useState(0);

  const isMobile = useMediaQuery("(max-width: 1024px)");

  const pathname = usePathname();

  const { data: user } = useCurrentUser();

  useEffect(() => {
    const handleResize = () => {
      setResize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [resize, pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const moveBg = (el) => {
    if (!bgRef.current || !el) return;
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = el;
    bgRef.current.style.left = offsetLeft + "px";
    bgRef.current.style.top = isMobile
      ? offsetTop + 5 + "px"
      : offsetTop + "px";
    bgRef.current.style.width = offsetWidth + "px";
    bgRef.current.style.height = isMobile
      ? offsetHeight - 10 + "px"
      : offsetHeight + "px";
    bgRef.current.style.opacity = "1";
  };

  // Jab koi hovered nahi to active link pe show karo
  const resetBg = () => {
    if (!bgRef.current) return;
    if (activeRef.current) {
      moveBg(activeRef.current);
    } else {
      bgRef.current.style.opacity = "0";
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      if (activeRef.current && bgRef.current) {
        // Transition temporarily hatao taake "slide in" na ho — seedha appear ho
        bgRef.current.style.transition = "none";
        moveBg(activeRef.current);
        // Transition wapas lagao next frame pe
        requestAnimationFrame(() => {
          if (bgRef.current) {
            bgRef.current.style.transition =
              "left 200ms ease, top 200ms ease, width 200ms ease, height 200ms ease, opacity 150ms ease";
          }
        });
      }
    }, 0);
    return () => clearTimeout(t);
  }, [pathname, user, isOpen, resize]);

  useEffect(() => {
    resetBg();
  }, [pathname]);

  return (
    <>
      <header
        className={`w-full ${(!isOpen || !isMobile) && "sm:py-4 py-2 sm:px-4 px-2"} fixed z-100 right-0 top-0 max-w-355 -translate-x-2/4 left-2/4 `}
      >
        <nav className="py-2 px-4 flex justify-between items-center gap-8 rounded-full outline-1 outline-offset-2 outline-secondary/20 w-full bg-primary/60 backdrop-blur-md">
          <Link href="/" className="flex shrink-0">
            {/* <Image
                src="/logo.png"
                alt="logo"
                width={70}
                height={70}
                loading="eager"
              /> */}
            <Image
              src="/final-logo.png"
              alt="SAI Logo"
              width={800}
              height={400}
              loading="eager"
              className="xl:w-45 md:w-35 w-30"
            />
          </Link>
          <motion.div
            className={`links max-lg:absolute max-lg:z-10 max-lg:w-screen max-lg:h-screen max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:bg-primary max-lg:py-6 max-lg:px-8 max-lg:overflow-auto ${isOpen ? "flex max-lg:flex-col " : "hidden"} lg:flex relative `}
          >
            <div
              ref={bgRef}
              style={{
                position: "absolute",
                borderRadius: "9999px",
                background: "var(--color-secondary)",
                opacity: "0",
                pointerEvents: "none",
                transition:
                  "left 200ms ease, top 200ms ease, width 200ms ease, height 200ms ease, opacity 150ms ease",
              }}
            />

            <div className="lg:m-0 mb-6 lg:hidden flex justify-between items-center">
              <Image
                src="/final-logo.png"
                alt="SAI Logo"
                width={800}
                height={400}
                loading="eager"
                className="xl:w-45 md:w-35 w-30"
              />
              <motion.button
                className="w-10 h-10 cursor-pointer"
                whileHover={{ scale: 1.2 }}
                onClick={() => setIsOpen(false)}
              >
                <X />
              </motion.button>
            </div>

            {resize <= 1024 && (
              <hr className="border-b border-b-secondary/30 mb-4" />
            )}

            {links.map((page, idx) => {
              const isActive = pathname === page.link;
              const isCurrentHover = isHovered === idx;
              const showHoverBg =
                isCurrentHover || (isActive && isHovered === null);

              if ((!isMobile || resize >= 1024) && idx > 4) {
                return null;
              }

              if (user && (page.link === "/login" || page.link === "/signup")) {
                return null;
              }

              if (user?.role !== "admin" && page.link === "/dashboard") {
                return null;
              }

              if (!user && page.link === "/logout") {
                return null;
              }
              return (
                <Link
                  href={page.link}
                  key={page.name}
                  ref={isActive ? activeRef : null}
                  onMouseEnter={(e) => {
                    setIsHovered(idx);
                    moveBg(e.currentTarget);
                  }}
                  onMouseLeave={() => {
                    setIsHovered(null);
                    resetBg();
                  }}
                  onClick={() => (resize <= 1024 ? setIsOpen(false) : null)}
                  className="xl:py-2 lg:py-3 py-4 px-4 relative xl:text-lg md:text-md text-sm font-heading capitalize cursor-pointer max-lg:border-b border-b-secondary/30"
                >
                  <span
                    className={`relative z-10 transition-colors duration-200 ${isHovered === idx || (isActive && isHovered === null) ? "text-white" : "text-secondary"}`}
                  >
                    {page.name}
                  </span>
                </Link>
              );
            })}
            <div
              className="extra-links relative lg:block hidden"
              onMouseEnter={() => setExtraIsHovered(true)}
              onMouseLeave={() => setExtraIsHovered(false)}
            >
              <p
                className={`py-2 px-4 relative text-lg font-heading capitalize cursor-pointer`}
              >
                ...
              </p>
              <div className="absolute top-full">
                <NavbarHover
                  isHovered={extraIsHoverd}
                  className={"overflow-hidden"}
                >
                  <div className="flex flex-col">
                    <Link
                      href="/gallery"
                      className={`py-2 px-2 relative xl:text-lg md:text-md text-sm font-heading capitalize cursor-pointer border-b border-b-secondary/30 ${pathname.includes("/gallery") ? "bg-secondary text-white/90" : ""} transition-all duration-300`}
                      onClick={() => setExtraIsHovered(false)}
                    >
                      gallery
                    </Link>

                    <Link
                      href="/documentry"
                      className={`py-2 px-2 relative xl:text-lg md:text-md text-sm font-heading capitalize cursor-pointer border-b border-b-secondary/30 ${pathname === "/documentry" ? "bg-secondary text-white/90" : ""} transition-all duration-300`}
                      onClick={() => setExtraIsHovered(false)}
                    >
                      Documentry
                    </Link>
                    <Link
                      href="/downloads"
                      className={`py-2 px-2 relative xl:text-lg md:text-md text-sm font-heading capitalize cursor-pointer xl:border-0 border-b border-b-secondary/30 ${pathname === "/downloads" ? "bg-secondary text-white/90" : ""} transition-all duration-300`}
                      onClick={() => setExtraIsHovered(false)}
                    >
                      Downloads
                    </Link>
                    <Link
                      href={"/contact-us"}
                      className={`xl:hidden block text-nowrap py-2 px-2 relative xl:text-lg md:text-md text-sm font-heading capitalize cursor-pointer ${pathname.includes("/course") ? "bg-secondary text-white/90" : ""} transition-all duration-300`}
                      onClick={() => setExtraIsHovered(false)}
                    >
                      Contact Us
                    </Link>
                  </div>
                </NavbarHover>
              </div>
            </div>
          </motion.div>
          <div className="lg:space-x-4 space-x-6 flex items-center ">
            <Link
              href={"/contact-us"}
              className="xl:block hidden xl:text-lg md:text-md text-sm tracking-tight font-heading capitalize cursor-pointer text-nowrap
              underline"
            >
              Contact Us
            </Link>
            {user ? (
              <>
                <button className="lg:block hidden xl:text-lg md:text-md text-sm px-4 py-2 rounded-full tracking-tight font-heading cursor-pointer bg-white whitespace-nowrap">
                  Log Out
                </button>
                <div>
                  <UserProfile user={user} />
                </div>
              </>
            ) : (
              <div className="lg:flex hidden gap-2">
                <Link
                  href={"/login"}
                  className="text-lg px-4 py-2 rounded-full tracking-tight font-heading cursor-pointer bg-white whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  href={"/signup"}
                  className="text-lg px-4 py-2 rounded-full tracking-tight font-heading cursor-pointer bg-secondary text-white whitespace-nowrap"
                >
                  Sign Up
                </Link>
              </div>
            )}
            <button
              className="lg:hidden bloack cursor-pointer mr-2"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
