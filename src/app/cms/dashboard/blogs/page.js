"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function BlogsList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((b) => b._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Blogs Manager</h1>
          <p className="text-gray-500 mt-2">Write and manage your publications.</p>
        </div>
        <Link
          href="/cms/dashboard/blogs/new"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-5 h-5" /> New Post
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {blogs.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No blog posts found. Click &quot;New Post&quot; to start writing!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Post</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex-shrink-0">
                          {blog.thumbnailUrl && (
                            <img src={blog.thumbnailUrl} alt={blog.title} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500 mt-0.5 max-w-sm truncate">
                            {blog.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{blog.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/cms/dashboard/blogs/${blog._id}`}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
