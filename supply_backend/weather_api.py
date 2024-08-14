from flask import Blueprint, request, jsonify
from flask_cors import CORS
from config import Config
import requests
from bson import ObjectId
import json

weather_api = Blueprint('weather_api', __name__)


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@weather_api.route('/api/weather', methods=['GET'])
def weather_proxy():
    try:
        response = requests.get(Config.WEATHER_API_URL)
        response.raise_for_status()  # Raises a HTTPError if the status is 4xx, 5xx
    except requests.exceptions.RequestException as err:
        return str(err), 500

    try:
        response_dict = json.loads(response.content)
    except json.JSONDecodeError as err:
        return str(err), 500

    try:
        response_json = JSONEncoder().encode(response_dict)
    except Exception as err:
        return str(err), 500

    return response_json
