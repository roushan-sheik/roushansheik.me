export default function DashboardOverview() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <p className="text-gray-600 mb-8">
        Welcome to your portfolio dashboard! Use the sidebar to manage your content.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Home Page Content</h2>
          <p className="text-gray-500 text-sm mb-4">Manage your personal profile, job title, and bio.</p>
          <a href="/dashboard/home" className="text-brand-hover hover:underline text-sm font-medium">Edit Home Content &rarr;</a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Blogs Manager</h2>
          <p className="text-gray-500 text-sm mb-4">Write, edit, and publish new blog posts.</p>
          <a href="/dashboard/blogs" className="text-brand-hover hover:underline text-sm font-medium">Manage Blogs &rarr;</a>
        </div>
      </div>
    </div>
  );
}
