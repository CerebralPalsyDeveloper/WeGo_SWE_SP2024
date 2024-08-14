import React, { useState, useContext, createContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import HomePageFleetManager from './components/HomePageFleetManager'; // Import HomePageFleetManager component
import FleetManagerDashboard from './components/FleetManagerDashboard'; // Import FleetManagerDashboard component
import FleetManagerLogin from './components/FleetManagerLogin'; // Import FleetManagerLogin component

// Create a context for authentication state
const AuthContext = createContext(null);

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? children : <Navigate to="/fleet-manager-login" />;
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
            <ul>
              <li><Link to="/">Home Page</Link></li>
              <li><Link to="/fleet-manager-login">Fleet Manager Login</Link></li>
              {isLoggedIn && <li><Link to="/fleet-manager">Fleet Manager Dashboard</Link></li>}
            </ul>
          </nav>

          <Routes>
            <Route path="/fleet-manager-login" element={<FleetManagerLogin setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/fleet-manager" element={<PrivateRoute><FleetManagerDashboard /></PrivateRoute>} />
            <Route path="/" element={<HomePageFleetManager />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Redirect unmatched routes */}
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
