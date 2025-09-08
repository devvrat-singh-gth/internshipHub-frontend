// src/pages/AddInternshipForm.jsx
import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const AddInternshipForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    stipend: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // ✅ get token

      await API.post(
        "https://internshiphub-backend.onrender.com/api/internships",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ send token
          },
        }
      );

      alert("✅ Internship added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(
        "Error adding internship",
        err.response?.data || err.message
      );
      alert("❌ Failed to add internship");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">Add Internship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Internship Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-500 dark:placeholder-gray-300"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-500 dark:placeholder-gray-300"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-500 dark:placeholder-gray-300"
          required
        />
        <input
          type="text"
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-500 dark:placeholder-gray-300"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-500 dark:placeholder-gray-300"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
        >
          Add Internship
        </button>
      </form>
    </div>
  );
};

export default AddInternshipForm;
