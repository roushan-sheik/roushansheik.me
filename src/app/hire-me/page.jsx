"use client";

import React, { useState } from "react";
import { GoMail } from "react-icons/go";

export default function HireMePage() {
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

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
    <div className="h-full w-full flex items-center justify-center px-4 py-8">
      <div className="max-w-lg w-full bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-gray-100 text-center relative overflow-hidden">
        
        <div className="mx-auto bg-gray-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-inner">
          <GoMail className="text-3xl sm:text-4xl text-gray-700" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2 sm:mb-3">
          Hire Me
        </h1>
        <p className="text-gray-500 font-medium text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
          I'm currently available for new projects and full-time opportunities. Drop your email and a message, and I'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative text-left">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm sm:text-base font-medium py-3 sm:py-3.5 px-4 rounded-xl outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all placeholder-gray-400 disabled:opacity-70"
            />
          </div>

          <div className="relative text-left">
            <textarea
              placeholder="Leave a message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              required
              disabled={status === "loading"}
              rows="4"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm sm:text-base font-medium py-3 sm:py-3.5 px-4 rounded-xl outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all placeholder-gray-400 disabled:opacity-70 resize-none"
            />
          </div>
          
          <button
            type="submit"
            disabled={status === "loading" || !email || !userMessage}
            className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 sm:py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {status === "success" && (
          <div className="mt-6 p-4 bg-green-50 text-green-700 text-sm font-semibold rounded-lg border border-green-100 animate-[fade-in-up_0.3s_ease-out]">
            {message}
          </div>
        )}
        
        {status === "error" && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 text-sm font-semibold rounded-lg border border-red-100 animate-[fade-in-up_0.3s_ease-out]">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
