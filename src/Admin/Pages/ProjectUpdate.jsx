/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";

const ProjectUpdate = () => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null); // For tracking which project is being edited

  // Fetch existing projects from the API when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects"); // Use correct endpoint
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update an existing project
        await axios.put(`http://localhost:5000/projects/${editingId}`, {
          projectName,
          description,
        });
        setMessage("Project updated successfully!");
      } else {
        // Add a new project
        await axios.post("http://localhost:5000/projects", {
          projectName,
          description,
        });
        setMessage("Project added successfully!");
      }

      // Reset form fields
      setProjectName("");
      setDescription("");
      setEditingId(null); // Reset the editing state

      // Re-fetch projects to reflect the new or updated project
      const updatedProjects = await axios.get("http://localhost:5000/projects");
      setProjects(updatedProjects.data);
    } catch (error) {
      setMessage("Error updating project. Please try again.");
      console.error(error);
    }
  };

  const handleEdit = (project) => {
    // Set form fields to the selected project's data for editing
    setProjectName(project.projectName);
    setDescription(project.description);
    setEditingId(project._id); // Use _id as it's the default field in MongoDB
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/projects/${id}`); // Use the correct endpoint
      setMessage("Project deleted successfully!");

      // Re-fetch projects after deletion
      const updatedProjects = await axios.get("http://localhost:5000/projects");
      setProjects(updatedProjects.data);
    } catch (error) {
      setMessage("Error deleting project. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Update Projects</h1>
      {message && <p className="text-green-500">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="projectName">
            Project Name
          </label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Project Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            required
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          {editingId ? "Update" : "Add"} Project
        </button>
      </form>

      {/* Displaying all projects */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">All Projects</h2>
        <ul className="mt-4">
          {projects.map((project) => (
            <li key={project._id} className="border-b py-2">
              <h3 className="font-medium">{project.projectName}</h3>
              <p>{project.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(project)} // Edit button
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)} // Pass the _id here for delete
                  className="bg-red-500 text-white py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectUpdate;
