import React from 'react';
import { useParams, Link } from 'react-router-dom';
import LocationMiniMap from '../../components/common/location/LocationMiniMap';

// Mock region and country data (should match schema)
const mockRegions = [
  {
    id: 'region-europe',
    name: 'Europe',
    latitude: 54.5260,
    longitude: 15.2551,
    countryCodes: ['FRA', 'DEU', 'ITA', 'ESP', 'GBR', 'POL', 'NLD', 'BEL', 'CHE', 'AUT'],
    description: 'Europe is a continent located entirely in the Northern Hemisphere and mostly in the Eastern Hemisphere.',
    type: 'REGION',
    region: 'Europe',
    // ...other fields from schema as needed
  },
  {
    id: 'region-asia',
    name: 'Asia',
    latitude: 34.0479,
    longitude: 100.6197,
    countryCodes: ['CHN', 'JPN', 'KOR', 'IND', 'THA', 'VNM', 'IDN', 'PHL', 'SGP'],
    description: 'Asia is Earth\'s largest and most populous continent.',
    type: 'REGION',
    region: 'Asia',
    // ...other fields from schema as needed
  },
];

const mockCountries = [
  { name: 'France', code: 'FRA', lat: 46.6034, lon: 1.8883 },
  { name: 'Germany', code: 'DEU', lat: 51.1657, lon: 10.4515 },
  { name: 'Italy', code: 'ITA', lat: 41.8719, lon: 12.5674 },
  { name: 'Spain', code: 'ESP', lat: 40.4637, lon: -3.7492 },
  { name: 'United Kingdom', code: 'GBR', lat: 55.3781, lon: -3.4360 },
  { name: 'Poland', code: 'POL', lat: 51.9194, lon: 19.1451 },
  { name: 'Netherlands', code: 'NLD', lat: 52.1326, lon: 5.2913 },
  { name: 'Belgium', code: 'BEL', lat: 50.5039, lon: 4.4699 },
  { name: 'Switzerland', code: 'CHE', lat: 46.8182, lon: 8.2275 },
  { name: 'Austria', code: 'AUT', lat: 47.5162, lon: 14.5501 },
  // ...add more as needed
];

export default function RegionDetail() {
  const { regionName } = useParams<{ regionName: string }>();
  const region = mockRegions.find(r => r.name.toLowerCase() === (regionName || '').toLowerCase());

  if (!region) {
    return <div className="p-8 text-center text-red-600">Region not found.</div>;
  }

  // Find country markers for this region
  const countryMarkers = mockCountries
    .filter(c => region.countryCodes.includes(c.code))
    .map(c => ({
      id: c.code,
      position: [c.lat, c.lon] as [number, number],
      label: c.name,
      type: 'important' as 'important',
    }));

  // Add region marker (center)
  const regionMarker = {
    id: region.id,
    position: [region.latitude, region.longitude] as [number, number],
    label: region.name,
    type: 'default' as 'default',
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Link to="/location/regions" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Regions</Link>
      <h1 className="text-3xl font-bold mb-2">{region.name}</h1>
      <div className="text-zinc-500 mb-4">{region.description}</div>
      <LocationMiniMap
        markers={[regionMarker, ...countryMarkers]}
        zoom={4}
        width="100%"
        height="400px"
        withExport={false}
        darkMode={false}
      />
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Countries in this region:</h2>
        <div className="flex flex-wrap gap-2">
          {countryMarkers.map((m, i) => (
            <span key={i} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-mono">{m.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
