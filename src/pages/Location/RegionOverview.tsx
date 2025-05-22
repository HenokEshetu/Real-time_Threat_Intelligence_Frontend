import React, { useRef } from 'react';
import { useParams } from 'react-router-dom'; // <-- add this
import LocationMiniMap from '@/components/common/location/LocationMiniMap';
import countries from './countries.json';

const regionData: Record<string, { name: string; coordinates: [number, number]; iso3: string[] }> = {
  Africa: { name: 'Africa', coordinates: [11.5, 17.7], iso3: ["DZA", "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CPV", "CAF", "TCD", "COM", "COG", "COD", "DJI", "EGY", "GNQ", "ERI", "SWZ", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB", "CIV", "KEN", "LSO", "LBR", "LBY", "MDG", "MWI", "MLI", "MRT", "MUS", "MAR", "MOZ", "NAM", "NER", "NGA", "RWA", "STP", "SEN", "SYC", "SLE", "SOM", "ZAF", "SSD", "SDN", "TZA", "TGO", "TUN", "UGA", "ZMB", "ZWE"] },
  Americas: { name: 'Americas', coordinates: [13.5, -80], iso3: ["USA", "CAN", "MEX", "ARG", "BOL", "BRA", "CHL", "COL", "ECU", "GUY", "PRY", "PER", "SUR", "URY", "VEN"] },
  Asia: { name: 'Asia', coordinates: [34.0, 100.6], iso3: ["AFG", "BGD", "BTN", "IND", "MDV", "NPL", "PAK", "LKA", "BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "TLS", "VNM", "CHN", "HKG", "JPN", "KOR", "MAC", "MNG", "PRK", "TWN"] },
  Europe: { name: 'Europe', coordinates: [54.5, 15.2], iso3: ["ALB", "AND", "AUT", "BLR", "BEL", "BIH", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "IRL", "ITA", "LVA", "LIE", "LTU", "LUX", "MLT", "MDA", "MCO", "MNE", "NLD", "MKD", "NOR", "POL", "PRT", "ROU", "RUS", "SMR", "SRB", "SVK", "SVN", "ESP", "SWE", "CHE", "UKR", "GBR", "VAT"] },
  // ...other regions as needed...
};

const highlightStyle = {
  color: '#00bfff',
  weight: 2,
  fillColor: '#00bfff',
  fillOpacity: 0.4,
};

export default function RegionOverview() {
  const { regionName } = useParams<{ regionName: string }>(); // <-- get param
  const region = regionData[regionName || 'Africa'] || regionData['Africa'];
  const miniMapRef = useRef<any>(null);

  function geoJsonStyle(feature: any) {
    if (region.iso3.includes(feature.properties.ISO3)) return highlightStyle;
    return { color: '#3b82f6', weight: 1, fillColor: '#22223b', fillOpacity: 0.1 };
  }

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <div className="flex-1 p-6 flex flex-col">
        <div className="mb-2 text-xs text-zinc-400">
          MINI MAP (Lat. {region.coordinates[0]}, Long. {region.coordinates[1]})
        </div>
        <div className="relative w-full" style={{ aspectRatio: '3/2', minHeight: 320 }}>
          <div className="absolute inset-0 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
            <LocationMiniMap
              ref={miniMapRef}
              markers={[{ position: region.coordinates, content: region.name, type: 'important' }]}
              zoom={3}
              width="100%"
              height="100%"
              darkMode={true}
              withExport={false}
              withSearch={false}
              withFullscreen={false}
              geoJsonOverlay={{ data: countries as any, style: geoJsonStyle }}
            />
          </div>
        </div>
      </div>
      <div className="w-[400px] p-6 border-l border-zinc-800 flex flex-col gap-4">
        <div className="text-sm text-zinc-400">BASIC INFORMATION</div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold">Region</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{region.name}</div>
          </div>
          {/* ...add more info if needed... */}
        </div>
      </div>
    </div>
  );
}
