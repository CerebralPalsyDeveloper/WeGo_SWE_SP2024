import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
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
            <img src="assets/img/WEGO%20LOGO.png" width="93" height="95" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcol-1">
              <span className="visually-hidden">Toggle navigation</span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-1">
              <ul className="navbar-nav mx-auto">
                {/* Navigation links */}
              </ul>
              <Link className="btn btn-primary shadow" to="/login">Log In</Link>
              &nbsp;
              <Link className="btn btn-primary shadow" to="/signup">Sign Up</Link>
              <ul className="navbar-nav">
                {/* More navigation links */}
              </ul>
            </div>
          </div>
        </nav>
        <header className="bg-dark">
          <div className="container py-5">
            <h1><strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;About Us</strong></h1>
            <div className="row py-5">
              <div className="col-md-6 text-center text-md-start d-flex d-sm-flex d-md-flex justify-content-center align-items-center justify-content-md-start align-items-md-center justify-content-xl-end mb-4">
                <div style={{ maxWidth: '450px' }}>
                  <p className="fw-bold text-success mb-2">WEGO INC.</p>
                  <h2 className="fw-bold">The best solution for<br />you and your<br />Delivery’s&nbsp;</h2>
                  <p className="my-3"><span style={{ color: 'rgb(236, 236, 236)', backgroundColor: 'rgb(33, 33, 33)' }}>Welcome to WeGo! Our mission: revolutionize online transportation with innovative solutions. We specialize in payload delivery services, focusing on non-human cargo markets. While our short-term focus is on autonomous vehicles for public roads, we're also exploring airborne drone services. Join us as we shape the future of transportation.</span></p>
                  <form className="d-flex justify-content-center flex-wrap justify-content-md-start flex-lg-nowrap" method="post">
                    <div className="my-2 me-2"></div>
                    <div className="my-2"><Link className="btn btn-primary shadow" to="/servicespage">GET STARTED</Link></div>
                  </form>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="p-5 mx-lg-5" style={{ background: 'url("assets/img/blob.svg") center / contain no-repeat' }}>
                  <img className="rounded img-fluid shadow w-100 fit-cover" style={{ minHeight: '300px' }} src="assets/img/wego%20front%20page.jpg" width="264" height="300" />
                </div>
              </div>
              <div className="w-100"></div>
              <div className="w-100"></div>
            </div>
          </div>
        </header>
        <section>
          <div className="container bg-dark py-5">
            <div className="row">
              <div className="col-md-8 col-xl-6 text-center mx-auto">
                <p className="fw-bold text-success mb-2">Our Services</p>
                <h3 className="fw-bold">What we can do for you</h3>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h1 className="text-center"><strong><span style={{ color: 'rgb(209, 210, 211)', backgroundColor: 'rgb(34, 37, 41)' }}>Pollution Solution</span></strong></h1>
                <p className="text-center"><em><span style={{ color: 'rgb(238, 243, 247)', backgroundColor: 'transparent' }}>One of the biggest issues to date is pollution. Trash runs the world, and it all begins when an individual drops plastic, cans, etc. Partnering with GoGo, we plan to develop an autonomous vehicle that personally comes to your door and picks up your trash.</span></em></p>
              </div>
              <div className="col-md-4">
                <h1 className="text-center"><strong><span style={{ color: 'rgb(209, 210, 211)', backgroundColor: 'rgb(34, 37, 41)' }}>Farm Flight</span></strong></h1>
                <p className="text-center"><em>FarmFlight Innovations revolutionizes</em><br /><em>agriculture for small and</em><br /><em>medium-sized, as well as</em><br /><em>sustainable and organic farms, by</em><br /><em>tackling their core challenges of</em><br /><em>resource management, crop health</em><br /><em>monitoring, and eco-friendly</em><br /><em>practices.</em></p>
              </div>
              <div className="col-md-4">
                <h1 className="text-center"><strong><span style={{ color: 'rgb(209, 210, 211)', backgroundColor: 'rgb(34, 37, 41)' }}>Disaster Aid</span></strong></h1>
                <p className="text-center"><em><span style={{ color: 'rgb(236, 240, 242)', backgroundColor: 'transparent' }}>Disaster Aid is a sophisticated solutions that with pinpoint accuracy it delivers critical aid anytime, anywhere to those who need it the most, seeking to wholly minimize the devastating impacts of disasters.</span></em></p>
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
                  {/* Footer service links */}
                </ul>
              </div>
              <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                <h3 className="fs-6 fw-bold">About</h3>
                <ul className="list-unstyled">
                  {/* Footer about links */}
                </ul>
              </div>
              <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
                <h3 className="fs-6 fw-bold">Careers</h3>
                <ul className="list-unstyled">
                  {/* Footer career links */}
                </ul>
              </div>
              <div className="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last">
                <div className="fw-bold d-flex align-items-center mb-2">
                  <span className="bs-icon-sm bs-icon-circle bs-icon-primary d-flex justify-content-center align-items-center bs-icon me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-bezier">
                      <path fillRule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 7.5 7h-1A1.5 1.5 0 0 1 5 5.5v-1z" />
                    </svg>
                  </span>
                  <span>Call Us: +1-234-567-8910</span>
                </div>
                <div className="fw-bold d-flex align-items-center">
                  <span className="bs-icon-sm bs-icon-circle bs-icon-primary d-flex justify-content-center align-items-center bs-icon me-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-envelope">
                      <path fillRule="evenodd" d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5H1.5A1.5 1.5 0 0 1 0 12.5v-9z" />
                      <path fillRule="evenodd" d="M0 4.5v-1l8 4 8-4v1l-8 4-8-4z" />
                    </svg>
                  </span>
                  <span>hello@wego.com</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
      </body>
    </html>
  );
}

export default HomePage;

