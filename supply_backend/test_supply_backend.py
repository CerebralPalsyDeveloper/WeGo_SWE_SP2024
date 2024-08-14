import pytest
from unittest.mock import MagicMock, patch
from order import Order
from authentication import Authentication

@pytest.fixture
def app():
    supply_backend = SupplyBackend()
    return supply_backend.app

def test_increment_count(app):
    client = app.test_client()
    response = client.post('/api/increment')
    assert response.status_code == 200
    assert response.json['message'] == 'Count incremented successfully'

def test_get_count(app):
    client = app.test_client()
    response = client.get('/api/count')
    assert response.status_code == 200
    assert 'count' in response.json

def test_place_order(app):
    client = app.test_client()
    response = client.post('/api/order', json={'some': 'data'})
    assert response.status_code == 200
    assert 'message' in response.json


def test_login(app):
    client = app.test_client()
    # Create a test user
    client.post('/api/signup', json={'email': 'test@example.com', 'username': 'testuser', 'password': 'password'})
    
    # Test login with correct credentials
    response = client.post('/api/login', json={'username': 'testuser', 'password': 'password'})
    assert response.status_code == 200
    assert 'message' in response.json
    
    # Test login with incorrect password
    response = client.post('/api/login', json={'username': 'testuser', 'password': 'wrongpassword'})
    assert response.status_code == 401
    assert 'error' in response.json

    # Test login with non-existent user
    response = client.post('/api/login', json={'username': 'nonexistentuser', 'password': 'password'})
    assert response.status_code == 404
    assert 'error' in response.json

