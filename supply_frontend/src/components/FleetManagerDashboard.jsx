import React, { useState, useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const FleetManagerDashboard = () => {
    const [orderData, setOrderData] = useState(null);
    const [weatherData, setWeatherData] = useState(null); // New state for weather data
      const [error, setError] = useState(null);
      const [selectedVehicleId, setSelectedVehicleId] = useState(null);
      const mapRef = useRef(null); 
      const markersRef = useRef([]); 
      const polylinesRef = useRef([]);
      const routeMarkersRef = useRef([]); 
      const selectedMapRef = useRef(null); 
      const selectedMarkersRef = useRef([]); 
      const selectedPolylinesRef = useRef([]); 
      const selectedRouteMarkersRef = useRef([]);

    useEffect(() => {
        fetch('https://team-22.supply.seuswe.rocks/api/orders')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch order data');
                }
                return response.json();
            })
            .then((data) => {
                setOrderData(data);
                setError(null);
            })
            .catch((error) => {
                setError('Failed to fetch order data: ' + error.message);
            });

        const loader = new Loader({
            apiKey: null, //made null for security reasons
            version: "weekly",
            libraries: ["places", "geometry"],
        });

        loader.load().then(() => {
            initMaps();
        });
    }, []);

    const renderTable = () => {
        if (!orderData) return <p>Loading orders...</p>;
        return (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>Address</th>
                            <th>Payment Method</th>
                            <th>Total Amount</th>
                            <th>Payload Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderData.map((order, index) => (
                            <tr key={order._id}>
                                <td>{order.orderId || index + 1}</td>
                                <td>{order.UserName}</td>
                                <td>{order.Address}</td>
                                <td>{order.PaymentMethod}</td>
                                <td>${order.TotalAmount}</td>
                                <td>{order.PayloadType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    useEffect(() => {
        if (selectedVehicleId) {
            const intervalId = setInterval(() => {
                updateSelectedVehicleMap(); 
            }, 3000);

            return () => clearInterval(intervalId);
        }
    }, [selectedVehicleId]); 

    const updateSelectedVehicleMap = () => {
        clearSelectedMap();

        fetch("https://team-22.supply.seuswe.rocks/api/current_location_and_routes")
            .then((response) => response.json())
            .then((data) => {
                const vehicleData = data.find((v) => v.vehicle_id === selectedVehicleId);

                if (vehicleData) {
                    const location = vehicleData.current_location;
                    const routePolylinesData = vehicleData.overview_polyline;

                    if (location && location.coordinates.length === 2) {
                        const marker = new google.maps.Marker({
                            position: { lat: location.coordinates[0], lng: location.coordinates[1] },
                            map: selectedMapRef.current,
                            title: `Vehicle ID: ${selectedVehicleId}`,
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 6,
                                fillColor: "black",
                                fillOpacity: 1,
                                strokeColor: "black",
                                strokeWeight: 2,
                            },
                        });

                        selectedMarkersRef.current.push(marker);

                        if (routePolylinesData && routePolylinesData.points) {
                            const path = google.maps.geometry.encoding.decodePath(routePolylinesData.points);

                            const polyline = new google.maps.Polyline({
                                path,
                                strokeColor: "#0000FF",
                                strokeOpacity: 1,
                                strokeWeight: 7,
                                map: selectedMapRef.current,
                            });

                            selectedPolylinesRef.current.push(polyline);

                            const startMarker = new google.maps.Marker({
                                position: path[0],
                                map: selectedMapRef.current,
                                title: `Starting Point of ${selectedVehicleId}`,
                            });

                            const endMarker = new google.maps.Marker({
                                position: path[path.length - 1],
                                map: selectedMapRef.current,
                                title: `Destination of ${selectedVehicleId}`,
                            });

                            selectedRouteMarkersRef.current.push(startMarker, endMarker);
                        }
                    }
                }
            })
            .catch((error) => {
                console.error("Error fetching vehicle data:", error);
            });
    };

    const initMaps = () => {
        const defaultCoordinates = { lat: 30.2672, lng: -97.7431 };
        const mapOptions = {
            zoom: 13,
            center: defaultCoordinates,
        };

        mapRef.current = new google.maps.Map(document.getElementById("overall-map"), mapOptions);
        initVehicleTracking(mapRef.current);

        selectedMapRef.current = new google.maps.Map(
            document.getElementById("selected-vehicle-map"),
            mapOptions
        );

        const weatherMap = new google.maps.Map(
            document.getElementById("weather-map"),
            mapOptions
        );
        const weatherLayer = new google.maps.ImageMapType({
            getTileUrl: (coord, zoom) => `https://tile.openweathermap.org/maps/2.0/weather/TD2/${13}/${30.2672}/${-97.7431}?appid={abb6615e74648d76b51fc4a22e883459}&fill_bound=true`,
            tileSize: new google.maps.Size(256, 256),
            opacity: 0.6,
            name: 'Weather Overlay',
        });
        weatherMap.overlayMapTypes.insertAt(0, weatherLayer);
    };

    const initVehicleTracking = (map) => {
        const updateVehicleLocationsAndRoutes = () => {
            fetch("https://team-22.supply.seuswe.rocks/api/current_location_and_routes")
                .then((response) => response.json())
                .then((data) => {
                    clearMarkers(); // Clear overall map markers
                    clearPolylines(); // Clear overall map polylines
                    clearRouteMarkers(); // Clear overall map start/end markers

                    data.forEach((vehicleData) => {
                        const location = vehicleData.current_location;
                        const routePolylinesData = vehicleData.overview_polyline;

                        if (location && location.coordinates.length === 2) {
                            const marker = new google.maps.Marker({
                                position: { lat: location.coordinates[0], lng: location.coordinates[1] },
                                map,
                                title: `Vehicle ID: ${vehicleData.vehicle_id}`,
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 6,
                                    fillColor: "black",
                                    fillOpacity: 1,
                                    strokeColor: "black",
                                    strokeWeight: 2,
                                },
                            });

                            markersRef.current.push(marker);

                            marker.addListener('click', () => {
                                setSelectedVehicleId(vehicleData.vehicle_id); // Set the selected vehicle ID
                                zoomToVehicle(vehicleData.vehicle_id); // Zoom to the selected vehicle
                            });
                        }

                        if (routePolylinesData && routePolylinesData.points) {
                            const path = google.maps.geometry.encoding.decodePath(routePolylinesData.points);

                            const polyline = new google.maps.Polyline({
                                path,
                                strokeColor: "#0000FF",
                                strokeOpacity: 1,
                                strokeWeight: 7,
                                map,
                            });

                            polylinesRef.current.push(polyline);

                            const startMarker = new google.maps.Marker({
                                position: path[0],
                                map,
                                title: `Starting Point of ${vehicleData.vehicle_id}`,
                            });

                            const endMarker = new google.maps.Marker({
                                position: path[path.length - 1],
                                map,
                                title: `Destination of ${vehicleData.vehicle_id}`,
                            });

                            routeMarkersRef.current.push(startMarker, endMarker);
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error fetching vehicle data:", error);
                });
        };

        updateVehicleLocationsAndRoutes();
        const intervalId = setInterval(updateVehicleLocationsAndRoutes, 3000);
        return () => clearInterval(intervalId);
    };

const zoomToVehicle = (vehicleId) => {
    clearSelectedMap(); 

    fetch("https://team-22.supply.seuswe.rocks/api/current_location_and_routes")
        .then((response) => response.json())
        .then((data) => {
            const vehicleData = data.find((v) => v.vehicle_id === vehicleId);

            if (vehicleData) {
                const location = vehicleData.current_location;
                const routePolylinesData = vehicleData.overview_polyline;

                if (location && location.coordinates.length === 2) {
                    const marker = new google.maps.Marker({
                        position: { lat: location.coordinates[0], lng: location.coordinates[1] },
                        map: selectedMapRef.current,
                        title: `Vehicle ID: ${vehicleId}`,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 6,
                            fillColor: "black",
                            fillOpacity: 1,
                            strokeColor: "black",
                            strokeWeight: 2,
                        },
                    });

                    selectedMarkersRef.current.push(marker);

                    selectedMapRef.current.setCenter({
                        lat: location.coordinates[0],
                        lng: location.coordinates[1],
                    });

                    selectedMapRef.current.setZoom(15);

                    if (routePolylinesData && routePolylinesData.points) {
                        const path = google.maps.geometry.encoding.decodePath(routePolylinesData.points);

                        const polyline = new google.maps.Polyline({
                            path,
                            strokeColor: "#0000FF",
                            strokeOpacity: 1,
                            strokeWeight: 7,
                            map: selectedMapRef.current,
                        });

                        selectedPolylinesRef.current.push(polyline);

                        const startMarker = new google.maps.Marker({
                            position: path[0],
                            map: selectedMapRef.current,
                            title: `Starting Point of ${vehicleId}`,
                        });

                        const endMarker = new google.maps.Marker({
                            position: path[path.length - 1],
                            map: selectedMapRef.current,
                            title: `Destination of ${vehicleId}`,
                        });

                        selectedRouteMarkersRef.current.push(startMarker, endMarker);
                    }
                }
            }
        })
        .catch((error) => {
            console.error("Error fetching vehicle data:", error);
        });
};


    const clearSelectedMap = () => {
        selectedMarkersRef.current.forEach((marker) => marker.setMap(null));
        selectedMarkersRef.current = [];

        selectedPolylinesRef.current.forEach((polyline) => polyline.setMap(null));
        selectedPolylinesRef.current = [];

        selectedRouteMarkersRef.current.forEach((marker) => marker.setMap(null));
        selectedRouteMarkersRef.current = [];
    };

    const clearMarkers = () => {
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
    };

    const clearPolylines = () => {
        polylinesRef.current.forEach((polyline) => polyline.setMap(null));
        polylinesRef.current = [];
    };

    const clearRouteMarkers = () => {
        routeMarkersRef.current.forEach((marker) => marker.setMap(null));
        routeMarkersRef.current = [];
    };

    return (
        <div className="dashboard">
            <header className="top-bar">
                <h1>Hello Fleet Manager</h1>
                <div className="date-range">
                    Select period:
                    <input type="date" id="start-date" /> to <input type="date" id="end-date" />
                </div>
                <div className="top-bar-buttons">
                    <button id="trip-logs">Trip Logs</button>
                    <button id="maintenance-request">New Maintenance Request</button>
                </div>
                <div className="search-filter">
                    <input type="search" placeholder="Search..." />
                    <button id="filter">Filter</button>
                </div>
            </header>

            <section className="stats">
                <div className="card">
                    <h2>Total Profit</h2>
                    <p>$250,000.00</p>
                </div>
                <div className="card">
                    <h2>Fuel Efficiency</h2>
                    <p>84.2%</p>
                </div>
                <div className="card">
                    <h2>Average Delivery Time</h2>
                    <p>00:02:24:37</p>
                </div>
                <div class="card">
                    <h2>Number of Completed Trips</h2>
                    <p>29</p>
                </div>
            </section>
            <section className="weather-map-container">
                <div className="map-title">Weather Map</div>
                <div id="weather-map" style={{ height: '300px' }}></div>
            </section>

            <section className="map-views">
                <div className="map-container">
                    <div className="map-title">Selected Vehicle</div>
                    <div id="selected-vehicle-map" style={{ height: '300px' }}></div>
                </div>
                <div className="map-container">
                    <div className="map-title">Overall Map View</div>
                    <div id="overall-map" style={{ height: '300px' }}></div>
                </div>
            </section>
            <section>
                <h2>Orders Overview</h2>
                {renderTable()}
            </section>
            
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default FleetManagerDashboard;

