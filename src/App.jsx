// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "../src/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Internships from "./pages/Internships";
import InternshipDetail from "./pages/InternshipDetail";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Recommendations from "./pages/Recommendations";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail"; // ✅ NEW
import Scholarships from "./pages/Scholarships";
import ScholarshipDetail from "./pages/ScholarshipDetail"; // ✅ NEW
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Admin Add/Edit Forms
import AddInternshipForm from "./pages/AddInternshipForm";
import EditInternshipForm from "./pages/EditInternshipForm";
import AddCourseForm from "./pages/AddCourse";
import EditCourses from "./pages/EditCourses";
import AddScholarshipForm from "./pages/AddScholarship";
import EditScholarships from "./pages/EditScholarships";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token");
  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Landing or Home Route */}
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/home" replace /> : <Landing />}
          />
          {/* Public Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          {/* Internships */}
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:id" element={<InternshipDetail />} />
          {/* Courses */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} /> {/* ✅ */}
          {/* Scholarships */}
          <Route path="/scholarships" element={<Scholarships />} />
          <Route
            path="/scholarships/:id"
            element={<ScholarshipDetail />}
          />{" "}
          {/* ✅ */}
          {/* 🔐 Protected Routes */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <PrivateRoute>
                <Recommendations />
              </PrivateRoute>
            }
          />
          {/* 🔐 Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <PrivateRoute>
                <AddInternshipForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <PrivateRoute>
                <EditInternshipForm />
              </PrivateRoute>
            }
          />
          {/* Course Admin Routes */}
          <Route
            path="/admin/add-course"
            element={
              <PrivateRoute>
                <AddCourseForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/edit-course/:id"
            element={
              <PrivateRoute>
                <EditCourses />
              </PrivateRoute>
            }
          />
          {/* Scholarship Admin Routes */}
          <Route
            path="/admin/add-scholarship"
            element={
              <PrivateRoute>
                <AddScholarshipForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/edit-scholarship/:id"
            element={
              <PrivateRoute>
                <EditScholarships />
              </PrivateRoute>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
