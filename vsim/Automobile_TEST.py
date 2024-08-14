import pytest
from unittest.mock import patch
from Automobile import Vehicle  

def test_vehicle_initial_position():
    vehicle = Vehicle(vehicle_id="V4", route=[(0, 0), (1, 1)])
    assert vehicle.current_position_index == 0, "Initial position index should be zero."

def test_vehicle_stop_signal_not_set_initially():
    vehicle = Vehicle(vehicle_id="V6", route=[(0, 0), (1, 1)])
    assert not vehicle.stop_signal.is_set(), "Stop signal should not be set initially."

@patch('Automobile.requests.post')  
def test_vehicle_stop_signal_set_on_stop(mock_post):
    vehicle = Vehicle(vehicle_id="V7", route=[(0, 0), (1, 1)])
    vehicle.start_vehicle()
    vehicle.stop()
    assert vehicle.stop_signal.is_set(), "Stop signal should be set after the vehicle is stopped."

@patch('Automobile.requests.post')  
def test_starts_and_stops(mock_post):
    vehicle = Vehicle(vehicle_id="V12", route=[(0, 0), (0.5, 0.5), (1, 1), (1.5, 1.5)])
    vehicle.start_vehicle()
    vehicle.stop()
    assert not vehicle.running, "Vehicle/Navigation should be stopped after first stop."
    vehicle.start_vehicle()
    assert vehicle.running, "Vehicle should be running after restart."
    vehicle.stop()
    assert not vehicle.running, "Vehicle/Navigation should be stopped after second stop."

@patch('Automobile.requests.post') 
def test_stop_after_route_completion(mock_post):
    vehicle = Vehicle(vehicle_id="V13", route=[(0, 0), (1, 1)])
    vehicle.start_vehicle()
    for _ in range(len(vehicle.route)):  
        vehicle.navigate_route()
    assert not vehicle.running, "Vehicle should automatically stop after completing the route."

@patch('Automobile.requests.post')  
def test_vehicle_resumes_from_stopped_position(mock_post):
    vehicle = Vehicle(vehicle_id="V8", route=[(0, 0), (0.5, 0.5), (1, 1)])
    vehicle.start_vehicle()
    vehicle.current_position_index = 1  
    vehicle.stop()
    vehicle.start_vehicle()
    assert vehicle.current_position_index == 1, "Vehicle should resume from the last stopped position."

@patch('Automobile.requests.post')  
def test_navigate_route_simple(mock_post):
    vehicle = Vehicle(vehicle_id="V15", route=[(0, 0), (1, 1), (2, 2)])
    vehicle.start_vehicle()  
    vehicle.navigate_route()
    assert vehicle.current_position_index == 2, "Vehicle should navigate to the last point in the route."
    assert not vehicle.running, "Vehicle should stop running after completing the route."
