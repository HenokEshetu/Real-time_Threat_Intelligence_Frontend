import React, { useState } from 'react';
import { Box, Paper, Typography, useTheme, Popover, Button } from '@mui/material';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

interface ThreatDetailsProps {
  threat: any;
}

const ThreatDetails: React.FC<ThreatDetailsProps> = ({ threat }) => (
  <Box sx={{ p: 2, maxWidth: 300 }}>
    <Typography variant="h6" gutterBottom>
      {threat.name}
    </Typography>
    <Typography variant="body2" color="text.secondary" gutterBottom>
      Threat Level: 
      <span style={{ color: threat?.details?.threatLevel === 'High' ? '#ff4444' : '#ff9800' }}>
        {threat?.details?.threatLevel || 'Unknown'}
      </span>
    </Typography>
    <Typography variant="body2" gutterBottom>
      Active Campaigns: {threat?.details?.activeCampaigns || 'N/A'}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Recent Incidents: {threat?.details?.recentIncidents || 'N/A'}
    </Typography>
    <Typography variant="body2" gutterBottom>
      Common Tactics:
    </Typography>
    <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
      {threat?.details?.commonTactics?.map((tactic: string, index: number) => (
        <li key={index}>
          <Typography variant="body2">{tactic}</Typography>
        </li>
      )) || <li>No tactics available</li>}
    </ul>
    <Typography variant="body2" gutterBottom>
      Active Groups:
    </Typography>
    <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
      {threat?.details?.activeGroups?.map((group: string, index: number) => (
        <li key={index}>
          <Typography variant="body2">{group}</Typography>
        </li>
      )) || <li>No active groups</li>}
    </ul>
  </Box>
);

interface GeographicalMapProps {
  data: any[];
}

const GeographicalMap: React.FC<GeographicalMapProps> = ({ data }) => {
  const theme = useTheme();
  const [selectedThreat, setSelectedThreat] = useState<any>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleMarkerClick = (event: React.MouseEvent<SVGElement>, threat: any) => {
    setSelectedThreat(threat);
    // Cast event.currentTarget to SVGElement
    setAnchorEl(event.currentTarget as unknown as HTMLElement); // Alternatively, cast to SVGElement if you don't need HTMLElement-specific properties
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
          <Button onClick={handleZoomIn} variant="outlined" size="small" sx={{ marginRight: '8px' }}>+</Button>
          <Button onClick={handleZoomOut} variant="outlined" size="small">-</Button>
        </Box>
      </Box>
      <Box sx={{ height: 400, position: 'relative' }}>
        <ComposableMap projection="geoMercator" style={{ width: '100%', height: '100%' }}>
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
            {data.map((threat) => (
              <Marker
                key={threat.id}
                coordinates={[threat.longitude, threat.latitude]}
                onClick={(e) => handleMarkerClick(e, threat)}
              >
                <circle
                  r={Math.sqrt(threat.value) * 3}
                  fill={threat?.details?.threatLevel === 'High' ? theme.palette.error.main : theme.palette.warning.main}
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
