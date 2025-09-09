import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Admin = () => {
  const [internships, setInternships] = useState([]);
  const [courses, setCourses] = useState([]); // New
  const [scholarships, setScholarships] = useState([]); // New
  const navigate = useNavigate();

  // ✅ Fetch internships (you can later add API calls for courses, scholarships)
  const fetchInternships = async () => {
    try {
      const { data } = await API.get(
        "https://internshiphub-backend.onrender.com/api/internships"
      );
      setInternships(data);
    } catch (err) {
      console.error("Error fetching internships", err);
    }
  };

  useEffect(() => {
    fetchInternships();

    // TODO: Replace with real API once backend is ready
    setCourses([]); // Placeholder
    setScholarships([]); // Placeholder
  }, []);

  // ✅ Delete internship
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?"))
      return;

    try {
      await API.delete(
        `https://internshiphub-backend.onrender.com/api/internships/${id}`
      );
      setInternships(internships.filter((i) => i._id !== id));
      alert("Internship deleted successfully!");
    } catch (err) {
      console.error("Error deleting internship", err);
      alert("Failed to delete internship");
    }
  };

  return (
    <div className="py-12 px-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>

        {/* ➕ Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => navigate("/admin/add")}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Add New Internship
          </button>
          <button
            onClick={() => navigate("/admin/add-course")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add New Course
          </button>
          <button
            onClick={() => navigate("/admin/add-scholarship")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Add New Scholarship
          </button>
        </div>

        {/* 📁 Manage Internships */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Manage Internships
          </h3>

          {internships.length === 0 ? (
            <p className="text-gray-500">No internships found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {internships.map((internship) => (
                <li
                  key={internship._id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold">{internship.title}</h4>
                    <p className="text-sm text-gray-500">
                      {internship.company} • {internship.location}
                    </p>
                    <p className="text-xs text-gray-400">
                      {internship.description?.slice(0, 50)}...
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit/${internship._id}`)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(internship._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 📁 Manage Courses */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Manage Courses
          </h3>

          {courses.length === 0 ? (
            <p className="text-gray-500">No courses found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Loop over courses when backend ready */}
            </ul>
          )}
        </div>

        {/* 📁 Manage Scholarships */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Manage Scholarships
          </h3>

          {scholarships.length === 0 ? (
            <p className="text-gray-500">No scholarships found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Loop over scholarships when backend ready */}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
