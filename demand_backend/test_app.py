#import pytest
#from .app import create_app

#@pytest.fixture
#def app():
#    """Create a Flask app instance for testing."""
#    app = create_app()
#    app.config['TESTING'] = True
#    yield app

#def test_nonexistent_route(app):
#    """Test accessing a nonexistent route."""
#    with app.test_client() as client:
#        response = client.get('/nonexistent')
#        assert response.status_code == 404

