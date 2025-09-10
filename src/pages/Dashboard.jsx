// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("savedInternships");
  const [savedInternships, setSavedInternships] = useState([]);
  const [savedCourses, setSavedCourses] = useState([]);
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const [profile, setProfile] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user profile + recommendations
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await API.get(
          "https://internshiphub-backend.onrender.com/api/users/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setProfile(data);
        setSavedInternships(data.savedInternships || []);
        setSavedCourses(data.savedCourses || []);
        setSavedScholarships(data.savedScholarships || []);
        setAppliedInternships(
          data.applications?.map((a) => a.internship) || []
        );

        const rec = await API.get(
          "https://internshiphub-backend.onrender.com/api/internships/recommendations",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setRecommendations(rec.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    window.addEventListener("authChange", fetchData);
    return () => window.removeEventListener("authChange", fetchData);
  }, []);

  const TabCard = ({ children }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {children}
    </div>
  );

  const renderTab = () => {
    if (loading) {
      return (
        <TabCard>
          <p className="text-gray-500">Loading your data...</p>
        </TabCard>
      );
    }

    switch (activeTab) {
      case "savedInternships":
        return (
          <TabCard>
            <h2 className="text-xl font-semibold mb-4">Saved Internships</h2>
            {savedInternships.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                You haven’t saved any internships yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {savedInternships.map((internship) => (
                  <li
                    key={internship._id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <h3 className="font-semibold">{internship.title}</h3>
                    <p className="text-sm text-gray-500">
                      {internship.company} • {internship.location}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </TabCard>
        );

      case "savedCourses":
        return (
          <TabCard>
            <h2 className="text-xl font-semibold mb-4">Saved Courses</h2>
            {savedCourses.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                You haven’t saved any courses yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {savedCourses.map((course) => (
                  <li
                    key={course._id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.provider}</p>
                  </li>
                ))}
              </ul>
            )}
          </TabCard>
        );

      case "savedScholarships":
        return (
          <TabCard>
            <h2 className="text-xl font-semibold mb-4">Saved Scholarships</h2>
            {savedScholarships.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                You haven’t saved any scholarships yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {savedScholarships.map((scholarship) => (
                  <li
                    key={scholarship._id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <h3 className="font-semibold">{scholarship.title}</h3>
                    <p className="text-sm text-gray-500">
                      {scholarship.organization} • Deadline:{" "}
                      {scholarship.deadline}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </TabCard>
        );

      case "applied":
        return (
          <TabCard>
            <h2 className="text-xl font-semibold mb-4">Applied Internships</h2>
            {appliedInternships.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                You haven’t applied to any internships yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {appliedInternships.map((internship) => (
                  <li
                    key={internship._id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <h3 className="font-semibold">{internship.title}</h3>
                    <p className="text-sm text-gray-500">
                      {internship.company} • {internship.location}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </TabCard>
        );

      case "profile":
        return (
          <TabCard>
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Name: {profile.name}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Email: {profile.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Type: {profile.type}
            </p>
          </TabCard>
        );

      case "recommendations":
        return (
          <TabCard>
            <h2 className="text-xl font-semibold mb-4">
              Recommended Internships
            </h2>
            {recommendations.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No recommendations available yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {recommendations.map((internship) => (
                  <li
                    key={internship._id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
                  >
                    <h3 className="font-semibold">{internship.title}</h3>
                    <p className="text-sm text-gray-500">
                      {internship.company} • {internship.location}
                    </p>
                    <p className="text-xs text-gray-400">
                      Stipend: {internship.stipend}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </TabCard>
        );

      default:
        return (
          <TabCard>
            <p>Select a tab from the sidebar.</p>
          </TabCard>
        );
    }
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
          Your Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <nav className="flex flex-col gap-3">
              {[
                { key: "savedInternships", label: "Saved Internships" },
                { key: "savedCourses", label: "Saved Courses" },
                { key: "savedScholarships", label: "Saved Scholarships" },
                { key: "applied", label: "Applied Internships" },
                { key: "profile", label: "Profile" },
                { key: "recommendations", label: "Recommendations" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-4 py-2 rounded-md text-left text-sm font-medium transition ${
                    activeTab === key
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">{renderTab()}</main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
