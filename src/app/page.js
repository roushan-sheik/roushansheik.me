"use client";
import Btn from "@/components/button/Btn";
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
      <div className="main_container_box">
        <div className="flex flex-col sm:flex-row mt-4 sm:mt-12 gap-6 sm:gap-8 items-center sm:items-start">
          {/* profile image box */}
          <div className="flex-shrink-0">
            <Image
              className={`rounded-full w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] object-cover`}
              src={avatar.srcPath}
              width={300}
              height={300}
              alt="Roushan"
            />
          </div>
          {/* content box parent */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* title box */}
            <div className="text-[32px] text-black font-extrabold tracking-tight leading-tight">
              <h1 className="uppercase">{firstName} {lastName}</h1>
            </div>
            <h4 className="text-gray-500 text-[15px] py-1 flex items-center gap-2">
              <span className="opacity-70 text-sm">💼</span> {position}
            </h4>
            <h4
              title="https://www.youtube.com/@bytecode-bd"
              className="text-gray-600 text-[15px] py-0.5"
            >
              {summary}
            </h4>
            <h4 className="text-gray-500 text-[15px] py-0.5 flex items-center gap-2">
              <span className="opacity-70 text-sm">📍</span> {location?.name}
            </h4>

            {/* Social links  */}
            <div className="flex py-3 gap-3">
              <div className="flex lg:gap-4 gap-2">
                {showSocial
                  ? socialLinks?.map((social) => {
                      return (
                        <a
                          target="_blank"
                          key={social.name}
                          title={social.caption}
                          className="hover:text-gray-600 transition-colors duration-200 text-black text-[20px]"
                          href={social.url}
                        >
                          {<social.name />}
                        </a>
                      );
                    })
                  : socialLinks.slice(0, 5).map((social) => {
                      return (
                        <a
                          target="_blank"
                          key={social.id}
                          title={social.caption}
                          className="hover:text-gray-600 transition-colors duration-200 text-black text-[20px]"
                          href={social.url}
                        >
                          {<social.name />}
                        </a>
                      );
                    })}
              </div>
              <button
                className="text-gray-500 font-light"
                onClick={() => setShowSocial(!showSocial)}
              >
                {showSocial ? "- less" : "+ more"}
              </button>
            </div>

          </div>
        </div>
        {/* bottom Para graph container  */}
        <div>
          <p className="text-gray-700 text-[15px] my-8 leading-[1.8] text-left">
            {description}
          </p>
        </div>
      </div>
    </main>
  );
}
