import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import the Leaflet CSS
import html2canvas from 'html2canvas'; // For exporting the map as an image

// Define the type for marker data
interface MarkerData {
  position: [number, number];
  content: string;
}

interface LocationMiniMapProps {
  markers?: MarkerData[];
  zoom?: number;
  withExport?: boolean;
  width?: string;
  height?: string;
}

const LocationMiniMap: React.FC<LocationMiniMapProps> = ({
  markers = [{ position: [51.505, -0.09], content: 'A sample location' }],
  zoom = 13,
  withExport = true,
  width = '100%',
  height = '400px',
}) => {
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const mapRef = useRef<any>(null);

  // Function to handle exporting the map as an image
  const handleExportMap = (format: 'png' | 'jpeg') => {
    if (mapRef.current) {
      const mapElement = mapRef.current.getContainer();
      html2canvas(mapElement).then((canvas) => {
        const link = document.createElement('a');
        link.download = `map_export.${format}`;
        link.href = canvas.toDataURL(`image/${format}`);
        link.click();
      });
    }
  };

  return (
    <div style={{ position: 'relative', width, height }}>
      <MapContainer
        center={markers[0].position} // Center the map on the first marker
        zoom={zoom}
        style={{ width: '100%', height: '100%', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            eventHandlers={{
              mouseover: () => setHoveredMarker(index),
              mouseout: () => setHoveredMarker(null),
            }}
          >
            <Popup>
              <div style={{ padding: '8px', fontFamily: 'Poppins, Arial, sans-serif' }}>
                <h3 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 'bold' }}>
                  Location {index + 1}
                </h3>
                <p style={{ margin: '0', fontSize: '14px' }}>{marker.content}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {withExport && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            display: 'flex',
            gap: '10px',
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => handleExportMap('png')}
            style={{
              backgroundColor: '#4361ee',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#3a0ca3';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#4361ee';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }}
          >
            Export PNG
          </button>
          <button
            onClick={() => handleExportMap('jpeg')}
            style={{
              backgroundColor: '#7209b7',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#560bad';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#7209b7';
              e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }}
          >
            Export JPEG
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationMiniMap;