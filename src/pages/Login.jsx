import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ use toast instead of alert

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(
        "https://internshiphub-backend.onrender.com/api/auth/login",
        { email, password }
      );

      // ✅ Only proceed if backend returned a token
      if (!data?.token) {
        toast.error("Login failed: No token received");
        return;
      }

      // ✅ Save token & trigger navbar update
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("authChange"));

      toast.success("Login successful!");
      navigate("/home"); // ✅ redirect only if login succeeded
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:border-gray-700"
              required
            />
            <p
              onClick={() => navigate("/forgot-password")}
              className="mt-3 text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
