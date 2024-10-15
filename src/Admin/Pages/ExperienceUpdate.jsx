import { useEffect, useState } from "react";
import axios from "axios";

const ExperienceUpdate = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // Store success/error messages

  const fetchInfo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/info");
      setExperience(response.data[0].experience);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching experience data.", error);
      setMessage("Error fetching experience data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleAddExperience = async (e) => {
    e.preventDefault();
    const newExperience = { jobTitle, companyName, description };
    try {
      const updatedExperience = [...experience, newExperience];
      await axios.put(`http://localhost:5000/info/0`, { experience: updatedExperience });
      setMessage("Experience added successfully.");
      fetchInfo();
      resetForm();
    } catch (error) {
      console.log("Error adding experience. ", error);
      setMessage("Error adding experience.");
    }
  };

  const handleDeleteExperience = async (index) => {
    try {
      const updatedExperience = experience.filter((_, i) => i !== index);
      await axios.put(`http://localhost:5000/info/0`, { experience: updatedExperience });
      setMessage("Experience deleted successfully.");
      fetchInfo();
    } catch (error) {
      console.log("Error deleting experience.", error);
      setMessage("Error deleting experience.");
    }
  };

  const handleEditExperience = async (e) => {
    e.preventDefault();
    const updatedExp = { jobTitle, companyName, description };
    try {
      const updatedExperience = [...experience];
      updatedExperience[editIndex] = updatedExp;
      await axios.put(`http://localhost:5000/info/0`, { experience: updatedExperience });
      setMessage("Experience updated successfully.");
      fetchInfo();
      resetForm();
      setEditIndex(null); // Reset edit index after editing
    } catch (error) {
      console.log("Error updating experience.", error);
      setMessage("Error updating experience.");
    }
  };

  const resetForm = () => {
    setJobTitle("");
    setCompanyName("");
    setDescription("");
  };

  const handleEditClick = (exp, index) => {
    setEditIndex(index);
    setJobTitle(exp.jobTitle);
    setCompanyName(exp.companyName);
    setDescription(exp.description);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">
        {editIndex !== null ? "Edit Experience" : "Add Experience"}
      </h2>

      {message && (
        <p
          className={`mb-4 p-2 rounded ${
            message.includes("Error") ? "bg-red-200 text-red-800" : "bg-green-200 text-green-800"
          }`}
        >
          {message}
        </p>
      )}

      <form
        onSubmit={editIndex !== null ? handleEditExperience : handleAddExperience}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {editIndex !== null ? "Update Experience" : "Add Experience"}
        </button>
      </form>

      <h3 className="mt-8 text-lg font-medium">Existing Experiences</h3>

      {experience.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {experience.map((exp, index) => (
            <li key={index} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <strong className="text-md">{exp.jobTitle}</strong> at{" "}
                  <span className="italic">{exp.companyName}</span>
                  <p className="text-sm mt-1">{exp.description}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEditClick(exp, index)}
                    className="px-3 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(index)}
                    className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
                  >
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
  );
};

export default ExperienceUpdate;
