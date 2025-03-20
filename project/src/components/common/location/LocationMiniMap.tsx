import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import the Leaflet CSS

const LocationMiniMap = () => {
  const position: [number, number] = [51.505, -0.09]; // Example coordinates

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      style={{ width: '100%', height: '400px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A sample location
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LocationMiniMap;
