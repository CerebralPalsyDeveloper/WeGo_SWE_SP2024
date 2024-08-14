# Flask Backend Application

This Flask application serves as the backend for a project, providing various functionalities such as authentication, order management, etc.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Additional Functionality](#additional-functionality)
- [Integration with Database](#integration-with-database)
- [Next Steps](#next-steps)
- [Contributing](#contributing)
- [License](#license)

## Description

This backend application is built using Flask, a lightweight web framework for Python. It includes functionality for handling database connections, JWT-based authentication, CORS (Cross-Origin Resource Sharing) setup, and more. The application is modularized using Flask Blueprints, allowing for easy organization of routes and endpoints.

## Installation

To install and run this Flask backend application, follow these steps:

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

## Configuration

Before running the application, ensure that you have configured the necessary environment variables or configuration files. This application relies on the `Config` class for managing configuration settings. You may need to define environment variables such as `FLASK_ENV`, `JWT_SECRET_KEY`, `db_user`, `db_password`, `db_host`, `db_name`, etc., depending on your deployment environment.

## Usage

To run the Flask application, execute the following command:

```bash
python app.py
```

## Additional Functionality

### Authentication Blueprint

This application includes an authentication blueprint (`authentication`) that provides endpoints for user authentication and registration.

- **POST /api/signup**: Register a new user.
- **POST /api/login**: Authenticate user and return a JWT.

### Order Blueprint

This application includes an order blueprint (`order`) that provides an endpoint for handling incoming order requests.

- **POST /api/order**: Handle incoming order requests.

### Logging

This application sets up logging using the built-in `logging` module in Python. Log messages are written to the console with the INFO level. Logging is used to track incoming order requests and any errors encountered during order processing.

### User Model

This application includes a `User` model to represent users in the database. The `User` model contains attributes such as `UserID`, `Email`, `Name`, and `PasswordHash`. User passwords are securely hashed using the `werkzeug.security` module.

## Integration with Database

This application utilizes an `Orders` model to represent orders in the database. The `Orders` model contains fields such as `OrderID`, `UserName`, `Address`, `PaymentMethod`, `TotalAmount`, and `PayloadType`. Orders are stored in the database upon successful processing.

## Running Tests

This project includes unit tests written with `pytest` to ensure the correctness of the codebase. Before running the tests, make sure you have installed the necessary dependencies, including `pytest`. To run a pytest file, run pytest and the test file in the command prompt.
Example: pytest test_order.py

### Installation

If you haven't installed `pytest` yet, you can do so using `pip`:

```bash
pip install pytest
```


## Next Steps

After setting up the backend and order processing functionality, you can integrate it with your frontend application or use it as the backend for your entire project. Ensure that your frontend application can communicate with the backend endpoints properly and handle responses accordingly.

Feel free to explore the codebase further and customize it to fit your project's requirements!

## Contributing

Contributions to this project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add your feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.

