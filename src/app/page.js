"use client";
import Btn from "@/components/button/Btn";
import { description, profile as localProfile } from "@/data/profile";
import Image from "next/image";
import React from "react";

export default function Home() {
  const [showSocial, setShowSocial] = React.useState(false);
  const [profile, setProfile] = React.useState(localProfile);

  React.useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error && data.firstName) {
          setProfile((prev) => ({
            ...prev,
            firstName: data.firstName || prev.firstName,
            lastName: data.lastName || prev.lastName,
            position: data.position || prev.position,
            summary: data.summary || prev.summary,
            location: { name: data.locationName || prev.location?.name },
          }));
        }
      })
      .catch(console.error);
  }, []);

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
        <div className="flex flex-col sm:flex-row mt-4 sm:mt-12 gap-6 sm:gap-8 items-center sm:items-center">
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
            <div className="text-[36px] sm:text-[42px] text-black font-black tracking-tighter leading-tight mb-1">
              <h1 className="uppercase">{firstName} {lastName}</h1>
            </div>
            <h4 className="text-gray-600 font-light text-[17px] flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
              {position}
            </h4>

            <div className="flex flex-col gap-1 mb-4">
              {Array.isArray(summary) ? summary.map((line, idx) => (
                <h4 key={idx} className="text-[#333333] text-[17px] font-normal leading-relaxed">
                  {line}
                </h4>
              )) : (
                <h4 className="text-[#333333] text-[17px] font-normal leading-relaxed">
                  {summary}
                </h4>
              )}
            </div>

            <h4 className="text-gray-400 font-light text-[17px] flex items-center gap-2 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              {location?.name}
            </h4>

            {/* Social links  */}
            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                {showSocial
                  ? socialLinks?.map((social) => {
                    return (
                      <a
                        target="_blank"
                        key={social.name}
                        title={social.caption}
                        className="hover:text-gray-600 transition-colors duration-200 text-black text-[24px]"
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
                        className="hover:text-gray-600 transition-colors duration-200 text-black text-[24px]"
                        href={social.url}
                      >
                        {<social.name />}
                      </a>
                    );
                  })}
              </div>
              <button
                className="text-gray-400 font-light text-[15px] hover:text-gray-600 ml-2"
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
