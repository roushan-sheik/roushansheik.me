import Image from "next/image";
import { CiCalendar } from "react-icons/ci";

const Blog = ({ blog }) => {
  const { id, title, image, body, date } = blog;

  return (
    <div className=" blog_glass p-6 shadow-xl shadow-white border-2 border-white">
      <div className="w-full lg:h-[300px] h-[200px]">
        <Image
          className="w-full h-full object-cover"
          src={image}
          width={700}
          height={300}
          alt="Blog"
        />
      </div>
      <div>
        <h2 className={"text-2xl my-3 lg:text-3xl font-semibold text_pri"}>
          {title}
        </h2>
        <div className="flex my-3 items-center gap-2 secondary_black text-[14px]">
          <CiCalendar className="text-xl" />
          <p>{date}</p>
        </div>
        <p className="mt-2 text_sec">{body}</p>
      </div>
    </div>
  );
};

export default Blog;
