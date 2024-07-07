"use client";
import Project from "@/components/project/Project";
import { projects } from "@/data/projects";
import React from "react";

const Page = () => {
  const [showMore, setShowMore] = React.useState(false);

  return (
    <div className="min-h-screen">
      <div className="project_container">
        <div className="relative">
          <h2 className="lg:text-3xl text_pri text-1xl relative inline-block font-bold uppercase select-none py-8">
            Projects
            <span className="absolute text-base counter_glass  border border-white font-light px-2 rounded-full top-3 -right-6">
              {projects.length}
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">
          {showMore
            ? projects.map((project) => (
                <Project project={project} key={project.id} id={project.id} />
              ))
            : projects
                .slice(0, 6)
                .map((project) => (
                  <Project project={project} key={project.id} id={project.id} />
                ))}
        </div>
        {/* show more button  */}
        <div className="flex justify-center my-7">
          <button
            onClick={() => setShowMore(!showMore)}
            className="rounded-lg border-2 border-[#00a6fb] lg:px-8 lg:py-3 px-5 py-2 text-xl text-[#1caff9] duration-200 hover:bg-[#00a6fb] hover:text-white"
          >
            {showMore ? "Show Less-" : "Show More+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
