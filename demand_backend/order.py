from flask import Blueprint, jsonify, request
from app import db
import logging

# Setting up logging
logging.basicConfig(level=logging.INFO)

order = Blueprint('order', __name__)


class Orders(db.Model):
    """Data model for Orders."""
    OrderID = db.Column(db.Integer, primary_key=True, autoincrement=True)
    UserName = db.Column(db.String(255), nullable=False)
    Address = db.Column(db.String(255), nullable=False)
    PaymentMethod = db.Column(db.String(50), nullable=False)
    TotalAmount = db.Column(db.DECIMAL(10, 2), nullable=False)
    PayloadType = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Order {self.OrderID}>'


@order.route('/api/order', methods=['POST'])
def handle_order():
    """Handle incoming order requests."""
    data = request.json
    # Logging order requests
    logging.info("Received order request with data: %s", data)

    # Validate order input
    required_fields = ['UserName', 'Address', 'PaymentMethod', 'TotalAmount', 'PayloadType']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required field(s)'}), 400

    # Here you would call your payment processing service to handle payment details
    try:
        new_order = Orders(
            UserName=data['UserName'],
            Address=data['Address'],
            PaymentMethod=data['PaymentMethod'],
            TotalAmount=data['TotalAmount'],
	        PayloadType=data['PayloadType']
        )
        db.session.add(new_order)
        db.session.commit()
        return jsonify({'message': 'Order processed successfully', 'OrderID': new_order.OrderID}), 201
    except Exception as e:
        logging.error("Failed to process order: %s", str(e))
        return jsonify({'error': 'Failed to process order: ' + str(e)}), 500
