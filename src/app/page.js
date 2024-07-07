"use client";
import Btn from "@/components/button/Btn";
import ParticlesComponent from "@/components/paticles-animation/ParticlesComponent";
import { description, profile } from "@/data/profile";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [showSocial, setShowSocial] = React.useState(false);
  const {
    firstName,
    lastName,
    position,
    summary,
    avatar,
    location,
    tags,
    socialLinks,
  } = profile;
  return (
    <main>
      <ParticlesComponent />
      <div className="main_container_box">
        <div className="flex flex-col lg:flex-row  mt-8  gap-8">
          {/* profile image box */}
          <div className="flex justify-center lg:justify-start ">
            <Image
              className={`rounded-full w-[260px] h-[260px] ring-4 shadow-2xl shadow-[#ffffff7d] lg:ring-6 ring-[#00a6fb]`}
              src={avatar.srcPath}
              width={200}
              height={200}
              alt="Roushan"
            />
          </div>
          {/* content box parent */}
          <div>
            {/* title box */}
            <div className="flex text-3xl lg:text-4xl text-sky-500 justify-center lg:justify-start font-bold  gap-2">
              <h1 className="capitalize primary_black  ">{firstName} </h1>
              <h1 className="capitalize primary_yellow ">{lastName}</h1>
            </div>
            <h4 className="secondary text-xl flex justify-center lg:justify-start  py-2 ">
              {position}
            </h4>
            <h4 className="text-[#d2f0f9] text-center lg:text-start py-2">
              {summary}
            </h4>
            <h4 className="text-[#d2f0f9]  justify-center lg:justify-start py-2">
              {location?.name}
            </h4>
            {/* button box container  */}
            <div className="flex justify-center lg:justify-start py-3 gap-4">
              {tags.map((tag) => {
                return (
                  <button
                    key={tag}
                    className="py-1 px-2 text-black text-[.875rem] bg-gray-200 rounded"
                  >
                    {tag.name}
                  </button>
                );
              })}
            </div>
            {/* Social links  */}
            <div className="flex  justify-center lg:justify-start py-3 gap-2">
              <div className="flex lg:gap-4 gap-2">
                {showSocial
                  ? socialLinks?.map((social) => {
                      return (
                        <a
                          key={social.name}
                          title={social.caption}
                          className="hover:primary_yellow duration-300 ease-in text-red lg:text-[24px] text-[20px]"
                          href={social.url}
                        >
                          {<social.name />}
                        </a>
                      );
                    })
                  : socialLinks.slice(0, 5).map((social) => {
                      return (
                        <a
                          key={social.id}
                          title={social.caption}
                          className="hover:primary_yellow duration-300 ease-in text-red lg:text-[24px] text-[20px]"
                          href={social.url}
                        >
                          {<social.name />}
                        </a>
                      );
                    })}
              </div>
              <button
                className="text-[#00a6fb] font-light"
                onClick={() => setShowSocial(!showSocial)}
              >
                {showSocial ? "- less" : "+ more"}
              </button>
            </div>
            {/* my resume  */}
            <div className="my-2 flex justify-center lg:justify-start">
              <a
                href="https://drive.google.com/file/d/1ZKG1i5OhGMr30aH7i-t94xThNfPNNc3Z/view?usp=drive_link"
                download
                target="_blank"
              >
                <Btn>Resume</Btn>
              </a>
            </div>
          </div>
        </div>
        {/* bottom Para graph container  */}
        <div>
          <p className=" text-center text-[#edfaff] lg:text-left lg:text-base text-[15px]   my-8">
            {description}
          </p>
        </div>
      </div>
    </main>
  );
}
