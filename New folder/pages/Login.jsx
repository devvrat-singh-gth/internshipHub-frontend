// src/pages/Login.jsx
import React from "react";

const Login = () => {
  return (
    <div className="page active">
      <div className="modal active" style={{ display: "block" }}>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Login</h2>
          </div>
          <div className="modal-body">
            <form id="loginForm">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" required />
              </div>
              <button
                type="submit"
                className="btn btn--primary btn--full-width"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
