"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, LayoutDashboard, Home, Newspaper, Globe, FolderDot, BookOpen, Users } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

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
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between h-[calc(100vh-100px)] sticky top-[80px]">
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
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
