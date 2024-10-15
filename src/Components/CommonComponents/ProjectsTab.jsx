/* eslint-disable react/prop-types */
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

const ProjectsTab = ({data}) => {
  const projectsdata = data?.projects || [];
  const [selectedTab, setSelectedTab] = useState(0);
  
  return (
    <div className="flex gap-20 py-10">
      <div className="border-l-[1px] border-white flex flex-col gap-6 ">
        {projectsdata.map((project, index) => (
          <div
            onClick={() => {
              setSelectedTab(index);
            }}
            key={index}
            className={`hover:border-l-[3px] w-40 py-2 pr-2 cursor-pointer border-success pl-6 ml-[-2px]
                 ${
                   selectedTab === index
                     ? "border-l-[3px] border-success bg-[#003b2696]"
                     : "border-none"
                 }`}
          >
            {project.projectName || "Unnamed Project"}
          </div>
        ))}
      </div>

      {projectsdata[selectedTab] && (
        <div
          className={`${
            projectsdata[selectedTab].imageLink
              ? "gap-6 flex lg:flex-row flex-col items-center"
              : "gap-0"
          }`}
        >
          {projectsdata[selectedTab].imageLink && (
            <img
              className="block h-44 w-auto"
              src={projectsdata[selectedTab].imageLink}
              alt={projectsdata[selectedTab].projectName || "Project Image"}
            />
          )}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-success">
              {projectsdata[selectedTab].projectName}
            </h2>

            {projectsdata[selectedTab].technologies.map((technologies, index) => (
              <h2 key={index} className="text-lg font-semibold">{technologies}</h2>
            ))}
            
            <p>{projectsdata[selectedTab].description || "No description available."}</p>
            {projectsdata[selectedTab].projectURL && (
              <p>
                <Link
                  className="flex gap-2 text-green-500 hover:underline"
                  to={projectsdata[selectedTab].projectURL}
                >
                  Preview Link <ExternalLink size={20} />
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
