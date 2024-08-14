import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const PollutionSolutionPlugin = () => {
    const navigate = useNavigate();
    const wasteOptions = [
        { label: 'Recyclables', price: 10, schedule: 'Weekly' },
        { label: 'Organic Waste', price: 15, schedule: 'Bi-weekly' },
        { label: 'General Waste', price: 20, schedule: 'Monthly' }
    ];

    const [selectedWaste, setSelectedWaste] = useState(wasteOptions[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleWasteChange = (event) => {
        const selectedOption = wasteOptions.find(option => option.label === event.target.value);
        setSelectedWaste(selectedOption);
    };

    const handleOrder = () => {
        setIsSubmitting(true);
        // Simulate a delay for any async operations like API calls
        setTimeout(() => {
            navigate(`/order?payloadType=${selectedWaste.label}`);
            setIsSubmitting(false);
        }, 500); // simulate async operation
    };

    return (
        <html data-bs-theme="light" lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>Product - Brand</title>
                <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap" />
                <link rel="stylesheet" href="assets/css/Pricing-Centered-badges.css" />
                <link rel="stylesheet" href="assets/css/Pricing-Centered-icons.css" />
            </head>
            <body>
                <nav class="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
                    <div class="container">
                        <a class="navbar-brand d-flex align-items-center" href="/"><span></span></a>
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
                    <div class="container py-4 py-xl-5">
                        <div class="row mb-5">
                            <div class="col-md-8 col-xl-6 text-center mx-auto">
                                <h2><strong><span style={{ color: 'rgb(209, 210, 211)', backgroundColor: 'rgb(34, 37, 41)' }}>Pollution Solution</span></strong></h2>
                                <p class="w-lg-50"><em><span style={{ color: 'rgb(238, 243, 247)', backgroundColor: 'transparent' }}>One of the biggest issues to date is pollution. Trash runs the world, and it all begins when an individual drops plastic, cans, etc. Partnering with GoGo, we plan to develop an autonomous vehicle that personally comes to your door and picks up your trash.</span></em></p>
                            </div>
                        </div>
                        <div class="row gy-4 gy-xl-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-xl-flex align-items-xl-center gutter-y">
                            <div class="col">
                                <div class="card">
                                    <div class="card-body text-center p-4">
                                        <h6 class="text-uppercase text-muted card-subtitle">Standard</h6>
                                        <h4 class="display-4 fw-bold card-title">$15</h4>
                                    </div>
                                    <div class="card-footer p-4">
                                        <div>
                                            <ul class="list-unstyled">
                                                <li class="d-flex mb-2">
                                                    <span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-check-lg">
                                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"></path>
                                                        </svg>
                                                    </span>
                                                    <span>any trash any time and any where.</span>
                                                </li>
                                                <li class="d-flex mb-2">
                                                    <span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-check-lg">
                                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"></path>
                                                        </svg>
                                                    </span>
                                                    <span>allow our robot to collect 99.99% of trash within a pad.</span>
                                                </li>
                                                <li class="d-flex mb-2">
                                                    <span class="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-check-lg">
                                                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"></path>
                                                        </svg>
                                                    </span>
                                                    <span>Anytime service, Whenever you need it..</span>
                                                </li>
                                            </ul>
                                            <select class="form-select form-select-lg mb-4" onChange={handleWasteChange}>
                                                {wasteOptions.map(option => (
                                                    <option key={option.label} value={option.label}>{option.label}</option>
                                                ))}
                                            </select>
                                            <button class="btn btn-lg btn-primary w-100" type="button" onClick={handleOrder} disabled={isSubmitting}>
                                                {isSubmitting ? 'Submitting...' : 'Order Now'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    {/* Card content */}
                                </div>
                            </div>
                            <div class="col">
                                <div class="card">
                                    {/* Card content */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer class="bg-dark">
                    <div class="container">
                        <div class="row py-4 py-xl-5">
                            <div class="col-md-6 col-lg-3 mb-4 mb-md-0">
                                {/* Footer content */}
                            </div>
                            <div class="col-md-6 col-lg-3 mb-4 mb-md-0">
                                {/* Footer content */}
                            </div>
                            <div class="col-md-6 col-lg-3 mb-4 mb-md-0">
                                {/* Footer content */}
                            </div>
                            <div class="col-md-6 col-lg-3 mb-4 mb-md-0">
                                {/* Footer content */}
                            </div>
                        </div>
                    </div>
                </footer>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>
                <script src="assets/js/bold-and-dark.js"></script>
            </body>
        </html>
    );
};

export default PollutionSolutionPlugin;
