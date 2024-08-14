import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


function Login({ setIsLoggedIn }) {
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
      const response = await fetch('https://team-22.seuswe.rocks/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

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
        localStorage.setItem('jwtToken', token);  // Store the JWT token in local storage
        localStorage.setItem('isLoggedIn', 'true');  // Store the login state in local storage
        setIsLoggedIn(true);
        navigate('/');
      }
    } catch (error) {
      setError("An error occurred during login");
    }
  };

  return (
    <>
      <html data-bs-theme="light" lang="en">

      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>Log in - Brand</title>
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap" />
        <link rel="stylesheet" href="assets/css/Pricing-Centered-badges.css" />
        <link rel="stylesheet" href="assets/css/Pricing-Centered-icons.css" />
      </head>

      <body>
        <nav class="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
          <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="/">
              <span></span>
            </a>
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img src="assets/img/WEGO LOGO.png" width="93" height="95" alt="WEGO Logo" />
            </Link>
            <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
              <span class="visually-hidden">Toggle navigation</span>
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navcol-1">
              <ul class="navbar-nav mx-auto"></ul>
              <Link className="btn btn-primary shadow" to="/login">Log In</Link>
              &nbsp;
              <Link className="btn btn-primary shadow" to="/signup">Sign Up</Link>
              <ul class="navbar-nav">
                <li class="nav-item"></li>
                <li class="nav-item"></li>
                <li class="nav-item"></li>
              </ul>
            </div>
          </div>
        </nav>
        <section class="py-5">
          <div class="container py-5">
            <div class="row mb-4 mb-lg-5">
              <div class="col-md-8 col-xl-6 text-center mx-auto">
                <p class="fw-bold text-success mb-2">Login</p>
                <h2 class="fw-bold">Welcome back</h2>
              </div>
            </div>
            <div class="row d-flex justify-content-center">
              <div class="col-md-6 col-xl-4">
                <div class="card">
                  <div class="card-body text-center d-flex flex-column align-items-center">
                    <div class="bs-icon-xl bs-icon-circle bs-icon-primary shadow bs-icon my-4"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                      </svg></div>
                    <form class="text-start">
                      <div class="mb-4 position-relative">
                        <input class="form-control ps-5" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div class="mb-4 position-relative">
                        <input class="form-control ps-5" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div class="form-check form-switch mb-4">
                        <input class="form-check-input" type="checkbox" id="form-switch" onChange={togglePasswordVisibility} />
                        <label class="form-check-label" htmlFor="form-switch">Show Password</label>
                      </div>
                      <div class="mb-4 text-danger">{error}</div>
                      <button class="btn btn-primary btn-lg w-100" type="button" onClick={handleLogin}>Log In</button>
                    </form>
                    <p class="text-muted mt-3">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js"></script>
      </body>
      </html>
    </>
  );
}

Login.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;