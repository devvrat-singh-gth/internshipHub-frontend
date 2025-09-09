import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const DEFAULT_COURSE_IMAGE =
  "https://source.unsplash.com/featured/?online,course";

const EditCourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    provider: "",
    duration: "",
    link: "",
    image: "",
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await API.get(`/api/courses/${id}`);
        setFormData({
          title: data.title || "",
          provider: data.provider || "",
          duration: data.duration || "",
          link: data.link || "",
          image: data.image || "",
        });
      } catch (err) {
        toast.error("Failed to fetch course details");
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/api/courses/${id}`, formData);
      toast.success("Course updated successfully");
      navigate("/admin");
    } catch (err) {
      toast.error("Failed to update course");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Edit Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Course Title"
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <input
          type="text"
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          placeholder="Provider"
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />

        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
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
          placeholder="Course Link"
          className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          required
        />

        {/* Image URL */}
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
            src={formData.image || DEFAULT_COURSE_IMAGE}
            alt="Course"
            className="mt-2 w-32 h-20 object-cover rounded border"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourseForm;
