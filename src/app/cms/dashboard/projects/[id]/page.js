"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";

export default function ProjectForm() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";

  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    thumbnailUrl: "",
    date: "",
    stars: 0,
    description: "",
    tags: "", // We will handle it as string in form, and parse on submit
    achievementsCount: 0,
    demoUrl: "",
    sourceUrl: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/projects/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setFormData({
              ...data,
              tags: data.tags?.join(", ") || "",
            });
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
          setMessage("Image upload failed.");
          setSaving(false);
          return;
        }
      } catch (err) {
        setMessage("Error uploading image.");
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
      const res = await fetch(isNew ? "/api/projects" : `/api/projects/${params.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        router.push("/cms/dashboard/projects");
        router.refresh();
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to save project.");
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
          href="/cms/dashboard/projects"
          className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-gray-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {isNew ? "Create Project" : "Edit Project"}
          </h1>
          <p className="text-gray-500 mt-1">Fill in the project details below.</p>
        </div>
      </div>

      {message && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-8 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        {/* Thumbnail Section */}
        <div className="border-b border-gray-100 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Project Thumbnail</h3>
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
              <p className="text-xs text-gray-500 mt-2">Recommended aspect ratio 16:9. Securely hosted on Cloudinary.</p>
            </div>
          </div>
        </div>

        {/* Basic Details */}
        <div className="border-b border-gray-100 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                placeholder="e.g. Yes-Brainer"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Icon (Emoji or URL)</label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                placeholder="e.g. 🧠"
              />
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
                placeholder="e.g. Jul 2026"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Stars</label>
                <input
                  type="number"
                  name="stars"
                  value={formData.stars}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Achievements</label>
                <input
                  type="number"
                  name="achievementsCount"
                  value={formData.achievementsCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content & Meta */}
        <div className="border-b border-gray-100 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Content & Links</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none resize-y"
                placeholder="A brief explanation of the project..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (Comma separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                placeholder="e.g. AI, LLM, React"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Demo URL</label>
                <input
                  type="url"
                  name="demoUrl"
                  value={formData.demoUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Source Code URL</label>
                <input
                  type="url"
                  name="sourceUrl"
                  value={formData.sourceUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
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
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
