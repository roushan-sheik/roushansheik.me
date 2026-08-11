"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Terminal } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/cms/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Connection to auth server failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px #1e1e1e inset !important;
            -webkit-text-fill-color: #f3f4f6 !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-6 font-mono">
        <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-xl shadow-2xl overflow-hidden border border-gray-800/60">

        
        {/* Terminal Header */}
        <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-black/50 select-none">
          <div className="flex space-x-2 w-20">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
          </div>
          <div className="text-gray-400 text-xs font-semibold tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            <span>admin@portfolio:~</span>
          </div>
          <div className="w-20"></div> {/* Spacer for perfect centering */}
        </div>

        {/* Terminal Body */}
        <div className="p-8 text-gray-300 relative bg-[#1e1e1e]">
          <div className="mb-8">
            <p className="text-blue-400 font-semibold mb-1">Portfolio OS v2.0.4 (GNU/Linux)</p>
            <p className="text-gray-500 text-sm">System ready. Please provide credentials to mount admin volume.</p>
          </div>

          {error && (
            <div className="mb-6 text-red-400 flex items-start gap-2 bg-red-400/10 p-3 rounded border border-red-400/20">
              <span className="font-bold">Error:</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm">
                <span className="text-emerald-400 font-bold">admin@portfolio</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400 font-bold">~</span>
                <span className="text-gray-400">$ </span>
                <span className="text-gray-300">prompt email</span>
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">{">"}</span>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-100 placeholder-gray-600 outline-none caret-gray-100 pl-0"
                  placeholder="admin@example.com"
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm">
                <span className="text-emerald-400 font-bold">admin@portfolio</span>
                <span className="text-gray-400">:</span>
                <span className="text-blue-400 font-bold">~</span>
                <span className="text-gray-400">$ </span>
                <span className="text-gray-300">prompt password</span>
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-gray-500">{">"}</span>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-100 placeholder-gray-600 outline-none caret-gray-100 pl-0"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="group flex items-center text-gray-300 hover:text-white transition-colors disabled:opacity-50 w-full text-left outline-none cursor-pointer"
              >
                <span className="text-emerald-400 font-bold mr-2">admin@portfolio:~$</span> 
                <span>./authenticate.sh</span>
                {loading && <span className="ml-3 text-yellow-400 text-sm">Running...</span>}
                <span className={`inline-block w-2.5 h-5 bg-gray-400 ml-2 align-middle ${cursorBlink ? 'opacity-100' : 'opacity-0'}`}></span>
              </button>
            </div>
          </form>
          
          <div className="mt-12 pt-6 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
            <span>Server: Online</span>
            <span>Port: 443</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
