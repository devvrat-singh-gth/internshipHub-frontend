import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserCheck, Slack } from "lucide-react";

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

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await API.get("/users/me");
        setIsLoggedIn(true);
        setUserName(data.name || "User");
        setIsAdmin(data.type === "admin");
      } catch {
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
    window.addEventListener("authChange", checkLogin);
    return () => window.removeEventListener("authChange", checkLogin);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

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
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Left side: Brand (Icon + InternAdda) */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to={isLoggedIn ? "/home" : "/"}
              className="flex items-center gap-2 sm:gap-3 hover:text-teal-700 dark:hover:text-teal-300 transition"
            >
              <Slack className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-3xl font-semibold">
                InternAdda
              </span>
            </Link>
          </div>

          {/* Right side: Navigation links + controls */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-8 mr-4">
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
                  <Link
                    to="/dashboard"
                    className="nav-link hover:text-teal-500"
                  >
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

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="min-w-[34px] min-h-[30px] p-1 sm:min-w-[42px] sm:min-h-[38px] sm:p-2 rounded-md border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex justify-center items-center"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            {!isLoggedIn ? (
              <>
                <button
                  className="min-w-[60px] min-h-[30px] px-3 py-1 text-xs sm:min-w-[72px] sm:min-h-[38px] sm:px-4 sm:py-2 sm:text-sm rounded-md border border-gray-300 
                             dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
                <button
                  className="min-w-[60px] min-h-[30px] px-3 py-1 text-xs sm:min-w-[72px] sm:min-h-[38px] sm:px-4 sm:py-2 sm:text-sm rounded-md bg-teal-500 text-white 
                             hover:bg-teal-600 active:bg-teal-700 whitespace-nowrap"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div ref={dropdownRef} className="relative">
                <button
                  className="min-w-[90px] min-h-[30px] px-3 py-1 text-xs sm:min-w-[110px] sm:min-h-[38px] sm:px-4 sm:py-2 sm:text-sm rounded-md border border-gray-300 dark:border-gray-600 
                             text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 
                             transition flex items-center gap-1 sm:gap-2 whitespace-nowrap"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  aria-haspopup="true"
                  aria-expanded={showDropdown}
                >
                  <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="truncate">Hi, {userName} ▼</span>
                </button>

                {showDropdown && (
                  <div
                    className="absolute right-0 sm:right-2 mt-2 w-40 bg-white dark:bg-gray-800 
                               border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg 
                               overflow-hidden animate-fade-in z-50"
                    style={{ minWidth: "10rem" }}
                  >
                    <Link
                      to="/profile"
                      className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 
                                 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/"
                      className="w-full px-4 py-2 text-sm text-left text-red-600 dark:text-red-400 
                                 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded-md border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
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
