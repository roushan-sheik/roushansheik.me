"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";

export default function PublicationForm() {
  const params = useParams();
  const router = useRouter();
  const isNew = params.id === "new";

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    publisher: "",
    publisherIcon: "",
    date: "",
    type: "",
    description: "",
  });

  const [iconFile, setIconFile] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/publications/${params.id}`)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    let uploadedIconUrl = formData.publisherIcon;

    if (iconFile) {
      const form = new FormData();
      form.append("file", iconFile);
      try {
        const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          uploadedIconUrl = uploadData.url;
        } else {
          setMessage("Icon upload failed.");
          setSaving(false);
          return;
        }
      } catch (err) {
        setMessage("Error uploading icon.");
        setSaving(false);
        return;
      }
    }

    const submitData = {
      ...formData,
      publisherIcon: uploadedIconUrl,
    };

    try {
      const res = await fetch(isNew ? "/api/publications" : `/api/publications/${params.id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (res.ok) {
        router.push("/cms/dashboard/publications");
        router.refresh();
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to save publication.");
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
          href="/cms/dashboard/publications"
          className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors text-gray-500"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {isNew ? "Add Publication" : "Edit Publication"}
          </h1>
          <p className="text-gray-500 mt-1">Fill in the details for the external publication.</p>
        </div>
      </div>

      {message && (
        <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-8">
        
        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
              placeholder="e.g., Yes-Brainer: A Council of AI Models"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">External Link URL</label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Publisher Name</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
              placeholder="e.g., ITNEXT"
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
              placeholder="e.g., Jul 2026"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Publication Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none"
            >
              <option value="" disabled>Select a type...</option>
              <option value="Authored">Authored</option>
              <option value="Featured">Featured</option>
              <option value="Coverage">Coverage</option>
              <option value="Cited in research">Cited in research</option>
              <option value="Cited in books">Cited in books</option>
              <option value="Reference docs">Reference docs</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Publisher Icon */}
        <div className="border-t border-gray-100 pt-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Publisher Icon (Optional)</h3>
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-gray-100 rounded-full border border-gray-200 flex flex-col items-center justify-center overflow-hidden flex-shrink-0 text-gray-400">
              {iconFile || formData.publisherIcon ? (
                <img
                  src={iconFile ? URL.createObjectURL(iconFile) : formData.publisherIcon}
                  alt="Icon"
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="w-6 h-6 opacity-50" />
              )}
            </div>
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIconFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-black transition-all cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">Upload a small square icon/logo for the publisher.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none resize-y"
            placeholder="A short description of the publication..."
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
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
            {saving ? "Saving..." : "Save Publication"}
          </button>
        </div>
      </form>
    </div>
  );
}
