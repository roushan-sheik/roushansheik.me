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
    <div className="bg-white p-4 rounded-lg border overflow-hidden border-gray-200 shadow-md">
      {/* image-box  */}
      <div className="h-[250px] overflow-hidden border  shadow-inner  rounded-lg">
        <a className="z-10" href={liveURL?.url}>
          <Image
            width={400}
            height={220}
            className="h-full hover:scale-110 duration-300 ease-in object-cover rounded-lg"
            src={cover?.srcPath}
            alt="Img"
          />
        </a>
      </div>
      {/* content-box  */}
      <div className="p-4">
        <a href={liveURL?.url}>
          <h2 className="text-2xl primary_black hover:primary_yellow cursor-pointer">
            {name}
          </h2>
        </a>
        <div className="flex my-3 items-center gap-2 secondary_black text-[14px]">
          <CiCalendar />
          <p>{startDate}</p>
        </div>
        <p className="secondary_black">{summary}</p>
              {/* tags btn  */ }
              <h2 className="text-lg font-medium mt-3 text-black">Techonologies</h2>
        <div className=" flex my-3 gap-2">
          {tags?.map((tag) => {
            return (
              <button
                key={tag}
                className="px-2 py-1 text-[14px] bg-blue-400 rounded-md"
              >
                {tag.name}
              </button>
            );
          })}
        </div>
        {/* repo source code  */}
        <div className="mt-6 flex text-black items-center justify-between gap-2">
          <a href={gitHubRepo?.repo}>
            <div className="flex items-center gap-1">
              <FaGithubSquare className="text-3xl cursor-pointer" />
              <span>Source Code</span>
            </div>
          </a>
          <div className="flex items-center">
            <a href={liveURL?.url}>
              <div className="flex items-center">
                <span>Live</span>
                <FcEnteringHeavenAlive className="text-3xl" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
