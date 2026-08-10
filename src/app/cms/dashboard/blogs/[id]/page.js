"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function Comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

export default function BlogForm() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";
  const quillRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    thumbnailUrl: "",
    date: "",
    excerpt: "",
    content: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/blogs/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setFormData(data);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [isNew, params.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  // Custom Image Handler for Quill
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const form = new FormData();
        form.append("file", file);
        
        try {
          const res = await fetch("/api/upload", { method: "POST", body: form });
          const data = await res.json();
          if (data.url) {
            // Get Quill instance
            const quill = quillRef.current.getEditor();
            let range = quill.getSelection(true);
            let index = range ? range.index : quill.getLength();
            
            // Insert image URL
            quill.insertEmbed(index, "image", data.url);
            quill.setSelection(index + 1);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Failed to upload image.");
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    let uploadedThumbnailUrl = formData.thumbnailUrl;

    if (thumbnailFile) {
      const form = new FormData();
      form.append("file", thumbnailFile);
      try {
        const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          uploadedThumbnailUrl = uploadData.url;
        } else {
          setMessage("Thumbnail upload failed.");
          setSaving(false);
          return;
        }
      } catch (err) {
        setMessage("Error uploading thumbnail.");
        setSaving(false);
        return;
      }
    }

    if (!uploadedThumbnailUrl && !isNew && !formData.thumbnailUrl) {
      setMessage("Thumbnail image is required.");
      setSaving(false);
      return;
    }

    const submitData = {
      ...formData,
      thumbnailUrl: uploadedThumbnailUrl,
    };

    try {
      const res = await fetch(isNew ? "/api/blogs" : `/api/blogs/${params.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        router.push("/cms/dashboard/blogs");
        router.refresh();
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to save blog post.");
      }
    } catch (err) {
      setMessage("An error occurred while saving.");
    }
    setSaving(false);
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
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/cms/dashboard/blogs"
          className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-gray-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {isNew ? "Create Blog Post" : "Edit Blog Post"}
          </h1>
          <p className="text-gray-500 mt-1">Write your content using the rich text editor.</p>
        </div>
      </div>

      {message && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-8 transition-all">
        
        {/* Thumbnail Section */}
        <div className="border-b border-gray-100 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Cover Image</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-48 h-32 bg-gray-100 rounded-xl border border-gray-200 flex flex-col items-center justify-center overflow-hidden flex-shrink-0 text-gray-400">
              {thumbnailFile || formData.thumbnailUrl ? (
                <img
                  src={thumbnailFile ? URL.createObjectURL(thumbnailFile) : formData.thumbnailUrl}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs font-medium">No Image</span>
                </>
              )}
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
                required={isNew && !formData.thumbnailUrl}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-black transition-all cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">Recommended aspect ratio 16:9 for blogs.</p>
            </div>
          </div>
        </div>

        {/* Basic Details */}
        <div className="border-b border-gray-100 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Meta Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                placeholder="Blog Title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Slug (optional)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                placeholder="my-blog-post"
              />
              <p className="text-xs text-gray-500 mt-1">Leave blank to auto-generate from title.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date Display</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                placeholder="e.g. Jan 12, 2025"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows="2"
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none resize-y"
                placeholder="A short description for the blog card..."
              />
            </div>
          </div>
        </div>

        {/* Rich Text Content */}
        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Blog Content</h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <ReactQuill
              forwardedRef={quillRef}
              theme="snow"
              modules={modules}
              value={formData.content}
              onChange={handleContentChange}
              className="h-[500px] mb-12"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl shadow-md hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 flex items-center gap-2"
          >
            {saving ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : <Save className="w-5 h-5" />}
            {saving ? "Saving..." : "Save Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
