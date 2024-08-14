import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';

const OrderPage = () => {
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedPayloadType, setSelectedPayloadType] = useState("");
  const [payloadPrice, setPayloadPrice] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [successMessage, setSuccessMessage] = useState("");

  const location = useLocation();

  const payloadOptions = [
    { label: "Recyclables", price: 10 },
    { label: "Organic Waste", price: 15 },
    { label: "General Waste", price: 20 },
    { label: "Crop Monitoring", price: 20 },
    { label: "Crop Spraying", price: 30 },
    { label: "Soil Analysis", price: 25 },
    { label: 'Food Rations', price: 30 },
    { label: 'Shelter Materials', price: 40 },
    { label: 'Power Generators', price: 70 }
  ];

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const payloadType = searchParams.get("payloadType");
    if (payloadType) {
      setSelectedPayloadType(payloadType);
      const foundPayloadType = payloadOptions.find(
        (option) => option.label === payloadType
      );
      setPayloadPrice(foundPayloadType ? foundPayloadType.price : 0);
    }
  }, [location]);

  const handleOrder = async (event) => {
    event.preventDefault();

    if (!userName || !address || !selectedPayloadType) {
      setError("Please fill out all required fields correctly.");
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        UserName: userName,
        Address: address,
        PaymentMethod: paymentMethod,
        TotalAmount: payloadPrice,
        PayloadType: selectedPayloadType,
      };

      const response = await fetch("https://team-22.seuswe.rocks/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const response2 = await fetch("https://team-22.supply.seuswe.rocks/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response2.ok) {
        throw new Error(`HTTP error! status: ${response2.status}`);
      }

      const errorData = await response.json();
      const errorData2 = await response2.json();

      setUserName("");
      setAddress("");
      setPaymentMethod("Credit Card");
      setSelectedPayloadType("");
      setSuccessMessage("Order placed successfully!");
    } catch (error) {
      setError(`Error placing order: ${error.message}`);
      setSuccessMessage("");
    }

    setIsLoading(false);
  };

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order Page</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        />
        {/* Additional stylesheets */}
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
              <a class="btn btn-primary shadow" role="button" href="signup.html">Log In</a>
              &nbsp;
              <a class="btn btn-primary shadow" role="button" href="signup.html">Sign up</a>
              <ul class="navbar-nav">
                <li class="nav-item"></li>
                <li class="nav-item"></li>
                <li class="nav-item"></li>
              </ul>
            </div>
          </div>
        </nav>
        <section class="py-5">
          <div class="container">
            <h1>Order Page</h1>
            {selectedPayloadType && (
              <p>
                Selected Payload Type: {selectedPayloadType} (${payloadPrice})
              </p>
            )}
            <form onSubmit={handleOrder}>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label>Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <label>Payment Method:</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
                <button type="submit" disabled={isLoading}>
                  {isLoading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </div>
        </section>
        <footer class="py-5 bg-dark">
          <div class="container">
            <p class="m-0 text-center text-white">© 2023 WEGO - Developed by Team 22</p>
          </div>
        </footer>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        {/* Additional scripts */}
      </body>
    </html>
  );
};

export default OrderPage;

