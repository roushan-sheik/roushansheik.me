"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";

const Blog = ({ blog }) => {
  const { id, title, image, body, date } = blog;
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        ease: "linear",
        duration: 0.4,
        x: { duration: 1 },
      }}
      className=" blog_glass p-6 shadow-xl shadow-white border-2 border-white"
    >
      <Link href={`/blog/${id}`}>
        <div className="w-full lg:h-[300px] cursor-pointer h-[200px]">
          <Image
            className="w-full h-full rounded-md object-cover"
            src={image}
            width={700}
            height={300}
            alt="Blog"
          />
        </div>
      </Link>
      <div>
        <h2 className={"text-2xl my-3 lg:text-3xl font-semibold text_pri"}>
          {title}
        </h2>
        <div className="flex my-3 items-center gap-2 secondary_black text-[14px]">
          <CiCalendar className="text-xl" />
          <p>{date}</p>
        </div>
        <p className="mt-2 text_sec">{body.slice(0, 250)}</p>
        <Link href={`/blog/${id}`}>
          <button className=" text_brand_pri">Read More+</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Blog;
