import threading
import time
import requests
from datetime import datetime
import polyline

class Vehicle:
    def __init__(self, vehicle_id, route, completion_callback=None):
        self.vehicle_id = vehicle_id
        self.route = route
        self.current_position_index = 0
        self.running = False
        self.completion_callback = completion_callback
        self.stop_signal = threading.Event()
        self.lock = threading.Lock()
        self.thread = None

    def start_vehicle(self):
        if not self.running:
            self.stop_signal.clear()
            self.running = True
            print(f"\n*Starting route for Vehicle {self.vehicle_id}.*")
            self.thread = threading.Thread(target=self.navigate_route)
            self.thread.start()
        else:
            print(f"{self.vehicle_id} is already running.")

    def navigate_route(self):
        try:
            for i in range(self.current_position_index, len(self.route)):
                if self.stop_signal.is_set():
                    print(f"\n*Navigation stopped for Vehicle {self.vehicle_id}.*")
                    break
                coordinates = self.route[i]
                self.current_position_index = i  
                self.update_current_location(coordinates[0], coordinates[1])
                time.sleep(3)
            self.running = False
            if not self.stop_signal.is_set():
                self.update_availability()
                self.update_delivery_status(remove_route=True)
                if self.completion_callback:
                    self.completion_callback(self)
                print(f"\n*Vehicle {self.vehicle_id} has completed its route.*")
        finally:
            self.running = False

    def stop(self):
        self.stop_signal.set()
        if self.thread is not None:
            self.thread.join()
        # print(f"Stopping {self.vehicle_id}...dropping payload")

    def update_availability(self):
        data = {
            "vehicle_id": self.vehicle_id,
            "availability": "available"
        }
        response = requests.post('https://team-22.supply.seuswe.rocks/api/updateavailability', json=data)
        if response.status_code != 200:
            print(f"ERROR: Failed to update availability for Vehicle {self.vehicle_id}")

    def update_delivery_status(self, remove_route=False):
        data = {
            "vehicle_id": self.vehicle_id,
            "delivery_status": "complete",
            "last_update_time": datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%fZ"),
            "remove_route": remove_route
        }
        response = requests.post('https://team-22.supply.seuswe.rocks/api/updatedeliverystatus', json=data)
        if response.status_code != 200:
            print(f"ERROR: Failed to update delivery status for Vehicle {self.vehicle_id}")

    def update_current_location(self, latitude, longitude):
        data = {
            'vehicle_id': self.vehicle_id,
            'latitude': latitude,
            'longitude': longitude
        }
        response = requests.post('https://team-22.supply.seuswe.rocks/api/update_location', json=data)
        if response.status_code != 200:
            print(f"ERROR: Failed to update location for Vehicle {self.vehicle_id}")

class TestConsole:
    def __init__(self, vsim):
        self.vsim = vsim

    def start_vehicle(self, vehicle):
        vehicle.start_vehicle()

    def stop_vehicle(self, vehicle):
        vehicle.stop()

    def get_location(self, vehicle_id):
        url = "https://team-22.supply.seuswe.rocks/api/current_location"
        params = {"vehicle_id": vehicle_id}
        response = requests.get(url, params=params)
        if response.status_code == 200:
            data = response.json()
            coordinates = data.get("coordinates")
            print(f"\nVehicle {vehicle_id} is currently at coordinates: {str(coordinates)}".center(80))
        else:
            print('Error:', response.json())

class VSIM:
    def __init__(self, vehicle_status_api_url):
        self.vehicles = {}
        self.test_console = TestConsole(self)
        self.vehicle_status_api_url = vehicle_status_api_url

    def update_vehicles(self):
        response_vehicle_ids = requests.get("https://team-22.supply.seuswe.rocks/api/all_vehicle_ids")
        all_ids = []

        if response_vehicle_ids.status_code == 200:
            vehicle_ids = response_vehicle_ids.json()
            print("\nVehicle IDs of all vehicles: ")
            for vehicle_id in vehicle_ids:
                all_ids.append(vehicle_id)
            print(*all_ids)

        else:
            print("Error fetching vehicle ID info.")
            return None, None

        response = requests.get(self.vehicle_status_api_url)
        if response.status_code == 200:
            assigned_orders = response.json()
            ids_with_orders_assigned = []  
            for vehicle_id, route_data in assigned_orders.items():
                if vehicle_id not in self.vehicles:
                    route = parse_route_data(route_data)
                    self.vehicles[vehicle_id] = Vehicle(vehicle_id, route)
                ids_with_orders_assigned.append(vehicle_id)
            
            if ids_with_orders_assigned:
                print("\nVehicle IDs of vehicles with assigned orders & ready to deploy OR are enroute:\n")
                print(ids_with_orders_assigned)
            else:
                print("\nNo vehicles currently have orders assigned or are enroute.")

            return all_ids, ids_with_orders_assigned
              
        else:
            print("Failed to retrieve assigned orders from Vehicle Status API.")
            return None, None

    def start_menu(self):
        while True:
            all_ids, ids_with_orders = self.update_vehicles()
            if all_ids is None and ids_with_orders is None:
                print("Fatal error fetching vehicle info.")
                break

            print("\nMenu:")
            print("1. Start a Vehicle")
            print("2. Stop a Vehicle")
            print("3. Get Vehicle Location")
            print("4. Refresh")
            print("5. EXIT")
            choice = input("Enter your choice: ")

            if choice in ['1', '2', '3']:
                vehicle_id = input("Enter Vehicle ID: ")
                if vehicle_id in all_ids:
                    if choice == '1':
                        if vehicle_id in ids_with_orders:
                            self.test_console.start_vehicle(self.vehicles[vehicle_id])
                        else:
                            print(f"\nVehicle {vehicle_id} does not have an order and route assigned.")
                    elif choice == '2':
                        if vehicle_id in ids_with_orders:
                            self.test_console.stop_vehicle(self.vehicles[vehicle_id])
                        else:
                            print("\nVehicle with ID: "+vehicle_id+" is idle. Unable to stop.")
                    elif choice == '3':
                        self.test_console.get_location(vehicle_id)
                else:
                    print("Vehicle ID not found. Please try again.")
            elif choice == '4':
                continue
            elif choice == '5':
                print("Exiting...")
                break
            else:
                print("Invalid choice. Please try again.")

def parse_route_data(route_data):
    overview_polyline = route_data['routes'][0]['overview_polyline']
    if overview_polyline:
        overview_polyline_str = overview_polyline['points']
        decoded_polyline = polyline.decode(overview_polyline_str)
        return decoded_polyline
    else:
        print("Overview polyline not found in route data.")
        return []

if __name__ == "__main__":
    vehicle_status_api_url = "https://team-22.supply.seuswe.rocks/api/assignedorders"
    vsim = VSIM(vehicle_status_api_url)
    vsim.start_menu()
