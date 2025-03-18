import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

// Sample data for countries and their threat levels
const sampleData = [
  { id: 'US', value: 10, latitude: 37.0902, longitude: -95.7129 }, // United States
  { id: 'IN', value: 7, latitude: 20.5937, longitude: 78.9629 }, // India
  { id: 'CN', value: 15, latitude: 35.8617, longitude: 104.1954 }, // China
  { id: 'BR', value: 5, latitude: -14.235, longitude: -51.9253 }, // Brazil
  { id: 'FR', value: 8, latitude: 46.2276, longitude: 2.2137 }, // France
];

// GeographicalMap Component
const GeographicalMap = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ p: 3, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Threat Distribution by Country
      </Typography>
      <Box sx={{ height: 350 }}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
          }}
        >
          {/* Load the GeoJSON data */}
          <Geographies geography="/src/data/world-geojson.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {/* Add markers for each country */}
          {sampleData.map(({ id, value, latitude, longitude }) => (
            <Marker key={id} coordinates={[longitude, latitude]}>
              <circle
                r={Math.sqrt(value) * 2} // Adjust size based on value
                fill={theme.palette.primary.main} // Use theme color
                stroke="#FFF"
                strokeWidth={1}
              />
              <text
                textAnchor="middle"
                y={-Math.sqrt(value) * 2 - 5} // Adjust label position
                style={{ fill: '#333', fontSize: 10 }}
              >
                {id}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </Box>
    </Paper>
  );
};

export default GeographicalMap;