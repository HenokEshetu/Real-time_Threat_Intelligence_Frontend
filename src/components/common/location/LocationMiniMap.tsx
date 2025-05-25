import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
  useMap,
  Circle,
  FeatureGroup,
  GeoJSON,
} from 'react-leaflet';
// @ts-ignore
import L from 'leaflet';
// @ts-ignore
import 'leaflet/dist/leaflet.css';
import html2canvas from 'html2canvas';
import './map-icons.css'; // We'll create this file for custom icons

// Define the type for marker data
interface MarkerData {
  position: [number, number];
  content: string;
  type?: 'default' | 'important' | 'warning' | 'info';
  radius?: number; // For optional circle radius around marker
}

interface LocationMiniMapProps {
  markers?: MarkerData[];
  zoom?: number;
  withExport?: boolean;
  width?: string;
  height?: string;
  darkMode?: boolean;
  withSearch?: boolean;
  withFullscreen?: boolean;
  withClustering?: boolean;
  mapStyle?: 'standard' | 'satellite' | 'dark' | 'light' | 'terrain';
  geoJsonOverlay?: {
    data: any;
    style?: (feature: any) => any;
  };
  onMapReady?: (map: any) => void; // Add optional onMapReady callback to expose map instance if needed
}

// Define custom marker icons
const createCustomIcon = (type: string, darkMode: boolean) => {
  const iconColor = {
    default: darkMode ? '#4cc9f0' : '#4361ee',
    important: darkMode ? '#f72585' : '#e63946',
    warning: darkMode ? '#ffd166' : '#ff9e00',
    info: darkMode ? '#06d6a0' : '#06d6a0',
  };
  return L.divIcon({
    className: `custom-marker ${type}-marker`,
    html: `<div style="background-color: ${iconColor[type]}"></div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

// Map Control Components
const LocateControl = () => {
  const map = useMap();

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  return (
    <div
      className="leaflet-control-locate leaflet-bar leaflet-control"
      onClick={handleLocate}
    >
      <a
        href="#"
        title="Find my location"
        role="button"
        aria-label="Find my location"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="8"></circle>
          <circle cx="12" cy="12" r="3"></circle>
          <line x1="12" y1="2" x2="12" y2="4"></line>
          <line x1="12" y1="20" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="4" y2="12"></line>
          <line x1="20" y1="12" x2="22" y2="12"></line>
        </svg>
      </a>
    </div>
  );
};

const FullscreenControl = () => {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const container = map.getContainer();
    if (!isFullscreen) {
      container.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className="leaflet-control-fullscreen leaflet-bar leaflet-control"
      onClick={toggleFullscreen}
    >
      <a
        href="#"
        title="Toggle fullscreen"
        role="button"
        aria-label="Toggle fullscreen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isFullscreen ? (
            <>
              <polyline points="4 14 10 14 10 20"></polyline>
              <polyline points="20 10 14 10 14 4"></polyline>
              <line x1="14" y1="10" x2="21" y2="3"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </>
          ) : (
            <>
              <polyline points="15 3 21 3 21 9"></polyline>
              <polyline points="9 21 3 21 3 15"></polyline>
              <line x1="21" y1="3" x2="14" y2="10"></line>
              <line x1="3" y1="21" x2="10" y2="14"></line>
            </>
          )}
        </svg>
      </a>
    </div>
  );
};

const SearchControl = ({ markers }: { markers: MarkerData[] }) => {
  const map = useMap();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<MarkerData[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 1) {
      const results = markers
        .filter((marker) => marker.content.toLowerCase().includes(query))
        .slice(0, 5);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const goToLocation = (position: [number, number]) => {
    map.flyTo(position, 16, {
      animate: true,
      duration: 1.5,
    });
    setSearchResults([]);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="leaflet-control-search leaflet-bar leaflet-control">
      {isSearchOpen ? (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={handleSearch}
            autoFocus
          />
          <button onClick={() => setIsSearchOpen(false)}>×</button>

          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((result, index) => (
                <li key={index} onClick={() => goToLocation(result.position)}>
                  {result.content}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <a
          href="#"
          title="Search locations"
          onClick={() => setIsSearchOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </a>
      )}
    </div>
  );
};

// Main component
const LocationMiniMap = forwardRef<any, LocationMiniMapProps>(
  (
    {
      markers = [
        {
          position: [51.505, -0.09],
          content: 'A sample location',
          type: 'default',
        },
      ],
      zoom = 13,
      withExport = true,
      width = '100%',
      height = '400px',
      darkMode = false,
      withSearch = true,
      withFullscreen = true,
      withClustering = false,
      mapStyle = 'standard',
      geoJsonOverlay,
      onMapReady,
    },
    ref,
  ) => {
    const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
    const [activeMarker, setActiveMarker] = useState<number | null>(null);
    const mapRef = useRef<any>(null);

    // Get tile layer URL based on selected style
    const getTileLayer = () => {
      switch (mapStyle) {
        case 'satellite':
          return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        case 'dark':
          return 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        case 'light':
          return 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
        case 'terrain':
          return 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
        default:
          return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      }
    };

    // Get attribution based on selected style
    const getAttribution = () => {
      switch (mapStyle) {
        case 'satellite':
          return 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community';
        case 'dark':
        case 'light':
          return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
        case 'terrain':
          return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>';
        default:
          return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
      }
    };

    // Function to handle exporting the map as an image
    const handleExportMap = (format: 'png' | 'jpeg') => {
      if (mapRef.current) {
        const mapElement = mapRef.current.getContainer();
        html2canvas(mapElement).then((canvas) => {
          const link = document.createElement('a');
          link.download = `map_export_${new Date()
            .toISOString()
            .slice(0, 10)}.${format}`;
          link.href = canvas.toDataURL(`image/${format}`);
          link.click();
        });
      }
    };

    // Animation effect when flying to a marker
    const flyToMarker = (index: number) => {
      if (mapRef.current && markers[index]) {
        const map = mapRef.current;
        map.flyTo(markers[index].position, zoom + 2, {
          animate: true,
          duration: 1,
        });
        setActiveMarker(index);
      }
    };

    // Expose flyTo method via ref for parent control
    useImperativeHandle(ref, () => ({
      flyTo: (position: [number, number], zoomLevel?: number) => {
        if (mapRef.current) {
          mapRef.current.flyTo(position, zoomLevel || zoom + 2, {
            animate: true,
            duration: 1,
          });
        }
      },
      getMap: () => mapRef.current,
    }));

    // Call onMapReady if provided
    useEffect(() => {
      if (onMapReady && mapRef.current) {
        onMapReady(mapRef.current);
      }
    }, [onMapReady]);

    return (
      <div style={{ position: 'relative', width, height }}>
        <MapContainer
          // @ts-ignore
          center={markers[0].position}
          // @ts-ignore
          zoom={zoom}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '12px',
            boxShadow: darkMode
              ? '0 8px 30px rgba(0, 0, 0, 0.3)'
              : '0 8px 30px rgba(0, 0, 0, 0.1)',
            backgroundColor: darkMode ? '#242424' : '#f8f9fa',
          }}
          ref={mapRef}
          zoomControl={false}
          className={darkMode ? 'dark-theme-map' : ''}
        >
          <TileLayer
            // @ts-ignore
            url={getTileLayer()}
            // @ts-ignore
            attribution={getAttribution()}
          />

          <ZoomControl position="bottomright" />
          {withFullscreen && <FullscreenControl />}
          {withSearch && <SearchControl markers={markers} />}
          <LocateControl />

          {/* GeoJSON overlay for country highlighting */}
          {geoJsonOverlay && geoJsonOverlay.data && (
            <GeoJSON data={geoJsonOverlay.data} style={geoJsonOverlay.style} />
          )}

          {markers.map((marker, index) => (
            <React.Fragment key={index}>
              <Marker
                // @ts-ignore
                position={marker.position}
                // @ts-ignore
                icon={createCustomIcon(marker.type || 'default', darkMode)}
                eventHandlers={{
                  mouseover: () => setHoveredMarker(index),
                  mouseout: () => setHoveredMarker(null),
                  click: () => flyToMarker(index),
                }}
              >
                <Popup
                  // @ts-ignore
                  popupClassName={darkMode ? 'dark-popup' : ''}
                >
                  <div className="popup-content">
                    <h3>{marker.content}</h3>
                    <p>Latitude: {marker.position[0].toFixed(4)}</p>
                    <p>Longitude: {marker.position[1].toFixed(4)}</p>
                  </div>
                </Popup>
              </Marker>

              {marker.radius && (
                <Circle
                  // @ts-ignore
                  center={marker.position}
                  // @ts-ignore
                  radius={marker.radius}
                  pathOptions={{
                    color:
                      marker.type === 'warning'
                        ? '#ff9e00'
                        : marker.type === 'important'
                        ? '#e63946'
                        : marker.type === 'info'
                        ? '#06d6a0'
                        : '#4361ee',
                    fillOpacity: 0.2,
                    weight: 1,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className={`map-legend ${darkMode ? 'dark' : ''}`}>
          <h4>Map Legend</h4>
          <div className="legend-item">
            <span className="legend-icon default"></span>
            <span>Default Location</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon important"></span>
            <span>Important Location</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon warning"></span>
            <span>Warning Zone</span>
          </div>
          <div className="legend-item">
            <span className="legend-icon info"></span>
            <span>Information Point</span>
          </div>
        </div>

        {/* Map Style Switcher */}
        <div className={`map-style-switcher ${darkMode ? 'dark' : ''}`}>
          <select
            onChange={(e) => {
              // This would need to be implemented with state in a real application
              console.log(`Style changed to: ${e.target.value}`);
            }}
            defaultValue={mapStyle}
          >
            <option value="standard">Standard</option>
            <option value="satellite">Satellite</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="terrain">Terrain</option>
          </select>
        </div>

        {/* Location List */}
        <div className={`location-list ${darkMode ? 'dark' : ''}`}>
          <h4>Locations</h4>
          <ul>
            {markers.map((marker, index) => (
              <li
                key={index}
                className={activeMarker === index ? 'active' : ''}
                onClick={() => flyToMarker(index)}
              >
                {marker.content}
              </li>
            ))}
          </ul>
        </div>

        {withExport && (
          <div className={`export-controls ${darkMode ? 'dark' : ''}`}>
            <button
              onClick={() => handleExportMap('png')}
              className="export-button png"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export PNG
            </button>
            <button
              onClick={() => handleExportMap('jpeg')}
              className="export-button jpeg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export JPEG
            </button>
          </div>
        )}

        {/* Create CSS for the map */}
        <style>{`
        /* Custom CSS for map components */
        .dark-theme-map {
          filter: brightness(0.9);
        }
        
        .popup-content {
          padding: 10px;
          font-family: 'Inter', sans-serif;
        }
        
        .popup-content h3 {
          margin: 0 0 10px;
          font-size: 16px;
          font-weight: 600;
          color: ${darkMode ? '#f8f9fa' : '#333'};
        }
        
        .popup-content p {
          margin: 4px 0;
          font-size: 14px;
          color: ${darkMode ? '#ccc' : '#666'};
        }
        
        .dark-popup .leaflet-popup-content-wrapper {
          background-color: #2d3748;
          color: #f8f9fa;
        }
        
        .dark-popup .leaflet-popup-tip {
          background-color: #2d3748;
        }
        
        .map-legend {
          position: absolute;
          bottom: 20px;
          left: 10px;
          background-color: ${
            darkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)'
          };
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          max-width: 200px;
          border: 1px solid ${darkMode ? '#4a5568' : '#e2e8f0'};
        }
        
        .map-legend.dark {
          color: #f8f9fa;
        }
        
        .map-legend h4 {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .legend-item {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }
        
        .legend-icon {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-right: 8px;
        }
        
        .legend-icon.default {
          background-color: ${darkMode ? '#4cc9f0' : '#4361ee'};
        }
        
        .legend-icon.important {
          background-color: ${darkMode ? '#f72585' : '#e63946'};
        }
        
        .legend-icon.warning {
          background-color: ${darkMode ? '#ffd166' : '#ff9e00'};
        }
        
        .legend-icon.info {
          background-color: #06d6a0;
        }
        
        .map-style-switcher {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 1000;
        }
        
        .map-style-switcher select {
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid ${darkMode ? '#4a5568' : '#e2e8f0'};
          background-color: ${darkMode ? '#2d3748' : 'white'};
          color: ${darkMode ? '#f8f9fa' : '#333'};
          font-size: 14px;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        
        .location-list {
          position: absolute;
          top: 10px;
          right: ${withExport ? '180px' : '10px'};
          background-color: ${
            darkMode ? 'rgba(45, 55, 72, 0.9)' : 'rgba(255, 255, 255, 0.9)'
          };
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          max-width: 200px;
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid ${darkMode ? '#4a5568' : '#e2e8f0'};
        }
        
        .location-list.dark {
          color: #f8f9fa;
        }
        
        .location-list h4 {
          margin: 0 0 8px;
          font-size: 14px;
          font-weight: 600;
        }
        
        .location-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .location-list li {
          padding: 6px 10px;
          border-radius: 4px;
          margin-bottom: 4px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .location-list li:hover {
          background-color: ${darkMode ? '#4a5568' : '#e2e8f0'};
        }
        
        .location-list li.active {
          background-color: ${darkMode ? '#4cc9f0' : '#4361ee'};
          color: white;
        }
        
        .export-controls {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 1000;
        }
        
        .export-button {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: 4px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          gap: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          color: white;
        }
        
        .export-button.png {
          background-color: ${darkMode ? '#4cc9f0' : '#4361ee'};
        }
        
        .export-button.jpeg {
          background-color: ${darkMode ? '#f72585' : '#7209b7'};
        }
        
        .export-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        
        .export-button:active {
          transform: translateY(0);
        }
        
        .leaflet-control-locate,
        .leaflet-control-fullscreen,
        .leaflet-control-search {
          background-color: white;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .leaflet-control-locate a,
        .leaflet-control-fullscreen a,
        .leaflet-control-search a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
        }
        
        .search-container {
          position: absolute;
          top: 0;
          left: 0;
          background: white;
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          width: 250px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        
        .search-container input {
          padding: 8px 12px;
          border: none;
          border-bottom: 1px solid #e2e8f0;
          font-size: 14px;
        }
        
        .search-container button {
          position: absolute;
          right: 8px;
          top: 8px;
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: #666;
        }
        
        .search-results {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 200px;
          overflow-y: auto;
        }
        
        .search-results li {
          padding: 8px 12px;
          border-bottom: 1px solid #e2e8f0;
          cursor: pointer;
          font-size: 14px;
        }
        
        .search-results li:hover {
          background-color: #f7fafc;
        }
      `}</style>
      </div>
    );
  },
);

export default LocationMiniMap;
