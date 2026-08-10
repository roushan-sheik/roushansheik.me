"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Home, Newspaper, Globe, FolderDot, BookOpen, Users, Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const getLinkClass = (path) => {
    // For the root dashboard overview, it must be an exact match
    const isActive = path === "/cms/dashboard" 
      ? pathname === path 
      : pathname?.startsWith(path);
      
    return isActive
      ? "flex items-center gap-3 px-4 py-3 text-sm font-medium bg-gray-900 text-white shadow-md rounded-xl transition-all"
      : "flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all";
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-black">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden top-[80px]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-100 flex flex-col justify-between fixed top-[80px] left-0 md:left-auto h-[calc(100vh-80px)] overflow-y-auto z-50 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div>
          <div className="px-6 py-8 border-b border-gray-50">
            <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <Zap className="text-brand-hover w-6 h-6" /> Workspace
            </h2>
          </div>
          <nav className="mt-6 flex flex-col gap-1 px-4">
            <Link href="/cms/dashboard" className={getLinkClass("/cms/dashboard")}>
              <LayoutDashboard className="w-4 h-4" /> Overview
            </Link>
            <Link href="/cms/dashboard/home" className={getLinkClass("/cms/dashboard/home")}>
              <Home className="w-4 h-4" /> Home Page
            </Link>
            <Link href="/cms/dashboard/projects" className={getLinkClass("/cms/dashboard/projects")}>
              <FolderDot className="w-4 h-4" /> Projects Manager
            </Link>
            <Link href="/cms/dashboard/blogs" className={getLinkClass("/cms/dashboard/blogs")}>
              <Newspaper className="w-4 h-4" /> Blogs Manager
            </Link>
            <Link href="/cms/dashboard/publications" className={getLinkClass("/cms/dashboard/publications")}>
              <BookOpen className="w-4 h-4" /> Publications
            </Link>
            <Link href="/cms/dashboard/subscribers" className={getLinkClass("/cms/dashboard/subscribers")}>
              <Users className="w-4 h-4" /> Messages
            </Link>
          </nav>
        </div>
        
        <div className="p-4 mb-4 flex flex-col gap-2">
          <Link href="/" className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all border border-gray-200">
            <Globe className="w-4 h-4" /> View Live Site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 w-full overflow-x-hidden">
        <div className="md:hidden mb-6 flex items-center">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50">
            <Menu className="w-5 h-5" />
          </button>
          <span className="ml-3 font-bold text-gray-800 tracking-tight">Dashboard Menu</span>
        </div>
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
