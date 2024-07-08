import { motion } from "framer-motion";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import { FaGithubSquare } from "react-icons/fa";
import { FcEnteringHeavenAlive } from "react-icons/fc";
const Project = ({ project }) => {
  const {
    id,
    name,
    srcURL,
    liveURL,
    cover,
    startDate,
    summary,
    tags,
    gitHubRepo,
    achievements,
  } = project;

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
    className="card_glass text_pri p-4 rounded-lg border-2 shadow-[#fc90c8] overflow-hidden border-[#f8eef3] shadow-lg"
    >
      {/* image-box  */}
      <div className="h-[250px] overflow-hidden rounded-lg">
        <a className="z-10" href={liveURL?.url}>
          <Image
            width={400}
            height={220}
            className="h-full object-cover rounded-lg"
            src={cover?.srcPath}
            alt="Img"
          />
        </a>
      </div>
      {/* content-box  */}
      <div className="p-4">
        <a href={liveURL?.url}>
          <h2 className="text-2xl text_pri hover:primary_yellow cursor-pointer">
            {name}
          </h2>
        </a>
        <div className="flex my-3 items-center gap-2 secondary_black text-[14px]">
          <CiCalendar className="text-xl" />
          <p>{startDate}</p>
        </div>
        <p className="text_sec">{summary}</p>
        {/* tags btn  */}
        <h2 className="text-lg font-medium mt-3 text_pri">Techonologies</h2>
        <div className=" flex my-3 gap-2 flex-wrap">
          {tags?.map((tag) => {
            return (
              <button
                key={tag}
                className="px-2 py-1 text-[14px] techonology_glass rounded-md"
              >
                {tag.name}
              </button>
            );
          })}
        </div>
        {/* repo source code  */}
        <div className="mt-6 flex text_pri items-center justify-between gap-2">
          <a href={gitHubRepo?.repo}>
            <div className="flex items-center gap-1">
              <FaGithubSquare className="text-3xl text_pri cursor-pointer" />
              <span>Source Code</span>
            </div>
          </a>
          <div className="flex items-center">
            <a href={liveURL?.url} className="flex items-center">
              <span>Live</span>
              <FcEnteringHeavenAlive className="text-3xl text_brand_pri" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Project;
