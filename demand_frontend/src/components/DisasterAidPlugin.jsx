import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const DisasterAidPlugin = () => {
    const navigate = useNavigate();
    const payloadOptions = [
        { label: 'Food Rations', price: 30, schedule: 'Daily' },
        { label: 'Shelter Materials', price: 40, schedule: 'Daily' },
        { label: 'Power Generators', price: 70, schedule: 'Daily' }
    ];

    const [selectedPayload, setSelectedPayload] = useState(payloadOptions[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePayloadChange = (event) => {
        const selectedOption = payloadOptions.find(option => option.label === event.target.value);
        setSelectedPayload(selectedOption);
    };

    const handleOrder = () => {
        setIsSubmitting(true);
        // Simulate a delay for any async operations like API calls
        setTimeout(() => {
            navigate(`/order?payloadType=${selectedPayload.label}`);
            setIsSubmitting(false);
        }, 500); // simulate async operation
    };

    return (
        <html data-bs-theme="light" lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
                <title>Farm Flight</title>
                <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap" />
                <link rel="stylesheet" href="assets/css/Pricing-Centered-badges.css" />
                <link rel="stylesheet" href="assets/css/Pricing-Centered-icons.css" />
            </head>
            <body>
                <nav className="navbar navbar-expand-md sticky-top py-3 navbar-dark" id="mainNav">
                    <div className="container">
                        <a className="navbar-brand d-flex align-items-center" href="/">
                            <span></span>
                        </a>
                        <Link to="/" className="navbar-brand d-flex align-items-center">
                            <img src="assets/img/WEGO LOGO.png" width="93" height="95" alt="WEGO Logo" />
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navcol-1"
                        >
                            <span className="visually-hidden">Toggle navigation</span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navcol-1">
                            <ul className="navbar-nav mx-auto">
                            <Link className="btn btn-primary shadow" to="/login">Log In</Link>
                            &nbsp;
                            <Link className="btn btn-primary shadow" to="/signup">Sign Up</Link>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section className="py-5">
                    <div className="container py-4 py-xl-5">
                        <div className="row mb-5">
                            <div className="col-md-8 col-xl-6 text-center mx-auto">
                                <h2>
                                    <span style={{ color: 'rgb(209, 210, 211)', backgroundColor: 'rgb(34, 37, 41)' }}>
                                        Farm Flight
                                    </span>
                                </h2>
                                <p className="w-lg-50">
                                    <em>
                                        FarmFlight Innovations revolutionizes agriculture for small and medium-sized, as well as sustainable and organic farms, by tackling their core challenges of resource management, crop health monitoring, and eco-friendly practices.
                                    </em>
                                </p>
                            </div>
                        </div>
                        <div className="row gy-4 gy-xl-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-xl-flex align-items-xl-center gutter-y">
                            {payloadOptions.map((option, index) => (
                                <div className="col" key={index}>
                                    <div className="card">
                                        <div className="card-body text-center p-4">
                                            <h6 className="text-uppercase text-muted card-subtitle">{option.label}</h6>
                                            <h4 className="display-4 fw-bold card-title">${option.price}</h4>
                                        </div>
                                        <div className="card-footer p-4">
                                            <div>
                                                <ul className="list-unstyled">
                                                    <li className="d-flex mb-2">
                                                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon me-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="1em"
                                                                height="1em"
                                                                fill="currentColor"
                                                                viewBox="0 0 16 16"
                                                                className="bi bi-check-lg"
                                                            >
                                                                <path
                                                                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span>Free Schedule: {option.schedule}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <button
                                                className="btn btn-primary shadow-lg"
                                                type="button"
                                                onClick={handleOrder}
                                                disabled={isSubmitting}
                                            >
                                                {isSubmitting ? 'Processing...' : 'Order Now'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <footer className="bg-dark text-light">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-3 mb-3 mb-md-0">
                                <h5>Services</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="footer-link" href="#">
                                            FarmFlight Innovations
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 mb-3 mb-md-0">
                                <h5>About</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="footer-link" href="#">
                                            About FarmFlight
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 mb-3 mb-md-0">
                                <h5>Support</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="footer-link" href="#">
                                            Help Center
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-3 mb-3 mb-md-0">
                                <h5>Contact</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <a className="footer-link" href="#">
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
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

export default DisasterAidPlugin;
