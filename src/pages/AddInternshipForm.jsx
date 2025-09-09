import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const DEFAULT_IMAGE = "https://source.unsplash.com/featured/?internship,job";

const AddInternshipForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    stipend: "",
    description: "",
    duration: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(DEFAULT_IMAGE);
  const [manualImage, setManualImage] = useState(false); // tracks manual image URL or upload

  const navigate = useNavigate();

  // Auto-fetch image from Unsplash on title change if no manual image set
  useEffect(() => {
    if (!manualImage && formData.title.trim() !== "") {
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

    // If user is changing the image URL field manually, update image preview and manualImage flag
    if (name === "image") {
      setManualImage(!!value.trim());
      setImagePreview(value.trim() || DEFAULT_IMAGE);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setManualImage(true);
      setFormData((prev) => ({ ...prev, image: previewUrl }));
      setImagePreview(previewUrl);

      // TODO: Implement upload to server/cloud if needed
    }
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

      {/* Image Preview */}
      <div className="mb-4">
        <img
          src={imagePreview || DEFAULT_IMAGE}
          alt="Internship Preview"
          className="w-full h-48 object-cover rounded border border-gray-300 dark:border-gray-600"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Internship Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
          required
          className="form-input"
        />

        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          required
          className="form-input"
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
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
          className="form-input"
        ></textarea>

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
