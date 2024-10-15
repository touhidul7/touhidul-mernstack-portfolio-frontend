/* eslint-disable react/prop-types */
import SectionHeading from "../CommonComponents/SectionHeading";
// import { Link } from "react-router-dom";
// import { ExternalLink } from "lucide-react";
import ProjectsTab from "../CommonComponents/ProjectsTab";

const Projects = ({data}) => {
  console.log("project Data", data.projects);
  // const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="py-10">
      <SectionHeading title={"Projects"} />
      <ProjectsTab data={data} />
    </div>
  );
};

export default Projects;
