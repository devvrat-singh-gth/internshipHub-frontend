// src/pages/EditInternshipForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const DEFAULT_IMAGE = "https://source.unsplash.com/featured/?internship,job";

const SECTORS = [
  "IT",
  "Finance",
  "Marketing",
  "Education",
  "Government",
  "Social Work",
];
const SKILLS = [
  "React",
  "Python",
  "Data Analysis",
  "Communication",
  "Leadership",
];

const EditInternshipForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    stipend: "",
    description: "",
    duration: "",
    image: "",
    sector: "",
    skills: [],
  });

  // ✅ Fetch internship details
  useEffect(() => {
    const fetchInternship = async () => {
      try {
        const { data } = await API.get(
          `https://internshiphub-backend.onrender.com/api/internships/${id}`
        );

        setFormData({
          title: data.title || "",
          company: data.company || "",
          location: data.location || "",
          stipend: data.stipend || "",
          description: data.description || "",
          duration: (data.duration || "").trim(),
          image: data.image || "",
          sector: data.sector || "",
          skills: Array.isArray(data.skills) ? data.skills : [],
        });
      } catch (err) {
        console.error("Error fetching internship", err);
        toast.error("Failed to load internship details");
      }
    };
    fetchInternship();
  }, [id]);

  // ✅ Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle skills checkboxes
  const handleCheckbox = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, image: formData.image || DEFAULT_IMAGE };

      await API.put(
        `https://internshiphub-backend.onrender.com/api/internships/${id}`,
        payload
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
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Internship Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />

        {/* Company */}
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />

        {/* Stipend */}
        <input
          type="text"
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />

        {/* Duration */}
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Duration</option>
          <option value="1 month">1 month</option>
          <option value="1 to 3 months">1 to 3 months</option>
          <option value="3 to 6 months">3 to 6 months</option>
          <option value="6+ months">6+ months</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        ></textarea>

        {/* ✅ Sector Dropdown with saved value pre-selected */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Sector
          </label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full p-3 rounded border dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Sector</option>
            {SECTORS.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Skills Checkboxes with saved values pre-checked */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Skills
          </label>
          <div className="flex flex-wrap gap-4">
            {SKILLS.map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.skills.includes(skill)}
                  onChange={() => handleCheckbox(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Image Preview */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Preview:
          <img
            src={formData.image || DEFAULT_IMAGE}
            alt="Internship"
            className="mt-2 w-32 h-20 object-cover rounded border"
          />
        </div>

        {/* Image URL input */}
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />

        {/* Submit */}
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
