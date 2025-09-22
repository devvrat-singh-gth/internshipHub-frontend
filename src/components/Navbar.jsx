// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slack } from "lucide-react";
import API from "../utils/api";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Check login
  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await API.get("/users/me");
        setIsLoggedIn(true);
        setUserName(data.name || "User");
        setIsAdmin(data.type === "admin");
        setProfilePic(
          data.profilePic ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              data.name || "User"
            )}`
        );
      } catch (err) {
        console.error("Error during checkLogin:", err);
        setIsLoggedIn(false);
        setUserName("");
        setIsAdmin(false);
        setProfilePic("");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setIsAdmin(false);
      setProfilePic("");
    }
  };

  useEffect(() => {
    checkLogin();
    window.addEventListener("authChange", checkLogin);
    return () => window.removeEventListener("authChange", checkLogin);
  }, []);

  // Handle dropdown close on outside click
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

  // Dark mode toggle
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-0 md:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 pl-2 md:pl-0">
            <Link
              to={isLoggedIn ? "/home" : "/"}
              className="flex items-center gap-2 sm:gap-3 text-teal-500 hover:text-teal-700 dark:hover:text-teal-300 transition"
            >
              <Slack className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-3xl font-semibold">
                InternAdda
              </span>
            </Link>
          </div>

          {/* Main Nav (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center gap-8 mr-4">
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

          {/* Desktop: Dark Mode + Profile */}
          <div className="hidden md:flex items-center gap-1 sm:gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="min-w-[34px] p-1 sm:min-w-[42px] sm:p-2 rounded-md border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  className="min-w-[60px] px-3 py-1 text-xs sm:min-w-[72px] sm:px-4 sm:py-2 sm:text-sm rounded-md border 
                             border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 
                             dark:hover:bg-gray-700 transition"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="min-w-[60px] px-3 py-1 text-xs sm:min-w-[72px] sm:px-4 sm:py-2 sm:text-sm rounded-md bg-teal-500 text-white 
                             hover:bg-teal-600 active:bg-teal-700 whitespace-nowrap"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                  className="px-3 py-1 sm:px-4 sm:py-2 rounded-md border border-gray-300 dark:border-gray-600 
                             text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                             flex items-center gap-2 text-sm sm:text-base"
                >
                  <img
                    src={profilePic}
                    alt="avatar"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>Hi, {userName} ▼</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDropdown(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Profile
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden pr-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-center items-center"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
              className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-center items-center"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
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
                <div className="px-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(false);
                      setIsMobileMenuOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
