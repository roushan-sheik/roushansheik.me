import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50 text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between">
        <div>
          <div className="px-6 py-8 border-b border-gray-50">
            <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
              <span className="text-2xl">⚡</span> Workspace
            </h2>
          </div>
          <nav className="mt-6 flex flex-col gap-1 px-4">
            <Link href="/dashboard" className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
              Overview
            </Link>
            <Link href="/dashboard/home" className="px-4 py-3 text-sm font-medium bg-gray-900 text-white shadow-md rounded-xl transition-all">
              Home Page
            </Link>
            <Link href="/dashboard/blogs" className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
              Blogs Manager
            </Link>
          </nav>
        </div>
        
        <div className="p-4 mb-4">
          <Link href="/" className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-all border border-gray-200">
            <span>🌍</span> View Live Site
          </Link>
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
