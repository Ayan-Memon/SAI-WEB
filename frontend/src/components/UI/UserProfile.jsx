"use client";
import React, { useState } from "react";
import NavbarHover from "./NavbarHover";

export const UserProfile = ({ user }) => {
  const { username, email, role } = user;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative  bg-secondary rounded-full xl:w-10 xl:h-10 lg:w-9 lg:h-9 w-8 h-8 flex justify-center items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p className="uppercase absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 text-white xl:text-lg md:text-md text-sm font-body">
        {username[0]}
      </p>
      <div className="absolute top-full right-0 ">
        <NavbarHover isHovered={isHovered} className={"p-2 outline-offset-2 "}>
          <p className="font-semibold tracking-wide text-neutral-800 font-body lg:text-lg md:text-md text-xs  ">
            Username :{" "}
            <span className="capitalize text-secondary font-normal">
              {username}
            </span>
          </p>
          <p className="font-semibold tracking-wide text-neutral-800 font-body lg:text-lg md:text-md text-xs ">
            Email : <span className="text-secondary font-normal">{email}</span>
          </p>
          <p className="font-semibold tracking-wide text-neutral-800 font-body lg:text-lg md:text-md text-xs ">
            Role : <span className="text-secondary font-normal">{role}</span>
          </p>
        </NavbarHover>
      </div>
    </div>
  );
};
