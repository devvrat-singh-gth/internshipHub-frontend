import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // Make sure this points to your axios config

const AddScholarshipForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    description: "",
    link: "",
    eligibility: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔁 Optional: Auto-generate image URL using Unsplash
  const fetchRandomImage = async (query) => {
    try {
      const res = await fetch(
        `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`
      );
      return res.url;
    } catch (err) {
      console.error("Error fetching image:", err);
      return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image;

      if (!imageUrl) {
        imageUrl = await fetchRandomImage(formData.title || "scholarship");
      }

      const payload = {
        ...formData,
        image: imageUrl,
      };

      const token = localStorage.getItem("token");
      await API.post("/scholarships", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Scholarship added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Error adding scholarship:", err);
      alert("Failed to add scholarship. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add New Scholarship
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Scholarship Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <input
            type="text"
            name="organization"
            placeholder="Offering Organization"
            value={formData.organization}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <textarea
            name="description"
            placeholder="Scholarship Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <input
            type="text"
            name="link"
            placeholder="Application Link"
            value={formData.link}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <input
            type="text"
            name="eligibility"
            placeholder="Eligibility Criteria"
            value={formData.eligibility}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (leave blank for auto)"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded font-semibold transition"
          >
            Add Scholarship
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarshipForm;
