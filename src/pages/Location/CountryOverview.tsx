import React from 'react';
import LocationMiniMap from '@/components/common/location/LocationMiniMap';
import countries from './countries.json';

// Helper to find country feature by ISO3 code
function getCountryFeature(iso3: string) {
  return (countries as any).features.find(
    (f: any) => f.properties.ISO3 === iso3
  );
}

// Helper to get centroid for a country (fallback to [20,0])
function getCountryCentroid(feature: any): [number, number] {
  if (!feature) return [20, 0];
  // Try to use LAT/LON properties, else fallback to geometry centroid
  if (feature.properties.LAT && feature.properties.LON) {
    return [feature.properties.LAT, feature.properties.LON];
  }
  // Try to compute centroid from geometry (very basic for polygons)
  const coords = feature.geometry?.coordinates;
  if (feature.geometry?.type === 'Polygon' && coords?.length) {
    const poly = coords[0];
    const lats = poly.map((c: any) => c[1]);
    const lons = poly.map((c: any) => c[0]);
    return [
      lats.reduce((a: number, b: number) => a + b, 0) / lats.length,
      lons.reduce((a: number, b: number) => a + b, 0) / lons.length,
    ];
  }
  return [20, 0];
}

// Helper to get GeoJSON for a single country
function getCountryGeoJson(feature: any) {
  if (!feature) return null;
  return {
    type: "FeatureCollection",
    features: [feature],
  };
}

// Highlight style for selected country
const highlightStyle = {
  color: '#00bfff',
  weight: 2,
  fillColor: '#00bfff',
  fillOpacity: 0.4,
};

export default function CountryOverview({ countryISO3 = 'USA' }: { countryISO3?: string }) {
  const feature = getCountryFeature(countryISO3);
  const center = getCountryCentroid(feature);
  const geoJson = feature
    ? {
        type: "FeatureCollection",
        features: [feature],
      }
    : null;

  // Prepare marker for the country
  const markers = feature
    ? [{
        id: feature.properties.ISO3,
        position: center,
        label: feature.properties.NAME,
        type: 'default' as const, // Fix: use string literal type
      }]
    : [];

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      {/* Left: Map */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-2 text-xs text-zinc-400">
          MINI MAP (Lat. {center[0]}, Long. {center[1]})
        </div>
        {/* Responsive map container with aspect ratio */}
        <div className="relative w-full" style={{ aspectRatio: '3/2', minHeight: 320 }}>
          <div className="absolute inset-0 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <LocationMiniMap
              markers={markers}
              zoom={4}
              width="100%"
              height="100%"
              darkMode={true}
              withExport={false}
              withSearch={false}
              withFullscreen={false}
              geoJson={geoJson}
              geoJsonStyle={highlightStyle}
              // Enable zoom and pan controls
              scrollWheelZoom={true}
              dragging={true}
              doubleClickZoom={true}
              zoomControl={true}
            />
          </div>
        </div>
      </div>
      {/* Right: Basic Information */}
      <div className="w-[480px] p-6 border-l border-zinc-800 flex flex-col gap-4">
        <div className="text-sm text-zinc-400">BASIC INFORMATION</div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold">Country</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{countryISO3}</div>
          </div>
          <div>
            <span className="font-semibold">Marking</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">TLP:CLEAR</div>
          </div>
          <div>
            <span className="font-semibold">Author</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">*** REDACTED ***</div>
          </div>
          <div>
            <span className="font-semibold">Reliability</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">Unknown</div>
          </div>
          <div>
            <span className="font-semibold">Confidence level</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-green-900 text-xs">1 - Confirmed b...</div>
          </div>
          <div>
            <span className="font-semibold">Processing status</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">DISABLED</div>
          </div>
          <div>
            <span className="font-semibold">Revoked</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">NO</div>
          </div>
          <div>
            <span className="font-semibold">Platform creation date</span>
            <div className="ml-2 text-xs">October 18, 2023 at 2:33:20 AM</div>
          </div>
          <div>
            <span className="font-semibold">Creators</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">*** REDACTED ***</div>
          </div>
          <div>
            <span className="font-semibold">Standard STIX ID</span>
            <div className="ml-2 text-xs break-all">location--country--{countryISO3.toLowerCase()}</div>
          </div>
          <div>
            <span className="font-semibold">Original creation date</span>
            <div className="ml-2 text-xs">August 22, 2023 at 2:01:44 PM</div>
          </div>
          <div>
            <span className="font-semibold">Modification date</span>
            <div className="ml-2 text-xs">October 18, 2023 at 2:33:20 AM</div>
          </div>
        </div>
      </div>
    </div>
  );
}
