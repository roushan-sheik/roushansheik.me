import Blog from "@/components/blog/Blog";
import { blogs } from "@/data/blogs";

const page = () => {
  return (
    <div className={"min-h-screen"}>
      <div className="flex justify-center ">
        <h2 className="lg:text-3xl lg:mb-6 text_pri text-center text-2xl  inline-block font-bold select-none py-8">
          Blogs
        </h2>
      </div>
      {/* blog parent  */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {blogs?.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default page;
