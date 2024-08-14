import re
from flask import Blueprint, jsonify, request
from app import db
from user import User
# Using JWT for token management
from flask_jwt_extended import create_access_token

authentication = Blueprint('authentication', __name__)


def is_valid_email(email):
    """Validate the email format."""
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)


@authentication.route('/api/login', methods=['POST'])
def login():
    """Authenticate user and return a JWT."""
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
        
    user = User.query.filter_by(Name=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=username)
        return jsonify({'message': 'Login successful', 'access_token': access_token}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401