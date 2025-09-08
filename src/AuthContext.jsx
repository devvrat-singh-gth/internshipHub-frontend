import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const userType = email.includes("admin") ? "admin" : "student";
    const user = {
      id: Date.now().toString(),
      email,
      name: email.split("@")[0],
      type: userType,
    };
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user)); // Save to localStorage
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser"); // Remove from localStorage
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
