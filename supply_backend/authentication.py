import re
from flask import Blueprint, jsonify, request
from pymongo import MongoClient
from config import Config  # Import the Config class
from user import User  # Import the User class
# Using JWT for token management
from flask_jwt_extended import create_access_token

authentication = Blueprint('authentication', __name__)


def is_valid_email(email):
    """Validate the email format."""
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)


class Authentication:
    def __init__(self):
        self.client = MongoClient(Config.MONGO_URI)
        self.db = self.client['team22_supply_db']
        self.users_collection = self.db['users']


@authentication.route('/api/login', methods=['POST'])
def login():
    """Authenticate user and return a JWT."""
    auth = Authentication()
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = auth.users_collection.find_one({'username': username})
    if user and User.check_password(user['password_hash'], password):
        access_token = create_access_token(identity=username)
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401
