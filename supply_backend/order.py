from flask import request, jsonify, Blueprint
from pymongo import MongoClient
from bson import ObjectId
import json
import requests
from config import Config  # Import the Config class

order = Blueprint('order', __name__)


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


class Order:
    def __init__(self):
        self.client = MongoClient(Config.MONGO_URI)
        self.db = self.client['team22_supply_db']
        self.orders_collection = self.db['orders']


order_obj = Order()


@order.route('/api/order', methods=['POST'])
def place_order():
    try:
        data = request.json
        # Convert ObjectId fields to strings
        for key, value in data.items():
            if isinstance(value, ObjectId):
                data[key] = str(value)

        # Convert the data to a JSON string using the custom encoder
        data_json = JSONEncoder().encode(data)

        # Insert the order data into the MongoDB collection
        # Convert JSON string back to dictionary before insertion
        order_obj.orders_collection.insert_one(json.loads(data_json))

        response = requests.post("https://team-22.supply.seuswe.rocks/api/post_order", json=data)
        if response.status_code == 200:
            return jsonify({'message': 'Order received successfully', 'order_data': data}), 200
        else:
            return jsonify({'error': 'Order received but error occured in notifying fleet control'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@order.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        orders = [order for order in order_obj.orders_collection.find()]
        orders_json = JSONEncoder().encode(orders)  # Use custom encoder
        return orders_json, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
