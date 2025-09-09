import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // Make sure this is correctly configured

const AddCourseForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    description: "",
    link: "",
    duration: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [manualImage, setManualImage] = useState(false); // Track if user manually uploads or pastes image URL

  // Auto-generate image from Unsplash when title changes and no manual image set
  useEffect(() => {
    if (!manualImage && formData.title.trim() !== "") {
      const timeout = setTimeout(() => {
        const keyword = encodeURIComponent(formData.title.trim());
        const url = `https://source.unsplash.com/800x600/?${keyword},online,course`;
        setFormData((prev) => ({ ...prev, image: url }));
        setImagePreview(url);
      }, 1000); // debounce 1s

      return () => clearTimeout(timeout);
    }
  }, [formData.title, manualImage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setManualImage(true);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
      setImagePreview(previewUrl);

      // TODO: Upload file to server/cloud storage if needed
    }
  };

  // Handle manual URL paste
  const handleImageURLChange = (e) => {
    const url = e.target.value.trim();
    setFormData((prev) => ({ ...prev, image: url }));
    if (url) {
      setManualImage(true);
      setImagePreview(url);
    } else {
      setManualImage(false);
      setImagePreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // If image is a local object URL (file upload preview), you'd normally upload it and replace it with a real URL.
      // For now, we assume the backend can accept the preview URL or you handle upload separately.

      await API.post(
        "https://internshiphub-backend.onrender.com/api/courses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Course added successfully!");
      navigate("/admin");
    } catch (err) {
      console.error("Failed to add course:", err);
      alert("Failed to add course. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          Add New Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Course Title"
            value={formData.title}
            onChange={(e) => {
              handleChange(e);
              setManualImage(false); // Reset auto-fetch if title changes
            }}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <input
            type="text"
            name="provider"
            placeholder="Course Provider"
            value={formData.provider}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <input
            type="text"
            name="link"
            placeholder="Course Link"
            value={formData.link}
            onChange={handleChange}
            required
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 6 weeks)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
          />

          {/* Image Upload and URL Input */}
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
                value={formData.image && manualImage ? formData.image : ""}
                onChange={handleImageURLChange}
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
              />
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded mt-4"
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold transition"
          >
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseForm;
