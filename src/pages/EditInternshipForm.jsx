import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const DEFAULT_IMAGE = "https://source.unsplash.com/featured/?internship,job";

const EditInternshipForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    stipend: "",
    description: "",
    duration: "",
    image: "",
  });

  const navigate = useNavigate();

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
        });
      } catch (err) {
        console.error("Error fetching internship", err);
        toast.error("Failed to load internship details");
      }
    };
    fetchInternship();
  }, [id]);

  useEffect(() => {
    if (!formData.image && formData.title) {
      const timeout = setTimeout(() => {
        const keyword = encodeURIComponent(formData.title);
        setFormData((prev) => ({
          ...prev,
          image: `https://source.unsplash.com/800x600/?${keyword},internship`,
        }));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [formData.title]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        image: formData.image || DEFAULT_IMAGE,
      };

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
          className="form-input"
        />
        <input
          type="text"
          name="stipend"
          placeholder="Stipend"
          value={formData.stipend}
          onChange={handleChange}
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

        {/* Image Preview */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Current Image Preview:
          <img
            src={formData.image || DEFAULT_IMAGE}
            alt="Internship"
            className="mt-2 w-32 h-20 object-cover rounded border border-gray-300"
          />
        </div>

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="form-input"
        />

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
