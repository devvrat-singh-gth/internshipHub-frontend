// src/pages/Recommendations.jsx
import React, { useEffect, useState } from "react";
import InternshipCard from "../components/InternshipCard";
import CourseCard from "../components/CourseCard";
import ScholarshipCard from "../components/ScholarshipCard";
import API from "../utils/api";

const Recommendations = () => {
  const [type, setType] = useState("internships"); // default: internships
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dynamically
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = "";
        if (type === "internships") {
          endpoint =
            "https://internshiphub-backend.onrender.com/api/internships/public";
        } else if (type === "courses") {
          endpoint =
            "https://internshiphub-backend.onrender.com/api/courses/public";
        } else if (type === "scholarships") {
          endpoint =
            "https://internshiphub-backend.onrender.com/api/scholarships/public";
        }

        const { data } = await API.get(endpoint);
        setData(data);
      } catch (err) {
        console.error(`Failed to load ${type}:`, err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Recommended for You
        </h1>

        {/* Dropdown Selector */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 
                     dark:border-gray-700 dark:bg-gray-800 dark:text-white
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="internships">Internships</option>
          <option value="courses">Courses</option>
          <option value="scholarships">Scholarships</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No {type} available yet. Please check back later!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {type === "internships" &&
            data.map((item) => (
              <InternshipCard key={item._id} internship={item} />
            ))}
          {type === "courses" &&
            data.map((item) => <CourseCard key={item._id} course={item} />)}
          {type === "scholarships" &&
            data.map((item) => (
              <ScholarshipCard key={item._id} scholarship={item} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
