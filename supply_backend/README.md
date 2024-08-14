# Team 22 Supply Management System

This is a supply management system implemented using Flask, allowing for the management of orders and dispatches.

## Setup

1. **Clone the Repository:** 
    ```bash
    git clone <repository_url>
    ```

2. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Database Configuration:**
    - Ensure you have MongoDB installed and running.
    - Update the MongoDB connection string in the code to point to your MongoDB instance.

4. **Run the Application:**
    ```bash
    python app.py
    ```

## API Endpoints

### Increment Count
- **Endpoint:** `/api/increment`
- **Method:** POST
- **Description:** Increment the count for Proof of Concept (PoC) demo.

### Get Count
- **Endpoint:** `/api/count`
- **Method:** GET
- **Description:** Fetch the current count.

### Add Order
- **Endpoint:** `/api/orders`
- **Method:** GET
- **Description:** Fetch all orders.

### Add Dispatch
- **Endpoint:** `/api/order`
- **Method:** POST
- **Description:** Add a new dispatch.

### Create Vehicle Request
- **Endpoint:** `/vehiclerequest/v1/request`
- **Method:** POST
- **Description:** Create a new vehicle request.

## Data Models

### Dispatch Object
- **Attributes:**
    - `request_id`: Unique ID for the dispatch request.
    - `user`: User who placed the order.
    - `orderId`: ID of the order.
    - `delivery_location`: Address for delivery.
    - `payload_info`: Type of payload.

## Usage

- The API endpoints can be accessed using any HTTP client.
- Ensure proper authentication and authorization mechanisms are implemented before deploying to production.

## Testing

This project uses pytest for testing. Follow these steps to run the tests:

1. **Install pytest**: If you haven't already installed pytest, you can do so using pip:
    ```bash
    pip install pytest
    ```

2. **Run the tests**: Once pytest is installed, you can run the tests by executing the following command in your project's root directory:
    ```bash
    pytest
    ```

This will run all the tests located in files with names matching the pattern `test_*.py` or `*_test.py` in your project directory and its subdirectories.

## Contributing

- Contributions are welcome! Fork the repository and submit a pull request with your changes.
