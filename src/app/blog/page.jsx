"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBlogs(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <div className="project_container mt-12 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
            Blog
          </h1>
          <div className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold rounded-md">
            {blogs.length}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          /* Blog List */
          <div className="flex flex-col gap-6">
            {blogs.map((blog) => (
              <Link href={`/blog/${blog.slug}`} key={blog._id}>
                <div className="flex flex-col md:flex-row bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  {/* Thumbnail */}
                  <div className="w-full md:w-72 h-48 md:h-auto bg-gray-900 flex-shrink-0 relative">
                    {blog.thumbnailUrl && (
                      <img
                        src={blog.thumbnailUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-2xl font-semibold text-gray-900 leading-tight mb-2">
                      {blog.title}
                    </h2>
                    
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{blog.date}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            
            {blogs.length === 0 && (
              <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-200">
                No blog posts published yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
