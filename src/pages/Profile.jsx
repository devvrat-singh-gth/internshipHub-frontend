import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

const SECTORS = [
  "IT",
  "Finance",
  "Marketing",
  "Education",
  "Government",
  "Social Work",
];
const SKILLS = [
  "React",
  "Python",
  "Data Analysis",
  "Communication",
  "Leadership",
];

const Profile = () => {
  const [profile, setProfile] = useState({
    education: "",
    skills: [],
    sector: "",
    location: "",
  });

  // Load profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get(
          "https://internshiphub-backend.onrender.com/api/users/me"
        );
        setProfile({
          education: data.education || "",
          skills: data.skills || [],
          sector: data.sector || "",
          location: data.location || "",
        });
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (skill) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(
        "https://internshiphub-backend.onrender.com/api/users/me",
        profile
      );
      alert("✅ Profile updated! Recommendations will improve.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Education */}
        <div>
          <label className="block mb-2 font-medium">Education</label>
          <select
            name="education"
            value={profile.education}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-900"
          >
            <option value="">Select</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="School">School</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <label className="block mb-2 font-medium">Skills</label>
          <div className="flex flex-wrap gap-4">
            {SKILLS.map((skill) => (
              <label key={skill} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={profile.skills.includes(skill)}
                  onChange={() => handleCheckbox(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sector */}
        <div>
          <label className="block mb-2 font-medium">Preferred Sector</label>
          <select
            name="sector"
            value={profile.sector}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-900"
          >
            <option value="">Select</option>
            {SECTORS.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block mb-2 font-medium">Preferred Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            placeholder="Enter city/state"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-900"
          />
        </div>

        <Link
          to="/home"
          type="submit"
          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Save Profile
        </Link>
      </form>
    </div>
  );
};

export default Profile;
