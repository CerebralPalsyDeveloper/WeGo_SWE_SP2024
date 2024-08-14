/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function FleetManagerLogin({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in both username and password");
      return;
    }

    try {
      const response = await fetch(
        "https://team-22.supply.seuswe.rocks/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          setError(errorData.error || "Login failed");
        } else {
          const errorText = await response.text();
          setError("An error occurred during login");
        }
      } else {
        const { token } = await response.json();
        localStorage.setItem("jwtToken", token); // Store the JWT token in local storage
        localStorage.setItem("isLoggedIn", "true"); // Store the login state in local storage
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <div>
      <h2>Fleet Manager Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Password:
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"} Password
        </button>
      </label>
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

FleetManagerLogin.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default FleetManagerLogin;