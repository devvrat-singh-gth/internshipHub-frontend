// src/pages/AddInternshipForm.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

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

const AddInternshipForm = () => {
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

  const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);
  const [manualImage, setManualImage] = useState(false);

  // Auto-fetch image when title changes
  useEffect(() => {
    if (!manualImage && formData.title.trim()) {
      const timeout = setTimeout(() => {
        const keyword = encodeURIComponent(formData.title.trim());
        const url = `https://source.unsplash.com/800x600/?${keyword},internship,job`;
        setFormData((prev) => ({ ...prev, image: url }));
        setImagePreview(url);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [formData.title, manualImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      image: formData.image || DEFAULT_IMAGE,
    };

    try {
      const token = localStorage.getItem("token");
      await API.post(
        "https://internshiphub-backend.onrender.com/api/internships",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Internship added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error(
        "Error adding internship:",
        err.response?.data || err.message
      );
      alert("❌ Failed to add internship");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add New Internship
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Internship Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
          />
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
          />
          <input
            type="text"
            name="stipend"
            placeholder="Stipend"
            value={formData.stipend}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
          />

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
          >
            <option value="">Select Duration</option>
            <option value="1 month">1 month</option>
            <option value="1 to 3 months">1 to 3 months</option>
            <option value="3 to 6 months">3 to 6 months</option>
            <option value="6+ months">6+ months</option>
          </select>

          <textarea
            name="description"
            placeholder="Job Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border"
          />

          {/* Sector Dropdown */}
          <div>
            <label className="block mb-2 font-medium">Sector</label>
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="w-full p-3 rounded border"
            >
              <option value="">Select Sector</option>
              {SECTORS.map((sec) => (
                <option key={sec} value={sec}>
                  {sec}
                </option>
              ))}
            </select>
          </div>

          {/* Skills Checkboxes */}
          <div>
            <label className="block mb-2 font-medium">Skills</label>
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

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold"
          >
            Add Internship
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInternshipForm;
