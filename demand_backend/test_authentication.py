import pytest
from flask import Flask
from .app import create_app, db

@pytest.fixture
def app():
    """Create and configure a new Flask app instance for testing."""
    app = create_app()
    app.config['TESTING'] = True

    # Set up an in-memory SQLite database for testing
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'

    # No need to initialize a new db instance, use the existing one
    # db.init_app(app)

    # Create all tables
    with app.app_context():
        db.create_all()

    yield app

    # Teardown: Drop all tables after each test
    with app.app_context():
        db.session.remove()
        db.drop_all()


def test_signup_success(app):
    """Test successful user signup."""
    client = app.test_client()
    payload = {
        'email': 'test@example.com',
        'username': 'testuser',
        'password': 'testpassword'
    }
    response = client.post('/api/signup', json=payload)
    assert response.status_code == 200
    assert 'message' in response.json

def test_signup_existing_user(app):
    """Test signup with an existing username."""
    client = app.test_client()

    # First, sign up with the username 'testuser'
    payload = {
        'email': 'test@example.com',
        'username': 'testuser',
        'password': 'testpassword'
    }
    response = client.post('/api/signup', json=payload)
    assert response.status_code == 200  # Check if signup is successful

    # Now, try signing up again with the same username
    response = client.post('/api/signup', json=payload)
    assert response.status_code == 400  # Check if a 400 error is returned


def test_signup_missing_fields(app):
    """Test signup with missing fields."""
    client = app.test_client()
    payload = {
        'email': 'test@example.com',
        # Missing 'username' and 'password' fields
    }
    response = client.post('/api/signup', json=payload)
    assert response.status_code == 400
    assert 'error' in response.json

# Add more test cases for login scenarios

