import Image from "next/image";
import { Star, Calendar, Play, Github, Award } from "lucide-react";

const Project = ({ project }) => {
  const {
    title,
    icon,
    thumbnailUrl,
    date,
    stars,
    description,
    tags,
    achievementsCount,
    demoUrl,
    sourceUrl,
  } = project;

  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      {/* Thumbnail */}
      <div className="w-full h-48 relative bg-gray-900 border-b border-gray-100 overflow-hidden">
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        
        {/* Header: Icon + Title */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {title}
          </h3>
        </div>

        {/* Meta: Date & Stars */}
        <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5" />
            <span>{stars}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1 line-clamp-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tags?.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-semibold rounded-md tracking-wide uppercase"
            >
              {tag}
            </span>
          ))}
          {tags?.length > 3 && (
            <span className="px-2.5 py-1 text-gray-500 text-[11px] font-medium tracking-wide">
              + more
            </span>
          )}
        </div>

        {/* Achievements */}
        {achievementsCount > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-4 h-4 text-gray-800" />
            <span className="text-xs font-semibold text-gray-900 border-b border-gray-300">
              Achievements
            </span>
            <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded">
              {achievementsCount}
            </span>
          </div>
        )}
        {!achievementsCount && <div className="mb-6"></div>}

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 flex-1 py-2 px-4 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> Demo
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 flex-1 py-2 px-4 border border-gray-200 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Github className="w-4 h-4" /> Source Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
