"use client";

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

export default function SubscribersDashboard() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/subscribers");
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
      }
    } catch (error) {
      console.error("Failed to fetch subscribers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscriber message?")) return;

    try {
      const res = await fetch(`/api/subscribers/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s._id !== id));
      } else {
        alert("Failed to delete subscriber");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Hire Me Requests
        </h1>
        <div className="px-3 py-1 bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg">
          Total: {subscribers.length}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium">No subscribers yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {subscribers.map((sub) => (
            <div key={sub._id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{sub.email}</h3>
                  <p className="text-xs text-gray-400 font-medium mt-1">
                    {new Date(sub.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {sub.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
