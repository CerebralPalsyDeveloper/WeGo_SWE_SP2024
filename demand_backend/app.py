from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import Config  # Import the Config class
from flask_jwt_extended import JWTManager
import os
import sys
sys.path.append('/home/team22/repos/demand_backend')

db = SQLAlchemy()

# Move env definition outside create_app()
env = os.getenv("FLASK_ENV", "production")


def create_app():
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__)

    # Setup CORS
    CORS(app)

    # Setup JWT Manager
    app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY  # You should define a secret key
    jwt = JWTManager(app)  # Initialize JWT Manager

    # Using configuration settings from Config class
    if env == "production":
        app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{Config.db_user}:{Config.db_password}@{Config.db_host}/{Config.db_name}'
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///development.db'

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the database with the app
    try:
        db.init_app(app)
        # Potentially add here database migration logic
    except Exception as e:
        app.logger.error(f"An error occurred during initialization: {e}")

    # Register Blueprints
    from authentication import authentication
    from order import order

    app.register_blueprint(authentication)
    app.register_blueprint(order)

    return app


# Run the app
if __name__ == "__main__":
    create_app().run()
