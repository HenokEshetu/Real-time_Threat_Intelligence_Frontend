import React, { useState } from 'react';
import { Box, Paper, Typography, useTheme, Tooltip, Popover } from '@mui/material';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

// Enhanced sample data with more threat intelligence information
const threatData = [
  {
    id: 'US',
    name: 'United States',
    value: 10,
    latitude: 37.0902,
    longitude: -95.7129,
    details: {
      activeCampaigns: 5,
      recentIncidents: 12,
      threatLevel: 'High',
      commonTactics: ['Phishing', 'Ransomware', 'Supply Chain Attacks'],
      activeGroups: ['APT29', 'Lazarus Group'],
    },
  },
  {
    id: 'IN',
    name: 'India',
    value: 7,
    latitude: 20.5937,
    longitude: 78.9629,
    details: {
      activeCampaigns: 3,
      recentIncidents: 8,
      threatLevel: 'Medium',
      commonTactics: ['Social Engineering', 'Malware Distribution'],
      activeGroups: ['APT41', 'Sidewinder'],
    },
  },
  {
    id: 'CN',
    name: 'China',
    value: 15,
    latitude: 35.8617,
    longitude: 104.1954,
    details: {
      activeCampaigns: 8,
      recentIncidents: 15,
      threatLevel: 'High',
      commonTactics: ['Data Exfiltration', 'Advanced Persistent Threats'],
      activeGroups: ['APT10', 'Bronze Butler'],
    },
  },
  {
    id: 'BR',
    name: 'Brazil',
    value: 5,
    latitude: -14.235,
    longitude: -51.9253,
    details: {
      activeCampaigns: 2,
      recentIncidents: 6,
      threatLevel: 'Medium',
      commonTactics: ['Banking Trojans', 'Credential Theft'],
      activeGroups: ['Guildma', 'TeaBot'],
    },
  },
  {
    id: 'FR',
    name: 'France',
    value: 8,
    latitude: 46.2276,
    longitude: 2.2137,
    details: {
      activeCampaigns: 4,
      recentIncidents: 9,
      threatLevel: 'Medium',
      commonTactics: ['Spear Phishing', 'Zero-day Exploits'],
      activeGroups: ['Sandworm', 'FIN7'],
    },
  },
];

const ThreatDetails = ({ threat }: { threat: any }) => (
  <Box sx={{ p: 2, maxWidth: 300 }}>
    <Typography variant="h6" gutterBottom>
      {threat.name}
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      Threat Level: <span style={{ color: threat.details.threatLevel === 'High' ? '#ff4444' : '#ff9800' }}>
        {threat.details.threatLevel}
      </span>
    </Typography>
    <Typography variant="body2" gutterBottom>
      Active Campaigns: {threat.details.activeCampaigns}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Recent Incidents: {threat.details.recentIncidents}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Common Tactics:
    </Typography>
    <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
      {threat.details.commonTactics.map((tactic: any, index: number) => (
        <li key={index}>
          <Typography variant="body2">{tactic}</Typography>
        </li>
      ))}
    </ul>
    <Typography variant="body2" gutterBottom>
      Active Groups:
    </Typography>
    <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
      {threat.details.activeGroups.map((group: any, index: number) => (
        <li key={index}>
          <Typography variant="body2">{group}</Typography>
        </li>
      ))}
    </ul>
  </Box>
);

const GeographicalMap = () => {
  const theme = useTheme();
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  // Updated event type to SVGElement
  const handleMarkerClick = (event: React.MouseEvent<SVGElement, MouseEvent>, threat: any) => {
    setSelectedThreat(threat);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedThreat(null);
  };

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
  };

  const handleMoveEnd = (position: { coordinates: [number, number]; zoom: number }) => {
    setPosition(position);
  };

  return (
    <Paper sx={{ p: 3, height: 500 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Global Threat Intelligence Map</Typography>
        <Box>
          <button onClick={handleZoomIn} style={{ marginRight: '8px' }}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </Box>
      </Box>
      <Box sx={{ height: 400, position: 'relative' }}>
        <ComposableMap
          projection="geoMercator"
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates as [number, number]}
            onMoveEnd={handleMoveEnd}
          >
            <Geographies geography="/src/data/world-geojson.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                    style={{
                      default: {
                        fill: '#EAEAEC',
                        stroke: '#D6D6DA',
                        strokeWidth: 0.75,
                        outline: 'none',
                      },
                      hover: {
                        fill: '#F5F5F5',
                        stroke: '#D6D6DA',
                        strokeWidth: 1,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#E6E6E6',
                        stroke: '#D6D6DA',
                        strokeWidth: 1,
                        outline: 'none',
                      },
                    }}
                  />
                ))
              }
            </Geographies>
            {threatData.map((threat) => (
              <Marker
                key={threat.id}
                coordinates={[threat.longitude, threat.latitude]}
                onClick={(e) => handleMarkerClick(e, threat)}
              >
                <circle
                  r={Math.sqrt(threat.value) * 3}
                  fill={threat.details.threatLevel === 'High' ? theme.palette.error.main : theme.palette.warning.main}
                  stroke="#FFF"
                  strokeWidth={1}
                  style={{ cursor: 'pointer' }}
                />
                <text
                  textAnchor="middle"
                  y={-Math.sqrt(threat.value) * 3 - 5}
                  style={{ 
                    fill: '#333',
                    fontSize: 10,
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {threat.id}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedThreat && <ThreatDetails threat={selectedThreat} />}
      </Popover>
    </Paper>
  );
};

export default GeographicalMap;
