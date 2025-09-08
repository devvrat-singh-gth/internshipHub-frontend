// components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can replace with your auth logic
  const [isAdmin, setIsAdmin] = useState(false); // Replace with real role check
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    // Example: redirect to login page
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    // Add logout logic here, then:
    setIsLoggedIn(false);
    setIsAdmin(false);
    setShowDropdown(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="header">
      <nav className="container">
        <div className="nav-container">
          <div className="nav-brand">
            <h1>
              <Link to="/" className="nav-link">
                InternshipHub
              </Link>
            </h1>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/internships" className="nav-link">
              Search
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </div>
          <div className="nav-actions">
            {!isLoggedIn ? (
              <>
                <button
                  className="btn btn--outline btn--sm"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="btn btn--primary btn--sm"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn--outline btn--sm"
                  onClick={toggleDropdown}
                >
                  User Menu ▼
                </button>
                {showDropdown && (
                  <div className="user-dropdown">
                    <button
                      className="btn btn--outline btn--sm"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </button>
                    {isAdmin && (
                      <button
                        className="btn btn--outline btn--sm"
                        onClick={() => navigate("/admin")}
                      >
                        Admin
                      </button>
                    )}
                    <button
                      className="btn btn--outline btn--sm"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
