import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://team-22.seuswe.rocks/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      setIsSubmitting(false);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Signup failed");
      } else {
        setError(""); // Clear any previous error
        setUsername(""); // Clear username input
        setEmail(""); // Clear email input
        setPassword(""); // Clear password input
        setConfirmPassword(""); // Clear confirm password input
        navigate("/login"); // Redirect to login after successful signup
      }
    } catch (error) {
      setIsSubmitting(false);
      setError("An error occurred during signup");
    }
  };

  return (
    <>
      <html data-bs-theme="light" lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
        <title>Home - Brand</title>
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap" />
        <link rel="stylesheet" href="assets/css/Pricing-Centered-badges.css" />
        <link rel="stylesheet" href="assets/css/Pricing-Centered-icons.css" />
      </head>
      <body>
        <nav className="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
          <div className="container">
            <a className="navbar-brand d-flex align-items-center" href="/"><span></span></a>
            <Link to="/" className="navbar-brand d-flex align-items-center">
              <img src="assets/img/WEGO LOGO.png" width="93" height="95" alt="WEGO Logo" />
            </Link>
            <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1">
              <span className="visually-hidden">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav mx-auto">
                {/* Nav links here */}
              </ul>
              <Link className="btn btn-primary shadow" to="/login">Log In</Link>
              &nbsp;
              <Link className="btn btn-primary shadow" to="/signup">Sign Up</Link>
              <ul className="navbar-nav">
                {/* More nav links here */}
              </ul>
            </div>
          </div>
        </nav>
        <section className="py-5">
          <div className="container py-5">
            <div className="row mb-4 mb-lg-5">
              <div className="col-md-8 col-xl-6 text-center mx-auto">
                <p className="fw-bold text-success mb-2">Sign up</p>
                <h2 className="fw-bold">Welcome</h2>
              </div>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 col-xl-4">
                <div className="card">
                  <div className="card-body text-center d-flex flex-column align-items-center">
                    <div className="bs-icon-xl bs-icon-circle bs-icon-primary shadow bs-icon my-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"></path>
                      </svg>
                    </div>
                    <form onSubmit={handleSignup}>
                      <div className="mb-3">
                        <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                      </div>
                      <div className="mb-3">
                        <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                      </div>
                      <div className="mb-3">
                        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                      </div>
                      <div className="mb-3">
                        <input className="form-control" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                      </div>
                      <button className="btn btn-primary shadow d-block w-100" type="submit">Sign up</button>
                    </form>
                    <p className="text-muted">Already have an account? <a href="/login">Log in</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-dark">
          <div className="container py-4 py-lg-5">
            <div className="row justify-content-center">
              <div className="col-lg-4 text-center">
                <h5 className="mb-4">Footer Content</h5>
                <p className="text-muted">This is the footer content. You can add any additional information or links here.</p>
              </div>
              <div className="col-lg-4 text-center">
                <h5 className="mb-4">Contact Us</h5>
                <p className="text-muted">Email: example@example.com</p>
                <p className="text-muted">Phone: 123-456-7890</p>
              </div>
            </div>
          </div>
        </footer>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.6.0/chart.min.js"></script>
      </body>
      </html>
    </>
  );
}

export default Signup;
