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


@authentication.route('/api/signup', methods=['POST'])
def signup():
    """Register a new user."""
    data = request.json
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')

    if not email or not username or not password:
        return jsonify({'error': 'Email, username, and password are required'}), 400
    
    if not is_valid_email(email):
        return jsonify({'error': 'Invalid email format'}), 400

    if User.query.filter_by(Name=username).first():
        return jsonify({'error': 'Username already exists'}), 409

    if User.query.filter_by(Email=email).first():
        return jsonify({'error': 'Email already exists'}), 409

    new_user = User(email=email, name=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201


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
