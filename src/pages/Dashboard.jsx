// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import API from "../utils/api";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [savedInternships, setSavedInternships] = useState([]);
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

        // Fetch profile with saved & applied
        const { data } = await API.get(
          "https://internshiphub-backend.onrender.com/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(data);
        setSavedInternships(data.savedInternships || []);
        setAppliedInternships(
          data.applications?.map((a) => a.internship) || []
        );

        // Fetch recommendations
        const rec = await API.get(
          "https://internshiphub-backend.onrender.com/internships/recommendations",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecommendations(rec.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // 🔔 Refresh dashboard when something changes (apply/save)
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
      case "saved":
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
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  value={profile.name || ""}
                  readOnly
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={profile.email || ""}
                  readOnly
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-900"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Type</label>
                <input
                  type="text"
                  value={profile.type || "user"}
                  readOnly
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-gray-100 dark:bg-gray-900"
                />
              </div>
            </form>
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

      case "settings":
        return (
          <TabCard>
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">
                  Change Password
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Notifications</label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="emailNotif" />
                  <label htmlFor="emailNotif">Email Alerts</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="smsNotif" />
                  <label htmlFor="smsNotif">SMS Alerts</label>
                </div>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
              >
                Save Settings
              </button>
            </form>
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
                { key: "saved", label: "Saved Internships" },
                { key: "applied", label: "Applied Internships" },
                { key: "alerts", label: "Job Alerts" },
                { key: "profile", label: "Profile" },
                { key: "recommendations", label: "Recommendations" },
                { key: "settings", label: "Settings" },
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
