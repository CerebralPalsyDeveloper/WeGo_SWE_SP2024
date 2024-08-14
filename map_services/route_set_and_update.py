from flask import request, jsonify, Blueprint
from pymongo import MongoClient
import requests
from datetime import datetime
from config import Config

fleet = Blueprint('fleet', __name__)


class FleetControl:
    def __init__(self):
        self.client = MongoClient(Config.MONGO_URI)
        self.db = self.client['team22_supply_db']
        self.vehicleinfo_collection = self.db["vehicleinfo"]
        self.dispatch_collection = self.db["DispatchInfo"]
        self.api_key = Config.API_KEY
        self.vehicle_status_api_url = "https://team-22.supply.seuswe.rocks/api/updateavailability"

    def get_place_id(self, latitude, longitude):
        url = f"https://maps.googleapis.com/maps/api/geocode/json?latlng={latitude},{longitude}&key={self.api_key}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        if 'results' in data and data['results']:
            return data['results'][0]['place_id']
        return None

    def request_route(self, current_location, destination):
        current_latitude, current_longitude = current_location
        place_id = self.get_place_id(current_latitude, current_longitude)
        if place_id:
            url = f"https://maps.googleapis.com/maps/api/directions/json?origin=place_id:{place_id}&destination={destination}&key={self.api_key}"
            response = requests.get(url)
            if response.status_code == 200:
                return response.json()
        return None

    def insert_dispatch_data(self, address, payload_type, route_data, vehicle_id):
        self.dispatch_collection.insert_one({
            "vehicle_id": vehicle_id,
            "destination": address,
            "payload": payload_type,
            "route": route_data
        })

    def update_vehicle_delivery_status(self, vehicle_id, route_data):
        self.vehicleinfo_collection.update_one(
            {"vehicle_id": vehicle_id},
            {"$set": {
                "delivery_status": {
                    "status": "assigned",
                    "route": route_data,
                    "last_update_time": datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
                }
            }}
        )

    def update_vehicle_availability(self, vehicle_id):
        payload = {
            "vehicle_id": str(vehicle_id),
            "availability": "enroute"
        }
        response = requests.post(self.vehicle_status_api_url, json=payload)
        return response.status_code == 200

    def find_available_vehicle(self):
        available_vehicle = self.vehicleinfo_collection.find_one(
            {"availability": "available"}
        )
        if available_vehicle:
            current_location = available_vehicle.get("current_location", [])
            vehicle_id = available_vehicle.get("vehicle_id")
            return current_location, vehicle_id
        return None, None

fleet_control = FleetControl()

@fleet.route('/api/post_order', methods=['POST'])
def receive_order():
    try:
        dispatch_info = request.json
        address = dispatch_info.get('Address')
        payload_type = dispatch_info.get('PayloadType')

        if not address or not payload_type:
            return jsonify({'Error': 'Required field(s) incomplete'}), 400
        
        current_location, vehicle_id = fleet_control.find_available_vehicle()

        if not vehicle_id:
            return jsonify({'Error': 'No available vehicle found'}), 404
        
        route_data = fleet_control.request_route(current_location, address)

        if not route_data:
            return jsonify({'Error': 'Failed to fetch route'}), 400
        
        fleet_control.update_vehicle_delivery_status(vehicle_id, route_data)
        fleet_control.update_vehicle_availability(vehicle_id)
        fleet_control.insert_dispatch_data(address, payload_type, route_data, vehicle_id)

        return jsonify({'Success': 'Order received and vehicle preparing to dispatch'}), 200
    except Exception as e:
        return jsonify({'Error': str(e)}), 500
