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
    <div className="min-h-screen pb-24 bg-white font-sans">
      <div className="w-full mx-auto px-6 lg:px-8 pt-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-4">
          {blog.title}
        </h1>

        {blog.date && (
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-8">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>{blog.date}</span>
          </div>
        )}

        {blog.thumbnailUrl && (
          <div className="w-full aspect-video rounded-2xl bg-gray-50 mb-10 overflow-hidden border border-gray-100 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]">
            <img src={blog.thumbnailUrl} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Rich Text Rendering Area */}
        <div
          className="rich-text-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>

      {/* Premium styles for the rich text elements */}
      <style jsx global>{`
        .rich-text-content {
          font-size: 1.125rem; /* 18px */
          color: #374151;
          line-height: 1.8;
          letter-spacing: -0.01em;
          margin-top: 2rem;
        }
        .rich-text-content > *:first-child {
          margin-top: 0;
        }
        .rich-text-content p {
          margin-bottom: 1.5rem;
        }
        /* Hide empty paragraphs that Quill sometimes inserts and creates huge gaps */
        .rich-text-content p:empty, 
        .rich-text-content p br:only-child {
          display: none;
        }
        .rich-text-content h1, .rich-text-content h2, .rich-text-content h3 {
          color: #111827;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }
        .rich-text-content h1 { font-size: 2.25rem; }
        .rich-text-content h2 { font-size: 1.875rem; border-bottom: 1px solid #f3f4f6; padding-bottom: 0.5rem; }
        .rich-text-content h3 { font-size: 1.5rem; }
        .rich-text-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 2rem;
        }
        .rich-text-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 2rem;
        }
        .rich-text-content li {
          margin-bottom: 0.75rem;
          padding-left: 0.5rem;
        }
        .rich-text-content strong {
          font-weight: 700;
          color: #111827;
        }
        .rich-text-content img {
          border-radius: 0.75rem;
          margin: 3rem auto;
          border: 1px solid #f3f4f6;
          max-width: 100%;
          width: 100%; /* Force image to expand to fill the content width nicely */
          height: auto;
          display: block;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
        }
        .rich-text-content a {
          color: #2563eb;
          text-decoration-color: transparent;
          text-underline-offset: 4px;
          transition: text-decoration-color 0.2s ease;
        }
        .rich-text-content a:hover {
          text-decoration: underline;
          text-decoration-color: #2563eb;
        }
        .rich-text-content blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1.5rem;
          color: #4b5563;
          font-style: italic;
          margin: 2.5rem 0;
          font-size: 1.25rem;
        }
        .rich-text-content pre {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 2.5rem 0;
          font-size: 0.9375rem;
          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
        }
        .rich-text-content code {
          background-color: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-size: 0.875em;
          color: #0f172a;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }
        .rich-text-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
      `}</style>
    </div>
  );
}
