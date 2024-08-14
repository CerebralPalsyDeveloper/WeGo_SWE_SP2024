# Flask Authentication API

This Flask application provides a simple authentication API using JWT (JSON Web Tokens) for token management.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Description

This authentication API allows users to authenticate by providing their username and password. Upon successful authentication, the API returns a JWT (JSON Web Token) that can be used to access protected resources.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Set up the database:

    - [Insert database setup instructions here if necessary]

## Usage

To use this authentication API, follow these steps:

1. Start the Flask server:

    ```bash
    python app.py
    ```

2. Send a POST request to the `/api/login` endpoint with the user's credentials (username and password) in the request body.

3. If the credentials are valid, the API will return a JWT in the response body. This token can be used to authenticate subsequent requests to protected endpoints.

## Endpoints

- **POST /api/login**: Authenticates a user and returns a JWT.

    Request Body:
    ```json
    {
        "username": "example_user",
        "password": "example_password"
    }
    ```

    Response Body (Success):
    ```json
    {
        "message": "Login successful",
        "access_token": "<JWT>"
    }
    ```

    Response Body (Error):
    ```json
    {
        "error": "Invalid credentials"
    }
    ```

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add your feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
