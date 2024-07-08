import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";

const Page = ({ params }) => {
  const blog = blogs.filter((item) => item.id === params.id);
  const { id, title, image, body, date } = blog[0];

  return (
    <div
      className="min-h-screen">
      <div className=" blog_glass  py-10 px-6 shadow-xl shadow-white border-2 border-white">
        <Link href={`/blog/${id}`}>
          <div className="w-full lg:h-[400px] cursor-pointer h-[200px]">
            <Image
              className="w-full h-full rounded-md object-cover"
              src={image}
              width={700}
              height={500}
              alt="Blog"
            />
          </div>
        </Link>
        {/* content box  */}
        <div>
          <h2 className={"text-2xl my-5 lg:text-3xl font-semibold text_pri"}>
            {title}
          </h2>
          <div className="flex my-3 items-center gap-2 secondary_black text-[14px]">
            <CiCalendar className="text-xl" />
            <p>{date}</p>
          </div>
          <p className="mt-2 text_sec">{body}</p>
        </div>
        {/* button box  */}
        <div className=" flex justify-end my-6">
          <Link href="/blog">
            <button className="rounded-lg border-2 border-[#00a6fb] lg:px-8 lg:py-3 px-5 py-2 text-xl text-[#1caff9] duration-200 hover:bg-[#00a6fb] hover:text-white">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
