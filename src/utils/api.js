import axios from "axios";

const API = axios.create({
  baseURL: "https://internshiphub-backend.onrender.com/api",
});

// Attach token automatically if logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
