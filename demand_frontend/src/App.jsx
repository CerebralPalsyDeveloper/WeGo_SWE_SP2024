// App.jsx
import React, { useState, useContext, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import PollutionSolutionPlugin from "./components/PollutionSolutionPlugin";
import OrderPage from "./components/OrderPage";
import ServicesPage from "./components/ServicesPage";
import FarmFlightPlugin from "./components/FarmFlightPlugin";
import DisasterAidPlugin from "./components/DisasterAidPlugin";

// Create a context for authentication state
const AuthContext = createContext(null);

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Router>
        <div>
          <nav>
          </nav>

          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pollution-solution" element={<PrivateRoute><PollutionSolutionPlugin /></PrivateRoute>} />
            <Route path="/order" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />}/> {/* Redirect unmatched routes */}
            <Route path="/servicespage" element={<ServicesPage></ServicesPage>}/>
            <Route path="/pollutionsolution" element={<PollutionSolutionPlugin></PollutionSolutionPlugin>}/>
            <Route path="/farmflight" element={<FarmFlightPlugin></FarmFlightPlugin>}/>
            <Route path="/disasteraid" element={<DisasterAidPlugin></DisasterAidPlugin>}/>
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;