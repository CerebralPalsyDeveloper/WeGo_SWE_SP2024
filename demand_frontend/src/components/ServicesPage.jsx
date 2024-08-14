import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


function ServicesPage() {
    return (
        <html data-bs-theme="light" lang="en">
            <head>
                <meta charset="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
                />
                <title>Services - Brand</title>
                <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Inter:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800&amp;display=swap"
                />
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
                            <ul className="navbar-nav mx-auto"></ul>
                            <Link className="btn btn-primary shadow" to="/login">Log In</Link>
                            &nbsp;
                            <Link className="btn btn-primary shadow" to="/signup">Sign Up</Link>
                            <ul className="navbar-nav">
                                <li className="nav-item"></li>
                                <li className="nav-item"></li>
                                <li className="nav-item"></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <section className="py-5">
                    <div className="container py-5">
                        <div className="row mb-4 mb-lg-5">
                            <div className="col-md-8 col-xl-6 text-center mx-auto">
                                <p className="fw-bold text-success mb-2">Our Services</p>
                                <h3 className="fw-bold">What we can do for you</h3>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 mx-auto" style={{ maxWidth: '900px' }}>
                            <div className="col mb-5">
                                <img className="rounded img-fluid shadow" src="assets/img/products/1.jpg" />
                            </div>
                            <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
                                <div>
                                    <h5 className="fw-bold">
                                        <strong>
                                            <span style={{ color: 'rgb(209, 210, 211)', backgroundColor: 'rgb(34, 37, 41)' }}>
                                                Pollution Solution
                                            </span>
                                        </strong>
                                    </h5>
                                    <p className="text-muted mb-4">
                                        <em>
                                            <span style={{ color: 'rgb(255, 255, 255)' }}>
                                                Pollution Solution is to a waste disposal service that can be used 24/7 at the customers convenience.
                                            </span>
                                        </em>
                                    </p>
                                    <Link className="btn btn-primary shadow" to="/pollutionsolution">
                                        Order Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 mx-auto" style={{ maxWidth: '900px' }}>
                            <div className="col order-md-last mb-5">
                                <img className="rounded img-fluid shadow" src="assets/img/products/2.jpg" />
                            </div>
                            <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
                                <div>
                                    <h5 className="fw-bold">
                                        <span style={{ color: 'rgb(209, 210, 211)', backgroundColor: 'rgb(34, 37, 41)' }}>
                                            Farm Flight
                                        </span>
                                    </h5>
                                    <p className="text-muted mb-4">
                                        <em>
                                            <span style={{ color: 'rgb(255, 255, 255)' }}>
                                                FarmFlight Innovations revolutionizes agriculture for small and medium-sized, as well as sustainable and organic farms, by tackling their core challenges of resource management, crop health monitoring, and eco-friendly practices.
                                            </span>
                                        </em>
                                    </p>
                                    <Link className="btn btn-primary shadow" to="/farmflight">
                                        Order Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-2 mx-auto" style={{ maxWidth: '900px' }}>
                            <div className="col mb-5">
                                <img className="rounded img-fluid shadow" src="assets/img/products/3.jpg" />
                            </div>
                            <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
                                <div>
                                    <h5 className="fw-bold">
                                        <span style={{ color: 'rgb(209, 210, 211)', backgroundColor: 'rgb(34, 37, 41)' }}>
                                            Disaster Aid
                                        </span>
                                    </h5>
                                    <p className="text-muted mb-4">
                                        <em>
                                            <span style={{ color: 'rgb(236, 240, 242)', backgroundColor: 'transparent' }}>
                                                Disaster Aid is a sophisticated solutions that with pinpoint accuracy it delivers critical aid anytime, anywhere to those who need it the most, seeking to wholly minimize the devastating impacts of disasters.
                                            </span>
                                        </em>
                                    </p>
                                    <Link className="btn btn-primary shadow" to="/disasteraid">
                                        Order Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="bg-dark">
                    <div className="container py-4 py-lg-5">
                        <div className="row justify-content-center">
                            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                                <h3 className="fs-6 fw-bold">Services</h3>
                                <ul className="list-unstyled">
                                    <li><a href="#">Web design</a></li>
                                    <li><a href="#">Development</a></li>
                                    <li><a href="#">Hosting</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                                <h3 className="fs-6 fw-bold">About</h3>
                                <ul className="list-unstyled">
                                    <li><a href="#">Company</a></li>
                                    <li><a href="#">Team</a></li>
                                    <li><a href="#">Legacy</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                                <h3 className="fs-6 fw-bold">Careers</h3>
                                <ul className="list-unstyled">
                                    <li><a href="#">Job openings</a></li>
                                    <li><a href="#">Employee success</a></li>
                                    <li><a href="#">Benefits</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last">
                                <div className="fw-bold d-flex align-items-center mb-2">
                                    <span className="bs-icon-sm bs-icon-circle bs-icon-primary d-flex justify-content-center align-items-center bs-icon me-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                                            <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"></path>
                                            <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                                        </svg>
                                    </span>
                                    <span>WEGO</span>
                                </div>
                                <p className="text-muted">
                                    Sem eleifend donec molestie, integer quisque orci aliquam.
                                </p>
                            </div>
                        </div>
                        <hr />
                        <div className="text-muted d-flex justify-content-between align-items-center pt-3">
                            <p className="mb-0">Copyright © 2024 Brand</p>
                            <ul className="list-inline mb-0">
                                <li className="list-inline-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="bi bi-facebook"
                                    >
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"></path>
                                    </svg>
                                </li>
                                <li className="list-inline-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="bi bi-twitter"
                                    >
                                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15"></path>
                                    </svg>
                                </li>
                                <li className="list-inline-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="bi bi-instagram"
                                    >
                                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.942-.372C10.443.01 10.171 0 7.998 0h.002zM8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
                                    </svg>
                                </li>
                                <li className="list-inline-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        className="bi bi-linkedin"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5c0 .966-.784 1.75-1.75 1.75h-12.5C.784 16 0 15.216 0 14.25V1.75zM2 2h12v12H2V2zm4.603 11h1.824v-5.731H6.603V13zm-.012-6.327c.862 0 1.392-.55 1.392-1.238-.013-.71-.53-1.239-1.38-1.239-.85 0-1.392.53-1.392 1.238 0 .688.53 1.239 1.38 1.239zM3.3 13h1.82V7.268H3.3V13z"
                                        ></path>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
                <script src="assets/bootstrap/js/bootstrap.min.js"></script>
            </body>
        </html>
    );
}

export default ServicesPage;
