# Route Fetcher

Fetching route from Map Services based on Order destination. Promptly update route data and order information for data persistency.

## Prerequisites

- Python installed on your system.
- Required Python libraries installed.

## Setup

Clone this repository to your local machine using the following command:

```bash
git clone repository-url
```

Navigate to the project directory:

```bash
cd repository-directory
```

Install the required Python libraries:

```bash
pip install requests
```

## Features

- Finds available vehicles from a MongoDB database.
- Uses Google Maps API to get routes and geocoding information.
- Posts vehicle delivery status to a remote API.
- Saves dispatch information in a MongoDB collection.

## How to Use

Execute the Python script `main.py`. Follow the on-screen menu prompts to perform actions such as setting routes, starting/stopping vehicles, and getting vehicle locations.

## Error Handling

- Returns `400` if required fields are missing or if there's an error fetching the route.
- Returns `404` if no available vehicle is found.
- Returns `500` for other unhandled exceptions.

## Note

Ensure proper API key management and adhere to usage limits of Google Maps APIs. For more details on Google Maps Directions API, refer to the official documentation.