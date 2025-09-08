// src/pages/Internships.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InternshipCard from "../components/InternshipCard";
import API from "../utils/api";

const TYPES = ["Remote", "On-site", "Hybrid", "Part-time", "Full-time"];
const COMPANY_TYPES = ["Private", "Government", "Startup", "NGO"];
const ROLES = [
  "Software Engineering",
  "Product Management",
  "Design",
  "Marketing",
  "PM Internship",
];
const STIPENDS = ["Unpaid", "0–5k", "5k–10k", "10k+"];

const Internships = () => {
  const [internships, setInternships] = useState([]);

  // ✅ Fetch internships
  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await API.get(
          "https://internshiphub-backend.onrender.com/internships",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setInternships(data);
      } catch (err) {
        console.error("Error fetching internships:", err);
      }
    };
    fetchInternships();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Search Internships
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with Filters */}
          <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button className="text-sm text-blue-600 hover:underline">
                Clear All
              </button>
            </div>

            {/* Filter Groups */}
            {[
              { title: "Type", options: TYPES },
              { title: "Company Type", options: COMPANY_TYPES },
              { title: "Role", options: ROLES },
              { title: "Stipend", options: STIPENDS },
            ].map(({ title, options }) => (
              <div className="mb-6" key={title}>
                <h4 className="font-medium mb-2">{title}</h4>
                <div className="space-y-2">
                  {options.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox text-blue-600 rounded"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Duration */}
            <div>
              <h4 className="font-medium mb-2">Duration</h4>
              <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2">
                <option value="">Any Duration</option>
                <option value="1-3 months">1–3 months</option>
                <option value="3-6 months">3–6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search Bar */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 mb-6"
            >
              <input
                type="text"
                placeholder="Search internships..."
                className="flex-grow px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
              >
                Search
              </button>
            </form>

            {/* Internship Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {internships.map((internship) => (
                <Link
                  key={internship._id}
                  to={`/internships/${internship._id}`} // ✅ Clickable card links to detail page
                  className="h-full"
                >
                  <InternshipCard internship={internship} />
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Internships;
