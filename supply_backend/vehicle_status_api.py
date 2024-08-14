from flask import jsonify, request, Blueprint
from pymongo import MongoClient
from config import Config

vehicleStatus = Blueprint('vehicleStatus', __name__)

client = MongoClient(Config.MONGO_URI)
db = client['team22_supply_db']
vehicleinfo_collection = db["vehicleinfo"]


@vehicleStatus.route('/api/updateavailability', methods=['POST'])
def update_availability():
    data = request.json

    vehicle_id = data.get('vehicle_id')
    availability = data.get('availability')

    if not vehicle_id or not availability:
        return jsonify({'Error': 'Required field(s) incomplete'}), 400

    if not vehicleinfo_collection.find_one({'vehicle_id': vehicle_id}):
        return jsonify({'Error': f'No such vehicle with ID {vehicle_id}'}), 404

    update = vehicleinfo_collection.update_one(
        {'vehicle_id': vehicle_id}, {'$set': {'availability': availability}})

    if update.modified_count == 1:  # Check if update was successful
        return jsonify({'Completed': f'Updated availability for vehicle: {vehicle_id}'}), 200
    else:
        return jsonify({'Error': 'Failed to update availability'}), 500


@vehicleStatus.route('/api/assignedorders', methods=['GET'])
def get_assigned_orders():

    assigned_orders = {}
    vehicles_with_orders = vehicleinfo_collection.find(
        {"delivery_status.status": "assigned"})

    for vehicle in vehicles_with_orders:
        vehicle_id = vehicle.get('vehicle_id')
        route = vehicle.get('delivery_status', {}).get('route')
        assigned_orders[vehicle_id] = route

    return jsonify(assigned_orders), 200


@vehicleStatus.route('/api/updatedeliverystatus', methods=['POST'])
def update_delivery_status():
    data = request.json

    vehicle_id = data.get('vehicle_id')
    delivery_status = data.get('delivery_status')
    last_update_time = data.get('last_update_time')
    remove_route = data.get('remove_route', False)

    if not vehicle_id or not delivery_status or not last_update_time:
        return jsonify({'error': 'Required field(s) incomplete'}), 400

    if not vehicleinfo_collection.find_one({'vehicle_id': vehicle_id}):
        return jsonify({'Error': f'Vehicle with ID {vehicle_id} not found'}), 404

    update_data = {'delivery_status.status': delivery_status,
                   "last_update_time": last_update_time}
    if remove_route:
        update_data['delivery_status.route'] = {}

    update = vehicleinfo_collection.update_one(
        {'vehicle_id': vehicle_id}, {'$set': update_data})

    if update.modified_count == 1:  # Check if update was successful
        return jsonify({'Completed': f'Updated delivery status for vehicle: {vehicle_id}'}), 200
    else:
        return jsonify({'Error': 'Failed to update delivery status'}), 500


@vehicleStatus.route('/api/update_location', methods=['POST'])
def update_location():
    data = request.json

    vehicle_id = data.get('vehicle_id')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    if not vehicle_id or not latitude or not longitude:
        return jsonify({'Error': 'Required field(s) incomplete'}), 400

    if not vehicleinfo_collection.find_one({'vehicle_id': vehicle_id}):
        return jsonify({'Error': f'No such vehicle with ID {vehicle_id}'}), 404

    coordinates = [latitude, longitude]
    vehicleinfo_collection.update_one({'vehicle_id': vehicle_id}, {
                                      '$set': {'current_location': coordinates}})

    return jsonify({'Completed': f'Updated location for vehicle: {vehicle_id}'}), 200


@vehicleStatus.route('/api/current_location', methods=['GET'])
def get_coordinates():

    vehicle_id = request.args.get('vehicle_id')

    if not vehicle_id:
        return jsonify({'Error': 'Vehicle ID required'}), 400

    vehicle_info = vehicleinfo_collection.find_one({'vehicle_id': vehicle_id})

    if not vehicle_info:
        return jsonify({'Error': f'Vehicle with ID: {vehicle_id} not found'}), 404

    coordinates = vehicle_info.get('current_location')

    if not coordinates:
        return jsonify({'Error': f'Coordinates not available for vehicle: {vehicle_id}'}), 404

    return jsonify({'coordinates': coordinates}), 200

@vehicleStatus.route('/api/all_vehicle_ids', methods=['GET'])
def get_all_vehicle_ids():
    
    try:
        vehicles = vehicleinfo_collection.find({}, {'vehicle_id': 1, '_id': 0})  
        vehicle_ids = [vehicle['vehicle_id'] for vehicle in vehicles if 'vehicle_id' in vehicle]
        return jsonify(vehicle_ids), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500



@vehicleStatus.route('/api/current_location_and_routes', methods=['GET'])
def get_current_location_and_routes():
    vehicles_data = []
    all_vehicles = vehicleinfo_collection.find({})

    for vehicle in all_vehicles:
        current_location = vehicle.get('current_location', None)
        latitude = current_location[0] if current_location and len(current_location) >= 2 else None
        longitude = current_location[1] if current_location and len(current_location) >= 2 else None
        delivery_status = vehicle.get('delivery_status', None)
        overview_polyline = None

        if delivery_status:
            route = delivery_status.get('route', None)
            if route and 'routes' in route and len(route['routes']) > 0:
                overview_polyline = route['routes'][0].get('overview_polyline', None)

        vehicle_data = {
            'vehicle_id': vehicle.get('vehicle_id', None),
            'current_location': {'coordinates': [latitude, longitude]},
            'overview_polyline': overview_polyline,
        }
        vehicles_data.append(vehicle_data)

    return jsonify(vehicles_data), 200


@vehicleStatus.route('/api/vehiclestatus', methods=['GET'])
def get_vehicle_status():

    vehicle_id = request.args.get('vehicle_id')

    if not vehicle_id:
        return jsonify({'Error': 'Vehicle ID required'}), 400

    vehicle_info = vehicleinfo_collection.find_one({'vehicle_id': vehicle_id})

    # circumvent TypeError: Object of type ObjectId is not JSON serializable
    vehicle_info['_id'] = str(vehicle_info['_id'])

    if not vehicle_info:
        return jsonify({'Error': f'Vehicle with ID: {vehicle_id} not found'}), 404

    return jsonify(vehicle_info), 200


@vehicleStatus.route('/api/kpi', methods=['GET'])
def get_vehicle_kpi():

    vehicle_id = request.args.get('vehicle_id')

    if not vehicle_id:
        return jsonify({'Error': 'Vehicle ID required'}), 400

    vehicle = vehicleinfo_collection.find_one({'vehicle_id': vehicle_id})

    if not vehicle:
        return jsonify({'Error': f'Vehicle with ID: {vehicle_id} not found'}), 404

    kpis = vehicle.get('key_performance_metrics', {})

    return jsonify(kpis), 200
