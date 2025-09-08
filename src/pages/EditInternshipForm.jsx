// src/pages/EditInternshipForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const EditInternshipForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    stipend: "",
    description: "",
  });

  const navigate = useNavigate();

  // ✅ Fetch internship details
  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const { data } = await API.get(
          `https://internshiphub-backend.onrender.com/api/internships/${id}`
        );

        // ✅ Pick only required fields
        setFormData({
          title: data.title || "",
          company: data.company || "",
          location: data.location || "",
          stipend: data.stipend || "",
          description: data.description || "",
        });
      } catch (err) {
        console.error("Error fetching internship", err);
        toast.error("Failed to load internship details");
      }
    };
    fetchInternship();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        `https://internshiphub-backend.onrender.com/api/internships/${id}`,
        formData
      );
      toast.success("Internship updated successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Error updating internship", err);
      toast.error("Failed to update internship");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">Edit Internship</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Internship Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded 
             text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-400 dark:placeholder-gray-300"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded 
             text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-400 dark:placeholder-gray-300"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded 
             text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-400 dark:placeholder-gray-300"
        />
        <input
          type="text"
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded 
             text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-400 dark:placeholder-gray-300"
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded 
             text-gray-900 dark:text-white 
             bg-white dark:bg-gray-700 
             placeholder-gray-400 dark:placeholder-gray-300"
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Internship
        </button>
      </form>
    </div>
  );
};

export default EditInternshipForm;
