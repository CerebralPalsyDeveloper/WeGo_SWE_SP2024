from app import mongo
from werkzeug.security import generate_password_hash, check_password_hash


class User:
    """
    Data model for Users.

    Attributes:
        username (str): User's name.
        password_hash (str): Hashed password for the user.
    """

    def __init__(self, username, password):
        self.username = username
        self.PasswordHash = generate_password_hash(password)

    def insert(self):
        """
        Insert a new user into the 'users' collection.
        """
        users = {
            "username": self.username,
            "password_hash": self.password_hash
        }
        mongo.db.users.insert_one(users)
        return users['_id']

    @staticmethod
    def check_password(hashed_password, password):
        """
        Check if the provided password matches the hashed password of the user.

        Args:
            hashed_password (str): Hashed password to verify against.
            password (str): Password to verify.

        Returns:
            bool: True if the password matches, False otherwise.
        """
        return check_password_hash(hashed_password, password)

    def __repr__(self):
        return f'<User {self.username}>'
