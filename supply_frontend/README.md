# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

This repository is for the supply cloud's frontend code. It is currently on version 1.3


### How do I get set up? ###

Currently working on a requirements.txt file for supply_frontend repo. 

Steps to take:

* Clone repository to VSCode
* bash command on terminal: npm install 

Further installations should include:

* pip install blinker
* pip install click
* pip install colorama
* pip install flask
* pip install importlib-metadata
* pip install itsdangerous
* pip install Jinja2
* pip install Markupsafe
* pip install werkzeug
* pip install zipp

To Build for production use command: npm run build

# Fleet Manager Dashboard

This React component represents a dashboard for fleet managers, providing insights and tools for managing vehicle fleets, tracking deliveries, and monitoring performance metrics.

## Description

The `FleetManagerDashboard` component is a functional component written in React. It integrates various features including:

- **Data Fetching**: Fetches order data from an API endpoint and displays it on the dashboard.
- **Delivery Status Chart**: Renders a doughnut chart using Chart.js library to visualize delivery status.
- **Maps Integration**: Displays interactive maps using the Google Maps API for tracking vehicle locations and weather conditions.
- **Performance Metrics**: Displays performance metrics such as total profit, fuel efficiency, average delivery time, and number of completed trips.

## Usage

To use the `FleetManagerDashboard` component, import it into your React application and render it within your component tree.

```javascript
import React from 'react';
import FleetManagerDashboard from './FleetManagerDashboard';

function App() {
  return (
    <div>
      <FleetManagerDashboard />
      {/* Other components or routes */}
    </div>
  );
}

export default App;
```

# Fleet Manager Login Component

The `FleetManagerLogin` component is a React functional component designed for fleet managers to log in to the system. It provides a simple login interface where users can input their username and password to access the fleet management dashboard.

## Description

The `FleetManagerLogin` component utilizes React's state management hooks (`useState`) to manage the login form fields (`username` and `password`) and error messages (`error`). It also utilizes the `useNavigate` hook from React Router for programmatic navigation after successful login.

The component features input fields for username and password, along with a toggle button to show or hide the password. It handles form submission by sending a POST request to the login endpoint of the API. Upon successful login, it stores the JWT token and login state in the local storage and redirects the user to the dashboard page.

## Props

- `setIsLoggedIn` (Function): A function to update the login state of the parent component.

## Usage

To use the `FleetManagerLogin` component, import it into your React application and render it within your component tree. Pass the `setIsLoggedIn` function as a prop to handle the login state.

```javascript
import React, { useState } from 'react';
import FleetManagerLogin from './FleetManagerLogin';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn && <FleetManagerLogin setIsLoggedIn={setIsLoggedIn} />}
      {/* Other components or routes */}
    </div>
  );
}

export default App;
```




### Who do I talk to? ###

Contact a Team 22 team member or repo admin if any issues arise.