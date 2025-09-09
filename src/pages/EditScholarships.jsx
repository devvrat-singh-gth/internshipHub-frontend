import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const DEFAULT_SCHOLARSHIP_IMAGE =
  "https://source.unsplash.com/featured/?scholarship,education";

const EditScholarshipForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    eligibility: "",
    description: "",
    deadline: "",
    link: "",
    duration: "",
    image: "",
  });

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        const { data } = await API.get(
          `https://internshiphub-backend.onrender.com/api/scholarships/${id}`
        );
        setFormData({
          title: data.title || "",
          organization: data.organization || "",
          eligibility: data.eligibility || "",
          description: data.description || "",
          deadline: data.deadline || "",
          link: data.link || "",
          duration: data.duration || "",
          image: data.image || "",
        });
      } catch (err) {
        toast.error("Failed to fetch scholarship");
        console.error(err);
      }
    };
    fetchScholarship();
  }, [id]);

  useEffect(() => {
    if (!formData.image && formData.title) {
      const timeout = setTimeout(() => {
        const keyword = encodeURIComponent(formData.title);
        setFormData((prev) => ({
          ...prev,
          image: `https://source.unsplash.com/800x600/?${keyword},scholarship`,
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
      await API.put(
        `https://internshiphub-backend.onrender.com/api/scholarships/${id}`,
        formData
      );
      toast.success("Scholarship updated");
      navigate("/admin");
    } catch (err) {
      toast.error("Failed to update scholarship");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">
        Edit Scholarship
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Scholarship Title"
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Offering Organization"
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          placeholder="Eligibility Criteria"
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          placeholder="Deadline (e.g. 2025-10-01)"
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select Duration</option>
          <option value="1 month">1 month</option>
          <option value="1 to 3 months">1 to 3 months</option>
          <option value="3 to 6 months">3 to 6 months</option>
          <option value="6+ months">6+ months</option>
        </select>
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Application Link"
          required
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL (Optional)"
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />

        {/* Image Preview */}
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Preview:
          <img
            src={formData.image || DEFAULT_SCHOLARSHIP_IMAGE}
            alt="Scholarship"
            className="mt-2 w-32 h-20 object-cover rounded border"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Update Scholarship
        </button>
      </form>
    </div>
  );
};

export default EditScholarshipForm;
