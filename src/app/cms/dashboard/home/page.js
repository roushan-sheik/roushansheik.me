"use client";

import { useEffect, useState } from "react";

export default function HomeEditor() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    summary: "",
    locationName: "",
    avatarUrl: "",
    description: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setFormData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            position: data.position || "",
            summary: Array.isArray(data.summary) ? data.summary.join("\\n") : data.summary || "",
            locationName: data.locationName || "",
            avatarUrl: data.avatarUrl || "",
            description: data.description || "",
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    let uploadedAvatarUrl = formData.avatarUrl;

    if (avatarFile) {
      const form = new FormData();
      form.append("file", avatarFile);
      try {
        const uploadRes = await fetch("/api/upload", { method: "POST", body: form });
        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          uploadedAvatarUrl = uploadData.url;
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

    const submitData = {
      ...formData,
      avatarUrl: uploadedAvatarUrl,
      summary: formData.summary.split("\\n").filter((line) => line.trim() !== ""),
    };

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Profile updated successfully!");
      } else {
        setMessage(data.error || "Failed to update profile.");
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
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Home Page Content</h1>
        <p className="text-gray-500 mt-2">Manage how you present yourself on the main landing page.</p>
      </div>
      
      {message && (
        <div className={`p-4 mb-8 rounded-lg shadow-sm font-medium flex items-center gap-3 ${message.includes("success") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
          <div className={`w-2 h-2 rounded-full ${message.includes("success") ? "bg-green-500" : "bg-red-500"}`}></div>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 space-y-8 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        <div className="border-b border-gray-100 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Image</h3>
          <div className="flex items-center gap-6">
            {formData.avatarUrl || avatarFile ? (
              <img src={avatarFile ? URL.createObjectURL(avatarFile) : formData.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-sm border border-gray-200" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                No Image
              </div>
            )}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload new avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-black transition-all cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">Handled securely by Cloudinary.</p>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-100 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="e.g. John"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="e.g. Doe"
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-100 pb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Professional Info</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="e.g. Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 outline-none"
                placeholder="e.g. San Francisco, CA"
              />
            </div>
          </div>
        </div>

        <div className="pb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Bio & Summary</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Short Bullet Points (One per line)</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 outline-none resize-y"
                placeholder="Author of...&#10;15+ years experience...&#10;Speaker at..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Long Bio Description (Footer)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 outline-none resize-y"
                placeholder="I am a skilled Full-Stack Developer..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-gray-900 text-white font-medium rounded-xl shadow-md hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Changes...
              </>
            ) : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
