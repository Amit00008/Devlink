import { TwicPicture } from "@twicpics/components/react";
import React, { useEffect } from "react";

const ProjectList = ({ projects }) => {
  useEffect(() => {
    console.log("Projects received in ProjectList:", projects);
  }, [projects]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-white">My Projects</h2>

      {Array.isArray(projects) && projects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 shadow-xl text-white p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <TwicPicture
                  src={project.logo || "/default-logo.png"} // Fallback image
                  alt={project.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <h3 className="text-lg font-medium">{project.name}</h3>
              </div>
              <p className="mt-2 text-gray-400">{project.description}</p>

              <div className="mt-4 flex justify-between items-center">
                {project.category && (
                  <span className="badge badge-primary">{project.category}</span>
                )}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Visit
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Skeleton Loader
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-800 animate-pulse p-4 rounded-xl"
            >
              <div className="h-12 w-12 bg-gray-700 rounded-lg mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-700 mb-2"></div>
              <div className="h-3 w-full bg-gray-700 mb-2"></div>
              <div className="h-3 w-5/6 bg-gray-700"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
