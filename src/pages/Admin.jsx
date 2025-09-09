// src/pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const Admin = () => {
  const [internships, setInternships] = useState([]);
  const [courses, setCourses] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const navigate = useNavigate();

  // Fetch functions
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

  const fetchCourses = async () => {
    try {
      const { data } = await API.get(
        "https://internshiphub-backend.onrender.com/api/courses"
      );
      setCourses(data);
    } catch (err) {
      console.error("Error fetching courses", err);
    }
  };

  const fetchScholarships = async () => {
    try {
      const { data } = await API.get(
        "https://internshiphub-backend.onrender.com/api/scholarships"
      );
      setScholarships(data);
    } catch (err) {
      console.error("Error fetching scholarships", err);
    }
  };

  useEffect(() => {
    fetchInternships();
    fetchCourses();
    fetchScholarships();
  }, []);

  // Delete handler for internships
  const handleDeleteInternship = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?"))
      return;
    try {
      await API.delete(
        `https://internshiphub-backend.onrender.com/api/internships/${id}`
      );
      setInternships((prev) => prev.filter((item) => item._id !== id));
      alert("Internship deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete internship");
    }
  };

  // Delete handler for courses
  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await API.delete(
        `https://internshiphub-backend.onrender.com/api/courses/${id}`
      );
      setCourses((prev) => prev.filter((item) => item._id !== id));
      alert("Course deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  };

  // Delete handler for scholarships
  const handleDeleteScholarship = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scholarship?"))
      return;
    try {
      await API.delete(
        `https://internshiphub-backend.onrender.com/api/scholarships/${id}`
      );
      setScholarships((prev) => prev.filter((item) => item._id !== id));
      alert("Scholarship deleted!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete scholarship");
    }
  };

  return (
    <div className="py-12 px-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => navigate("/admin/add")}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Add New Internship
          </button>
          <button
            onClick={() => navigate("/admin/add-course")}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add New Course
          </button>
          <button
            onClick={() => navigate("/admin/add-scholarship")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add New Scholarship
          </button>
        </div>

        {/* Manage Internships */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Manage Internships
          </h3>
          {internships.length === 0 ? (
            <p className="text-gray-500">No internships found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {internships.map((intn) => (
                <li
                  key={intn._id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold">{intn.title}</h4>
                    <p className="text-sm text-gray-500">
                      {intn.company} • {intn.location}
                    </p>
                    <p className="text-xs text-gray-400">
                      {intn.description?.slice(0, 50)}...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/edit/${intn._id}`)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteInternship(intn._id)}
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

        {/* Manage Courses */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Manage Courses
          </h3>
          {courses.length === 0 ? (
            <p className="text-gray-500">No courses found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {courses.map((course) => (
                <li
                  key={course._id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold">{course.title}</h4>
                    <p className="text-sm text-gray-500">
                      {course.provider} • {course.duration}
                    </p>
                    <p className="text-xs text-gray-400">
                      {course.description?.slice(0, 60)}...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-course/${course._id}`)
                      }
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
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

        {/* Manage Scholarships */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Manage Scholarships
          </h3>
          {scholarships.length === 0 ? (
            <p className="text-gray-500">No scholarships found.</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {scholarships.map((sch) => (
                <li
                  key={sch._id}
                  className="py-3 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-bold">{sch.title}</h4>
                    <p className="text-sm text-gray-500">
                      {sch.organization} • {sch.deadline}
                    </p>
                    <p className="text-xs text-gray-400">
                      {sch.description?.slice(0, 60)}...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/edit-scholarship/${sch._id}`)
                      }
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteScholarship(sch._id)}
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
      </div>
    </div>
  );
};

export default Admin;
