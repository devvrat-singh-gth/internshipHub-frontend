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

  // ✅ Auto-fetch image when title changes and no manual image
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

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setManualImage(false); // reset auto image fetch when title changes
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle skill checkboxes
  const handleCheckbox = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // ✅ Handle image URL input
  const handleImageURLChange = (e) => {
    const url = e.target.value.trim();
    setFormData((prev) => ({ ...prev, image: url }));
    if (url) {
      setManualImage(true);
      setImagePreview(url);
    } else {
      setManualImage(false);
      setImagePreview(DEFAULT_IMAGE);
    }
  };

  // ✅ Handle image upload (local file)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setManualImage(true);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
      setImagePreview(previewUrl);

      // ⚠️ TODO: If you want real upload, connect to backend storage (Cloudinary/S3)
    }
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, image: formData.image || DEFAULT_IMAGE };

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
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Internship Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          {/* Company */}
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          {/* Stipend */}
          <input
            type="text"
            name="stipend"
            placeholder="Stipend"
            value={formData.stipend}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          {/* Duration */}
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
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
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          {/* Sector Dropdown */}
          <div>
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
              Sector
            </label>
            <select
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
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
            <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
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

          {/* Image Upload + URL */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Upload Image (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2 font-medium text-gray-800 dark:text-gray-200">
                Or Paste Image URL
              </label>
              <input
                type="text"
                placeholder="Image URL"
                value={manualImage ? formData.image : ""}
                onChange={handleImageURLChange}
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 w-40 h-28 object-cover rounded border"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold transition"
          >
            Add Internship
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInternshipForm;
