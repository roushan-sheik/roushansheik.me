"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";

export default function PublicationsList() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPublications = async () => {
    try {
      const res = await fetch("/api/publications");
      if (res.ok) {
        const data = await res.json();
        setPublications(data);
      }
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;
    try {
      const res = await fetch(`/api/publications/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPublications(publications.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete publication:", error);
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Publications</h1>
          <p className="text-gray-500 mt-2">Manage your external articles, features, and citations.</p>
        </div>
        <Link
          href="/cms/dashboard/publications/new"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl shadow-md hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-5 h-5" /> Add Publication
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        {publications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No publications found. Click &quot;New Publication&quot; to add one!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Publication</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Publisher</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {publications.map((pub) => (
                  <tr key={pub._id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 flex items-center gap-2">
                        {pub.title}
                        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5 max-w-sm truncate">{pub.description}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        {pub.publisherIcon && (
                          <img src={pub.publisherIcon} alt={pub.publisher} className="w-4 h-4 rounded-full object-cover" />
                        )}
                        {pub.publisher}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                      <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-semibold text-gray-600">
                        {pub.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/cms/dashboard/publications/${pub._id}`}
                          className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(pub._id)}
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
