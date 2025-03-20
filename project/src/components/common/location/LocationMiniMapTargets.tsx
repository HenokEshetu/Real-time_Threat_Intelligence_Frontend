import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIconUrl from '/src/static/images/leaflet/marker-icon.png'; // ✅ Keep direct import

// Define custom marker icon
const customIcon = new L.Icon({
  iconUrl: markerIconUrl, // ✅ Use the imported URL directly
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Define the component that renders the map and markers
const LocationMiniMapTargets = ({ locations }: { locations: Array<{ lat: number, lng: number, description: string }> }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '400px' }}>
      {/* TileLayer is required for the map background */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Map markers */}
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]} icon={customIcon}>
          <Popup>{location.description}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LocationMiniMapTargets;
