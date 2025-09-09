import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

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

  const [imagePreview, setImagePreview] = useState("");
  const [manualImage, setManualImage] = useState(false);

  // Auto-fetch image from Unsplash on title change if no manual image set
  useEffect(() => {
    if (!manualImage && formData.title.trim() !== "") {
      const timeout = setTimeout(() => {
        const keyword = encodeURIComponent(formData.title.trim());
        const url = `https://source.unsplash.com/800x600/?${keyword},scholarship,education`;
        setFormData((prev) => ({ ...prev, image: url }));
        setImagePreview(url);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [formData.title, manualImage]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      setManualImage(!!value.trim());
      setImagePreview(value.trim());
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file upload for scholarship image
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await API.post(
        "https://internshiphub-backend.onrender.com/api/scholarships",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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

          {/* Image upload and URL inputs side by side on md+ */}
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
                name="image"
                value={formData.image && manualImage ? formData.image : ""}
                onChange={handleChange}
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
              />
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Scholarship Preview"
              className="w-full h-64 object-cover rounded mt-4"
            />
          )}

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
