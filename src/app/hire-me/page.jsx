"use client";

import React, { useState } from "react";
import { Mail, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HireMePage() {
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/hire-me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message: userMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Message sent successfully!");
        setEmail("");
        setUserMessage("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center px-4 py-12 md:py-24">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden font-mono border border-gray-200">
        {/* Terminal Header */}
        <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
          <button 
            onClick={() => router.push('/')}
            className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors focus:outline-none cursor-pointer"
            title="Close"
          ></button>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
          <div className="flex-1 text-center text-xs text-gray-500 select-none font-sans tracking-wide">
            roushansheik:~/hire-me
          </div>
          <div className="w-9"></div> {/* Balances the flex center */}
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 text-gray-800 text-sm sm:text-base text-left">
          <div className="mb-8 leading-relaxed">
            <p className="mb-2 text-blue-600 font-bold">$ ./contract.sh</p>
            <p className="text-gray-600">Initializing hiring module...</p>
            <p className="text-gray-600 mb-4 animate-pulse">_</p>
            <p className="text-gray-600 text-sm">I&apos;m currently available for new projects and full-time opportunities. Provide your details below to establish a secure connection.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-blue-600 flex items-center gap-2 font-semibold">
                <Mail className="w-4 h-4 text-blue-600" /> EMAIL:
              </label>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded border border-gray-200 focus-within:border-gray-400 transition-colors shadow-inner">
                <span className="text-gray-400 font-bold">{'>'}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  spellCheck="false"
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 focus:ring-0 p-0"
                  placeholder="example@gmail.com"
                />
              </div>
            </div>

            <div className="flex flex-col  gap-2">
              <label className="text-blue-600 flex items-center gap-2 font-semibold">
                <MessageSquare className="w-4 h-4 text-blue-600" /> MESSAGE:
              </label>
              <div className="flex gap-3 bg-gray-50 p-3 rounded border border-gray-200 focus-within:border-gray-400 transition-colors shadow-inner">
                <span className="text-gray-400 font-bold mt-1">{'>'}</span>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  required
                  disabled={status === "loading"}
                  rows="4"
                  spellCheck="false"
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 focus:ring-0 p-0 resize-none leading-relaxed"
                  placeholder="Type your transmission here..."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={status === "loading" || !email || !userMessage}
                className="bg-gray-900 hover:bg-black text-white py-2.5 px-6 rounded transition-all disabled:opacity-50 flex items-center gap-2 select-none shadow-md hover:shadow-lg focus:outline-none font-sans font-medium"
              >
                {status === "loading" ? "Executing..." : "Execute Send"}
              </button>
            </div>
          </form>

          {status === "success" && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-blue-600 mb-2 font-bold">$ status check</p>
              <p className="text-green-600 flex items-center gap-2 font-semibold">
                <span className="text-green-600">✓</span> Transmission successfully dispatched. Awaiting response...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-blue-600 mb-2 font-bold">$ status check</p>
              <p className="text-red-600 flex items-center gap-2 font-semibold">
                <span className="text-red-600 font-black">ERR:</span> {message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
