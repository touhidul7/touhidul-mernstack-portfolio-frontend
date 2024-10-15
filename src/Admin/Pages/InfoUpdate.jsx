/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../../Components/FormComponents/Input";

const InfoUpdate = () => {
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
        const response = await axios.get("http://localhost:5000/info");
        setInfo(response.data);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };

    fetchInfo();
  }, []);

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
        await axios.put(`http://localhost:5000/info/${editingId}`, newInfo);
        setMessage("Information updated successfully!");
      } else {
        await axios.post("http://localhost:5000/info", newInfo);
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

      const updatedInfo = await axios.get("http://localhost:5000/info");
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
      await axios.delete(`http://localhost:5000/info/${id}`);
      setMessage("Information deleted successfully!");
      const updatedInfo = await axios.get("http://localhost:5000/info");
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
              className="btn btn-primary mt-2"
            >
              Add Skill
            </button>
          </div>

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
              className="btn btn-primary mt-2"
            >
              Add Experience
            </button>
          </div>

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
                    className="btn btn-primary mt-2"
                  >
                    Add Technology
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={addProject} className="btn btn-primary mt-2">
              Add Project
            </button>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            {editingId ? "Update Info" : "Add Info"}
          </button>
        </form>
        {message && <p className="mt-4">{message}</p>}

        <div className="mt-8">
          {info.map((infoItem) => (
            <div key={infoItem._id} className="bg-gray-200 p-4 mb-4">
              <h2>{infoItem.name}</h2>
              <p>{infoItem.email}</p>
              <p>{infoItem.phone}</p>
              <p>{infoItem.JobTitle}</p>
              <p>{infoItem.Description}</p>
              <div>
                <h3>Experience:</h3>
                <ul>
                  {infoItem.experience?.map((exp, index) => (
                    <li key={index}>
                      <p>Job Title: {exp.jobTitle}</p>
                      <p>Job Range: {exp.range}</p>
                      <p>Job Location: {exp.location}</p>
                      <p>Company: {exp.companyName}</p>
                      <p>Description: {exp.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Projects:</h3>
                <ul>
                  {infoItem.projects?.map((project, index) => (
                    <li key={index}>
                      <p>Project Name: {project.projectName}</p>
                      <p>Description: {project.description}</p>
                      {project.imageLink && (
                        <img
                          src={project.imageLink}
                          alt={`${project.projectName} image`}
                          className="mt-2"
                        />
                      )}
                      {project.projectURL && (
                        <a
                          href={project.projectURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Visit Project
                        </a>
                      )}
                      <div>
                        <h3>Technologies Used:</h3>
                        <ul>
                          {project.technologies.map((tech, techIndex) => (
                            <li key={techIndex}>{tech}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleEdit(infoItem)}
                className="btn btn-secondary"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(infoItem._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InfoUpdate;
