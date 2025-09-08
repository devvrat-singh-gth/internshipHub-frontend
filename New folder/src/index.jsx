import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Tailwind CSS here

import App from "./App";
import { AuthProvider } from "./AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
