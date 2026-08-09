"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import DOMPurify from "dompurify";

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setBlog(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <button onClick={() => router.push("/blog")} className="text-brand hover:underline">
          Return to Blog
        </button>
      </div>
    );
  }

  // We only run DOMPurify on the client to avoid SSR hydration mismatches
  const sanitizedContent = typeof window !== "undefined" ? DOMPurify.sanitize(blog.content) : blog.content;

  return (
    <div className="min-h-screen pb-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight uppercase leading-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-500 mb-10">
          <Calendar className="w-4 h-4" />
          <span>{blog.date}</span>
        </div>

        {blog.thumbnailUrl && (
          <div className="w-full aspect-video rounded-xl bg-gray-100 mb-12 overflow-hidden border border-gray-100">
            <img src={blog.thumbnailUrl} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Rich Text Rendering Area */}
        <div 
          className="rich-text-content text-gray-800 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      {/* Basic styles for the rich text elements since Tailwind resets them */}
      <style jsx global>{`
        .rich-text-content p {
          margin-bottom: 1.5rem;
        }
        .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 {
          color: #111827;
          font-weight: 800;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .rich-text-content h1 { font-size: 2.25rem; line-height: 1.2; }
        .rich-text-content h2 { font-size: 1.875rem; line-height: 1.3; }
        .rich-text-content h3 { font-size: 1.5rem; line-height: 1.4; }
        .rich-text-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .rich-text-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .rich-text-content li {
          margin-bottom: 0.5rem;
        }
        .rich-text-content strong {
          font-weight: 700;
          color: #000;
        }
        .rich-text-content img {
          border-radius: 0.75rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
          border: 1px solid #f3f4f6;
          max-width: 100%;
          height: auto;
        }
        .rich-text-content a {
          color: #2563eb;
          text-decoration: underline;
        }
        .rich-text-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          color: #4b5563;
          font-style: italic;
          margin: 1.5rem 0;
        }
      `}</style>
    </div>
  );
}
