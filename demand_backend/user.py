from app import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    """
    Data model for Users.
    
    Attributes:
        UserID (int): Unique identifier for the user.
        Email (str): User's email address, must be unique.
        Name (str): User's name.
        PasswordHash (str): Hashed password for the user.
    """
    UserID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    Email = db.Column(db.String(255), unique=True, nullable=False, index=True)
    Name = db.Column(db.String(255), nullable=False)
    PasswordHash = db.Column(db.String(255), nullable=False)

    def __init__(self, email, name, password):
        self.Email = email
        self.Name = name
        self.PasswordHash = generate_password_hash(password)

    def check_password(self, password):
        """
        Check if the provided password matches the hashed password of the user.
        
        Args:
            password (str): Password to verify.
            
        Returns:
            bool: True if the password matches, False otherwise.
        """
        return check_password_hash(self.PasswordHash, password)

    def __repr__(self):
        return f'<User {self.Name}>'
