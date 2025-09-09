import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCheck } from "lucide-react";

import API from "../utils/api";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // 🔑 Check if user is logged in
  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await API.get("/users/me");
        setIsLoggedIn(true);
        setUserName(data.name || "User");
        setIsAdmin(data.type === "admin");
      } catch (err) {
        console.error("❌ Failed to fetch user:", err);
        setIsLoggedIn(false);
        setUserName("");
        setIsAdmin(false);
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    checkLogin();

    // 🔔 Listen for login/logout
    window.addEventListener("authChange", checkLogin);
    return () => window.removeEventListener("authChange", checkLogin);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  // ✅ Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange")); // 🔔 Trigger update
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <h1 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
            <Link
              to={isLoggedIn ? "/home" : "/"}
              className="hover:text-teal-700 dark:hover:text-teal-300 transition"
            >
              InternshipHub
            </Link>
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="nav-link hover:text-teal-500">
              Home
            </Link>
            <Link to="/internships" className="nav-link hover:text-teal-500">
              Search
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/about" className="nav-link hover:text-teal-500">
                  About
                </Link>
                <Link to="/contact" className="nav-link hover:text-teal-500">
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/recommendations"
                  className="nav-link hover:text-teal-500"
                >
                  Recommendations
                </Link>
                <Link to="/dashboard" className="nav-link hover:text-teal-500">
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="nav-link hover:text-teal-500">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3 relative">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            {/* Auth Buttons or Dropdown */}
            {!isLoggedIn ? (
              <>
                <button
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 
                             dark:border-gray-600 text-gray-700 dark:text-gray-200 
                             hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-md bg-teal-500 text-white 
                             hover:bg-teal-600 active:bg-teal-700"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div ref={dropdownRef} className="relative">
                <button
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 
             text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
             transition flex items-center gap-2"
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Hi, {userName} ▼</span>
                </button>

                {showDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 
                                border border-gray-200 dark:border-gray-700 rounded-lg 
                                shadow-lg overflow-hidden animate-fade-in"
                  >
                    <Link
                      to="/profile"
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                                 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button
                      className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 
                                 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger (Mobile Only) */}
            <button
              className="md:hidden p-2 rounded-md border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4 animate-slide-down">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link hover:text-teal-500"
            >
              Home
            </Link>
            <Link
              to="/internships"
              onClick={() => setIsMobileMenuOpen(false)}
              className="nav-link hover:text-teal-500"
            >
              Search
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-link hover:text-teal-500"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-link hover:text-teal-500"
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/recommendations"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-link hover:text-teal-500"
                >
                  Recommendations
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="nav-link hover:text-teal-500"
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="nav-link hover:text-teal-500"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
