// src/pages/Dashboard.jsx
import React, { useState } from "react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("saved");

  const renderTab = () => {
    switch (activeTab) {
      case "saved":
        return (
          <div id="savedTab" className="dashboard-tab active">
            <h2 className="text-xl font-semibold mb-4">Saved Searches</h2>
            <div id="savedSearches">
              <div className="text-gray-600 p-6 bg-white rounded shadow">
                No saved searches yet. Start searching and save your favorite
                queries!
              </div>
            </div>
          </div>
        );

      case "applied":
        return (
          <div id="appliedTab" className="dashboard-tab active">
            <h2 className="text-xl font-semibold mb-4">Applied Internships</h2>
            <div id="appliedInternships">
              <div className="text-gray-600 p-6 bg-white rounded shadow">
                You haven't applied to any internships yet.
              </div>
            </div>
          </div>
        );

      case "alerts":
        return (
          <div id="alertsTab" className="dashboard-tab active">
            <h2 className="text-xl font-semibold mb-4">Job Alerts</h2>
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-medium mb-4">Create Job Alert</h3>
              <form id="alertForm" className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Keywords</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="e.g. Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Location</label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2">
                    <option>Any Location</option>
                    <option>Mumbai</option>
                    <option>Delhi</option>
                    <option>Bangalore</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Create Alert
                </button>
              </form>
            </div>
          </div>
        );

      case "profile":
        return (
          <div id="profileTab" className="dashboard-tab active">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <div className="bg-white p-6 rounded shadow">
              <form id="profileForm" className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    defaultValue="john@example.com"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Phone</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    defaultValue="+91 9876543210"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div id="dashboardPage" className="page py-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Your Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="dashboard-sidebar w-full md:w-1/4 bg-white p-6 rounded shadow">
            <nav className="dashboard-nav flex flex-col space-y-3">
              {["saved", "applied", "alerts", "profile"].map((tab) => (
                <a
                  key={tab}
                  href="#"
                  className={`block px-4 py-2 rounded text-sm font-medium ${
                    activeTab === tab
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab);
                  }}
                >
                  {tab === "saved" && "Saved Searches"}
                  {tab === "applied" && "Applied Internships"}
                  {tab === "alerts" && "Job Alerts"}
                  {tab === "profile" && "Profile"}
                </a>
              ))}
            </nav>
          </div>
          <div className="dashboard-content flex-1">{renderTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
