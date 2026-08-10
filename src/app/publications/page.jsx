"use client";

import React, { useEffect, useState, useMemo } from "react";

export default function PublicationsPage() {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPublisher, setSelectedPublisher] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    fetch("/api/publications")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setPublications(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Compute stats for dropdowns
  const publisherStats = useMemo(() => {
    const stats = { All: publications.length };
    publications.forEach((pub) => {
      stats[pub.publisher] = (stats[pub.publisher] || 0) + 1;
    });
    return stats;
  }, [publications]);

  const typeStats = useMemo(() => {
    const stats = { All: publications.length };
    publications.forEach((pub) => {
      stats[pub.type] = (stats[pub.type] || 0) + 1;
    });
    return stats;
  }, [publications]);

  // Filtered list
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      const matchPublisher = selectedPublisher === "All" || pub.publisher === selectedPublisher;
      const matchType = selectedType === "All" || pub.type === selectedType;
      return matchPublisher && matchType;
    });
  }, [publications, selectedPublisher, selectedType]);

  return (
    <div className="min-h-screen pb-20">
      <div className="project_container mt-12 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">
              Publications
            </h1>
            <div className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-700 text-sm font-bold rounded-md">
              {publications.length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 font-medium">Publisher:</label>
            <select
              value={selectedPublisher}
              onChange={(e) => setSelectedPublisher(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            >
              <option value="All">All ({publisherStats.All})</option>
              {Object.entries(publisherStats)
                .filter(([key]) => key !== "All")
                .sort((a, b) => a[0].localeCompare(b[0]))
                .map(([publisher, count]) => (
                  <option key={publisher} value={publisher}>
                    {publisher} ({count})
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-500 font-medium">Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 focus:ring-2 focus:ring-gray-900 focus:outline-none"
            >
              <option value="All">All ({typeStats.All})</option>
              {Object.entries(typeStats)
                .filter(([key]) => key !== "All")
                .sort((a, b) => b[1] - a[1]) // Sort by count descending like screenshot
                .map(([type, count]) => (
                  <option key={type} value={type}>
                    {type} ({count})
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          /* Publication List */
          <div className="flex flex-col gap-6">
            {filteredPublications.map((pub) => (
              <div
                key={pub._id}
                className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
              >
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xl sm:text-2xl font-semibold text-gray-900 hover:text-red-500 transition-colors mb-4"
                >
                  {pub.title}
                </a>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-gray-500 mb-4">
                  {pub.publisherIcon && (
                    <img src={pub.publisherIcon} alt={pub.publisher} className="w-4 h-4 object-cover rounded-full" />
                  )}
                  <span className="text-gray-900">{pub.publisher}</span>
                  <span className="text-gray-300">•</span>
                  <span>{pub.date}</span>
                  <span className="text-gray-300">•</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                    {pub.type}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
                  {pub.description}
                </p>
              </div>
            ))}
            
            {filteredPublications.length === 0 && (
              <div className="text-center py-20 text-gray-500 bg-white rounded-xl border border-gray-200">
                No publications found matching these filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
