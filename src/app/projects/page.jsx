"use client";

import React, { useEffect, useState } from "react";
import Project from "@/components/project/Project";
import { ChevronDown, Star } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("start date");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalStars = projects.reduce((acc, curr) => acc + (curr.stars || 0), 0);

  // Sorting Logic
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === "stars") {
      return (b.stars || 0) - (a.stars || 0);
    }
    // Default to start date (newest first based on creation if date isn't easily parseable, or just leave as is since API returns newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="min-h-screen pb-20">
      <div className="project_container mt-12">
        {/* Header Section */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
              Projects
            </h1>
            <div className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold rounded-md">
              {projects.length}
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 text-gray-700 text-sm font-medium py-1.5 pl-3 pr-8 rounded-lg outline-none focus:ring-2 focus:ring-gray-900 cursor-pointer"
                >
                  <option value="start date">start date</option>
                  <option value="stars">stars</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Total Stars */}
            <div className="text-sm font-medium text-gray-600 flex items-center gap-1.5 hidden sm:flex">
              Total stars:
              <span className="text-gray-900 font-bold flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                {totalStars >= 1000 ? (totalStars / 1000).toFixed(1) + "K" : totalStars}
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          /* Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <Project project={project} key={project._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
