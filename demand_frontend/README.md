# Demand Frontend React Login Component
This React component provides a login form for users to authenticate with the backend server.
## Description
The `Login` component is a functional component written in React. It utilizes hooks such as `useState` to manage component state and `useNavigate` for programmatic navigation. The component sends a POST request to the backend server's login endpoint to authenticate users.
## Usage
To use the `Login` component, import it into your React application and render it within your component tree. You need to pass the `setIsLoggedIn` function as a prop to handle the login state.
```javascript
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
      {/* Other components or routes */}
    </div>
  );
}
export default App;
```

# React HomePage Component
This React component represents the homepage of the application.
## Description
The `HomePage` component is a functional component written in React. It renders the main landing page of the application, featuring various sections such as navigation links, company logo, title, signup button, and footer.
## Usage
To use the `HomePage` component, import it into your React application and render it within your component tree.
```javascript
import React from 'react';
import HomePage from './HomePage';
function App() {
  return (
    <div>
      <HomePage />
      {/* Other components or routes */}
    </div>
  );
}
export default App;
```
# React Signup Component
This React component provides a signup form for users to register with the application.
## Description
The `Signup` component is a functional component written in React. It allows users to input their email, username, password, and confirm password to create a new account. The component includes client-side validation for password requirements and checks for matching passwords before submitting the signup request to the backend server.
## Usage
To use the `Signup` component, import it into your React application and render it within your component tree.
```javascript
import React from 'react';
import Signup from './Signup';
function App() {
  return (
    <div>
      <Signup />
      {/* Other components or routes */}
    </div>
  );
}
export default App;
```
# React OrderPage Component
This React component represents the order page of the application where users can place orders for various payload types.
## Description
The `OrderPage` component is a functional component written in React. It allows users to input their name, address, and select a payment method to place an order for a specific payload type. The component retrieves the payload type from the query parameters in the URL and dynamically calculates the payload price based on the selected type. After submitting the order, the component sends the order data to both the demand backend and supply backend.
## Usage
To use the `OrderPage` component, import it into your React application and render it within your component tree.
```javascript
import React from 'react';
import OrderPage from './OrderPage';
function App() {
  return (
    <div>
      <OrderPage />
      {/* Other components or routes */}
    </div>
  );
}
export default App;
```
# React Pollution Solution Plugin Component
This React component represents a plugin for managing pollution solutions. Users can select the type of waste they want to dispose of and schedule the disposal frequency.
## Description
The `PollutionSolutionPlugin` component is a functional component written in React. It allows users to select from different waste types such as recyclables, organic waste, and general waste, along with their associated prices and disposal schedules. Users can then place an order for the selected waste type, which redirects them to the order page with the payload type specified in the query parameters.
## Usage
To use the `PollutionSolutionPlugin` component, import it into your React application and render it within your component tree.
```javascript
import React from 'react';
import PollutionSolutionPlugin from './PollutionSolutionPlugin';
function App() {
  return (
    <div>
      <PollutionSolutionPlugin />
      {/* Other components or routes */}
    </div>
  );
}
export default App;
```
# React FarmFlight Plugin Component
This React component represents a plugin for managing farm flight payloads. Users can select the type of payload they want to use for farm operations, along with their associated prices and schedules.
## Description
The `FarmFlightPlugin` component is a functional component written in React. It allows users to select from different payload types such as crop monitoring, crop spraying, and soil analysis, along with their associated prices and schedules. Users can then place an order for the selected payload type, which redirects them to the order page with the payload type specified in the query parameters.
## Usage
To use the `FarmFlightPlugin` component, import it into your React application and render it within your component tree.
```javascript
import React from 'react';
import FarmFlightPlugin from './FarmFlightPlugin';
function App() {
  return (
    <div>
      <FarmFlightPlugin />
      {/* Other components or routes */}
    </div>
  );
}
export default App;
```

# React Disaster Aid Plugin Component
This React component represents a plugin for managing disaster aid payloads. Users can select the type of payload they want to use for disaster aid operations, along with their associated prices and schedules.
## Description
The `DisasterAidPlugin` component is a functional component written in React. It allows users to select from different payload types such as food rations, shelter materials, and power generators, along with their associated prices and schedules. Users can then place an order for the selected payload type, which redirects them to the order page with the payload type specified in the query parameters.
## Usage
To use the `DisasterAidPlugin` component, import it into your React application and render it within your component tree.
```javascript
import React from 'react';
import DisasterAidPlugin from './DisasterAidPlugin';
function App() {
  return (
    <div>
      <DisasterAidPlugin />
      {/* Other components or routes */}
    </div>
  );
}
export default App;
```