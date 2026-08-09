import { Home, FileText, ArrowRight } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">
          Welcome to your portfolio workspace! Select a module below to get started.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/cms/dashboard/home" className="group block bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
          <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
            <Home className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Home Page Content</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Manage your personal profile, job title, and bio to present your best self on the landing page.</p>
          <span className="text-gray-900 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Edit Home Content <ArrowRight className="w-4 h-4 ml-1" /></span>
        </a>
        
        <a href="/cms/dashboard/blogs" className="group block bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1">
          <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Blogs Manager</h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">Write, edit, and publish new blog posts directly to your audience from the built-in markdown editor.</p>
          <span className="text-gray-900 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Manage Blogs <ArrowRight className="w-4 h-4 ml-1" /></span>
        </a>
      </div>
    </div>
  );
}
