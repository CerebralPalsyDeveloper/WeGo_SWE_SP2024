import pytest
from flask import Flask, jsonify
from flask.testing import FlaskClient
from .order import order, Order, handle_order
from .app import db

@pytest.fixture
def test_app():
    app = Flask(__name__)
    app.config['TESTING'] = True
    app.register_blueprint(order)

    # Set up an in-memory SQLite database for testing
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    db.init_app(app)

    with app.app_context():
        db.create_all()

    yield app

    # Teardown: Drop all tables after each test
    with app.app_context():
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(test_app):
    with test_app.test_client() as client:
        yield client

def test_handle_order_success(client):
    payload = {
        'name': 'John Doe',
        'address': '123 Main St',
        'payment_method': 'Credit Card',
        'card_number': '1234567812345678',
        'expiry_date': '12/24',
        'cvv': '123',
        'payload_type': 'Item',
        'payload_price': 50.0
    }
    response = client.post('/api/order', json=payload)
    assert response.status_code == 200
    assert response.json['message'] == 'Order placed successfully'
    # Check if the order is stored in the database
    assert Order.query.filter_by(UserName='John Doe').first() is not None

def test_handle_order_missing_fields(client):
    # Missing 'address' field in the payload
    payload = {
        'name': 'John Doe',
        'payment_method': 'Credit Card',
        'card_number': '1234567812345678',
        'expiry_date': '12/24',
        'cvv': '123',
        'payload_type': 'Item',
        'payload_price': 50.0
    }
    response = client.post('/api/order', json=payload)
    assert response.status_code == 400
    assert 'error' in response.json

    # Missing 'name' field in the payload
    payload = {
        'address': '123 Main St',
        'payment_method': 'Credit Card',
        'card_number': '1234567812345678',
        'expiry_date': '12/24',
        'cvv': '123',
        'payload_type': 'Item',
        'payload_price': 50.0
    }
    response = client.post('/api/order', json=payload)
    assert response.status_code == 400
    assert 'error' in response.json
