/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../Components/FormComponents/Input";
import { ExternalLink } from "lucide-react";

const InfoUpdate = () => {
  const serverapi = import.meta.env.VITE_SERVER_API;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [Description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [JobTitle, setJobTitle] = useState("");
  const [Skills, setSkills] = useState([]);
  const [Links, setLinks] = useState({});
  const [experience, setExperience] = useState([
    { jobTitle: "", companyName: "", description: "", range: "", location: "" },
  ]);
  const [projects, setProjects] = useState([
    {
      projectName: "",
      description: "",
      imageLink: "",
      projectURL: "",
      technologies: [],
    },
  ]);
  const [info, setInfo] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await axios.get(serverapi);
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };

    fetchInfo();
  }, [serverapi]);

  const handleSkillChange = (e, index) => {
    const newSkills = [...Skills];
    newSkills[index] = e.target.value;
    setSkills(newSkills);
  };

  const addSkill = () => {
    setSkills([...Skills, ""]);
  };

  const handleLinkChange = (e) => {
    setLinks({ ...Links, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperience = [...experience];
    updatedExperience[index][name] = value;
    setExperience(updatedExperience);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        range: "",
        location: "",
        jobTitle: "",
        companyName: "",
        description: "",
      },
    ]);
  };

  const handleProjectChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProjects = [...projects];
    updatedProjects[index][name] = value;
    setProjects(updatedProjects);
  };

  /* ========================== */
  const handleTechnologyChange = (e, projectIndex, techIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies[techIndex] = e.target.value;
    setProjects(updatedProjects);
  };

  const addTechnology = (projectIndex) => {
    const updatedProjects = [...projects];
    updatedProjects[projectIndex].technologies.push("");
    setProjects(updatedProjects);
  };

  /* ============================ */

  const addProject = () => {
    setProjects([
      ...projects,
      {
        projectName: "",
        description: "",
        imageLink: "",
        projectURL: "",
        technologies: [],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newInfo = {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        Description,
        JobTitle,
        Skills,
        Links,
        experience,
        projects,
      };

      if (editingId) {
        await axios.put(`${serverapi}/${editingId}`, newInfo);
        setMessage("Information updated successfully!");
      } else {
        await axios.post(serverapi, newInfo);
        setMessage("Information added successfully!");
      }

      setFirstName("");
      setLastName("");
      setEmail("");
      setDescription("");
      setPhone("");
      setJobTitle("");
      setSkills([]);
      setLinks({});
      setExperience([
        {
          range: "",
          location: "",
          jobTitle: "",
          companyName: "",
          description: "",
        },
      ]);
      setProjects([
        {
          projectName: "",
          description: "",
          imageLink: "",
          projectURL: "",
          technologies: [],
        },
      ]);
      setEditingId(null);

      const updatedInfo = await axios.get(serverapi);
      setInfo(updatedInfo.data);
    } catch (error) {
      setMessage("Error updating information. Please try again.");
      console.error(error);
    }
  };

  const handleEdit = (infoItem) => {
    const [first, last] = infoItem.name.split(" ");
    setFirstName(first);
    setLastName(last);
    setDescription(infoItem.Description);
    setPhone(infoItem.phone);
    setJobTitle(infoItem.JobTitle);
    setEmail(infoItem.email);
    setSkills(infoItem.Skills || []);
    setLinks(infoItem.Links || {});
    setExperience(
      infoItem.experience || [
        {
          range: "",
          location: "",
          jobTitle: "",
          companyName: "",
          description: "",
        },
      ]
    );
    setProjects(
      infoItem.projects || [
        {
          projectName: "",
          description: "",
          imageLink: "",
          projectURL: "",
          technologies: [],
        },
      ]
    );
    setEditingId(infoItem._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverapi}/${id}`);
      setMessage("Information deleted successfully!");
      const updatedInfo = await axios.get(serverapi);
      setInfo(updatedInfo.data);
    } catch (error) {
      setMessage("Error deleting information. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="pt-14 bg-white dark:bg-gray-900">
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 md:gap-6">
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              name="first_name"
              label="First Name"
              required={true}
            />
            <Input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              name="last_name"
              label="Last Name"
              required={true}
            />
          </div>
          <Input
            type="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required={true}
          />
          <Input
            type="tel"
            label="Phone Number"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            required={true}
          />
          <Input
            type="text"
            label="Job Title"
            onChange={(e) => setJobTitle(e.target.value)}
            value={JobTitle}
            required={true}
          />
          <Input
            type="text"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={Description}
            required={true}
          />

          {/* Skills------------------ */}
          <div className="mt-4">
            <h3 className="font-semibold">Skills</h3>
            {Skills.map((skill, index) => (
              <div key={index} className="mb-2">
                <Input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(e, index)}
                  required={true}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addSkill}
              className="border-b border-blue-500 w-fit p-1 mt-2 font-semibold text-blue-500"
            >
              Add Skill
            </button>
          </div>

          {/* Experience----------- */}
          <div className="mt-4">
            <h3 className="font-semibold">Experience</h3>
            {experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <Input
                  type="text"
                  label="Job Title"
                  name="jobTitle"
                  id="jobTitle"
                  value={exp.jobTitle}
                  onChange={(e) => handleExperienceChange(e, index)}
                  required={true}
                />
                <Input
                  type="text"
                  label="Job Range"
                  name="range"
                  id="jobrange"
                  value={exp.range}
                  onChange={(e) => handleExperienceChange(e, index)}
                  required={true}
                />
                <Input
                  type="text"
                  label="Job Location"
                  name="location"
                  id="joblocation"
                  value={exp.location}
                  onChange={(e) => handleExperienceChange(e, index)}
                  required={true}
                />
                <Input
                  type="text"
                  label="Company Name"
                  name="companyName"
                  id="companyName"
                  value={exp.companyName}
                  onChange={(e) => handleExperienceChange(e, index)}
                  required={true}
                />
                <Input
                  type="text"
                  label="Description"
                  name="description"
                  id="description"
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(e, index)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="border-b border-blue-500 w-fit p-1 mt-2 font-semibold text-blue-500"
            >
              Add Experience
            </button>
          </div>

            {/* Projects-------------- */}
          <div className="mt-4">
            <h3 className="font-semibold">Projects</h3>
            {projects.map((project, projectIndex) => (
              <div key={projectIndex} className="mb-2">
                <Input
                  type="text"
                  label="Project Name"
                  name="projectName"
                  value={project.projectName}
                  onChange={(e) => handleProjectChange(e, projectIndex)}
                  required={true}
                />
                <Input
                  type="text"
                  label="Description"
                  name="description"
                  value={project.description}
                  onChange={(e) => handleProjectChange(e, projectIndex)}
                />
                <Input
                  type="text"
                  label="Image Link"
                  name="imageLink"
                  value={project.imageLink}
                  onChange={(e) => handleProjectChange(e, projectIndex)}
                />
                <Input
                  type="url"
                  label="Project URL"
                  name="projectURL"
                  value={project.projectURL}
                  onChange={(e) => handleProjectChange(e, projectIndex)}
                />

                <div className="mt-4">
                  <h3 className="font-semibold">Project Technologies</h3>
                  {project.technologies.map((technology, techIndex) => (
                    <div key={techIndex} className="mb-2">
                      <Input
                        type="text"
                        value={technology}
                        onChange={(e) =>
                          handleTechnologyChange(e, projectIndex, techIndex)
                        }
                        required={true}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTechnology(projectIndex)}
                    className="border-b border-blue-500 w-fit p-1 mt-2 font-semibold text-green-500 text-sm"
                  >
                    Add Technology
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addProject}
              className="border-b border-blue-500 w-fit p-1 mt-2 font-semibold text-blue-500"
            >
              Add Project
            </button>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            {editingId ? "Update Info" : "Add Info"}
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}

        {/*=================== display INFO===================== */}
        <div className="mt-8 ">
          {info.map((infoItem) => (
            <div
              key={infoItem._id}
              className="bg-gray-200 p-4 mb-4 flex flex-col gap-6 pb-10"
            >
              {/* =============Info edit and delete button================= */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(infoItem)}
                  className="btn btn-accent"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(infoItem._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
              <div className="border border-gray-900 bg-white p-4">
                <h2>
                  {" "}
                  <b>ID: </b>
                  {infoItem._id}
                </h2>
                <strong className="text-md">{infoItem.name}</strong>
                <br />
                <span className="">
                  <b>Title: </b>
                  {infoItem.JobTitle}
                </span>
                <br />
                <span className="">
                  <b>Email: </b>
                  {infoItem.email}
                </span>
                <br />
                <span className="">
                  <b>Phone: </b>
                  {infoItem.phone}
                </span>
                <br />
                <b>Description:</b>
                <p className="text-sm mt-1">{infoItem.Description}</p>
              </div>

              {/* ============Dsplay Skills============= */}
              <div className="p-4 bg-gray-300 rounded-md">
                <h3 className="text-xl font-bold">Skills:</h3>
                {infoItem.Skills.length > 0 ? (
                  <ul className="space-y-4 mt-4">
                    {infoItem.Skills?.map((Skills, techIndex) => (
                      <li
                        key={techIndex}
                        className="px-4 py-2 bg-white rounded shadow"
                      >
                        <div className="flex justify-between items-center">
                          <strong className="text-md">{Skills}</strong>
                          <div className=" flex flex-col items-start gap-2">
                            <button className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600 mt-2">
                              Delete
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-gray-600">No experiences found.</p>
                )}
              </div>

              {/*  */}

              {/*=================== display Experience===================== */}
              <div className="p-4 bg-gray-300 rounded-md">
                <h3 className="text-xl font-bold">Experience:</h3>
                {infoItem.experience.length > 0 ? (
                  <ul className="space-y-4 mt-4">
                    {infoItem.experience?.map((exp, index) => (
                      <li key={index} className="p-4 bg-white rounded shadow">
                        <div className="flex justify-between items-center">
                          <div>
                            <strong className="text-md">{exp.jobTitle}</strong>{" "}
                            at <span className="italic">{exp.companyName}</span>
                            <p>
                              <span className="italic">{exp.range} </span>in{" "}
                              <span className="italic">{exp.location}</span>
                            </p>
                            <p className="text-sm mt-1">{exp.description}</p>
                            <div className=" flex flex-col items-start gap-2">
                              <button className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600 mt-2">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-gray-600">No experiences found.</p>
                )}
              </div>
              {/*=================== display projects===================== */}

              <div className="p-4 bg-gray-300 rounded-md">
                <h3 className="text-xl font-bold">Projects:</h3>
                {infoItem.projects?.length > 0 ? (
                  <ul className="space-y-4 mt-4">
                    {infoItem.projects?.map((project, index) => (
                      <li key={index} className="p-4 bg-white rounded shadow">
                        <div className="flex items-center gap-4">
                          <img
                            className="w-32"
                            src={
                              project.imageLink
                                ? project.imageLink
                                : "https://cdn-icons-png.flaticon.com/128/401/401061.png"
                            }
                            alt={`${project.projectName} image`}
                          />
                          <div>
                            <strong className="text-md">
                              {project.projectName}
                            </strong>{" "}
                            <p>
                              <ul>
                                {project.technologies.map((tech, techIndex) => (
                                  <li key={techIndex}>{tech}</li>
                                ))}
                              </ul>
                            </p>
                            <p>
                              <span className="italic text-green-400 font-medium">
                                <a
                                  className="flex items-center gap-1 hover:underline"
                                  target="_blank"
                                  href={project.projectURL}
                                >
                                  Preview Project
                                  <ExternalLink size={15} />
                                </a>
                              </span>
                            </p>
                            <p className="text-sm mt-1">
                              {project.description}
                            </p>
                            <div className=" flex flex-col items-start gap-2">
                              <button className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600 mt-2">
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-gray-600">No Projects found.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfoUpdate;
