import Project from "@/components/project/Project";
import { projects } from "@/data/projects";

const page = () => {
  return (
    <div className="min-h-screen">
      <div className="project_container">
        <div className="relative">
          <h2 className="lg:text-3xl text-1xl relative inline-block font-bold uppercase select-none py-8">
            Projects{" "}
            <span className="absolute text-base bg_pri primary_yellow border font-light px-2 rounded-full top-4 -right-6">
              {projects.length}
            </span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-8">
          {projects.map((project) => (
            <Project project={project} id={project.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
