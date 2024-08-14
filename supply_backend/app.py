from flask_jwt_extended import JWTManager
from config import Config  # Import the Config class
from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
import os  # Import for environment variables
import sys
sys.path.append('/home/team22/repos/supply_backend')

mongo = PyMongo()


def create_app():
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__)

    # Setup CORS
    CORS(app)

    # Setup JWT Manager
    app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY
    jwt = JWTManager(app)  # Initialize JWT Manager

    # Configure MongoDB settings from Config class
    if os.getenv("FLASK_ENV", "production"):  # Default to development if not set
        app.config["MONGO_URI"] = Config.MONGO_URI
    else:
        app.config["MONGO_URI"] = "mongodb://localhost:27017/development"

    # Initialize PyMongo with the app
    try:
        mongo.init_app(app)
    except Exception as e:
        app.logger.error(f"An error occurred during initialization: {e}")

    from authentication import authentication
    from order import order
    from vehicle_status_api import vehicleStatus
    from fleet_control import fleet
    from weather_api import weather_api

    app.register_blueprint(authentication)
    app.register_blueprint(order)
    app.register_blueprint(vehicleStatus)
    app.register_blueprint(fleet)
    app.register_blueprint(weather_api)

    return app


# Ensure environment variables are set for production
if __name__ == "__main__":
    if os.getenv("FLASK_ENV") == "production" and not os.getenv('DATABASE_URL'):
        raise ValueError("No DATABASE_URL set for production environment")
    create_app().run()
