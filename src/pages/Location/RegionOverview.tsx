import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import countries from './countries.json';

// Define region data for dynamic selection
const regionData: Record<string, { name: string; coordinates: [number, number]; associatedCountryISO3: string[] }> = {
  Africa: {
    name: 'Africa',
    coordinates: [11.5024338, 17.7578122],
    associatedCountryISO3: [
      "DZA", "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CPV", "CAF", "TCD", "COM", "COG", "COD", "DJI", "EGY", "GNQ", "ERI", "SWZ", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB", "CIV", "KEN", "LSO", "LBR", "LBY", "MDG", "MWI", "MLI", "MRT", "MUS", "MAR", "MOZ", "NAM", "NER", "NGA", "RWA", "STP", "SEN", "SYC", "SLE", "SOM", "ZAF", "SSD", "SDN", "TZA", "TGO", "TUN", "UGA", "ZMB", "ZWE"
    ]
  },
  Americas: {
    name: 'Americas',
    coordinates: [13.5, -80],
    associatedCountryISO3: [
      "USA", "CAN", "MEX",
      "BLZ", "CRI", "SLV", "GTM", "HND", "NIC", "PAN", "CUB", "DOM", "HTI", "JAM", "TTO", "BRB", "BHS", "ATG", "GRD", "KNA", "LCA", "VCT", "DMA",
      "ARG", "BOL", "BRA", "CHL", "COL", "ECU", "GUY", "PRY", "PER", "SUR", "URY", "VEN"
    ]
  },
  Asia: {
    name: 'Asia',
    coordinates: [34.0479, 100.6197],
    associatedCountryISO3: [
      "AFG", "BGD", "BTN", "IND", "MDV", "NPL", "PAK", "LKA",
      "BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "TLS", "VNM",
      "CHN", "HKG", "JPN", "KOR", "MAC", "MNG", "PRK", "TWN"
    ]
  },
  Europe: {
    name: 'Europe',
    coordinates: [54.526, 15.2551],
    associatedCountryISO3: [
      "ALB", "AND", "AUT", "BLR", "BEL", "BIH", "BGR", "HRV", "CYP", "CZE", "DNK", "EST", "FIN", "FRA", "DEU", "GRC", "HUN", "ISL", "IRL", "ITA", "LVA", "LIE", "LTU", "LUX", "MLT", "MDA", "MCO", "MNE", "NLD", "MKD", "NOR", "POL", "PRT", "ROU", "RUS", "SMR", "SRB", "SVK", "SVN", "ESP", "SWE", "CHE", "UKR", "GBR", "VAT"
    ]
  },
  "Australia and New Zealand": {
    name: "Australia and New Zealand",
    coordinates: [-25.2744, 133.7751],
    associatedCountryISO3: [
      "AUS", "NZL"
    ]
  },
  "Central Asia": {
    name: "Central Asia",
    coordinates: [48.0196, 66.9237],
    associatedCountryISO3: [
      "KAZ", "KGZ", "TJK", "TKM", "UZB"
    ]
  },
  "Eastern Asia": {
    name: "Eastern Asia",
    coordinates: [35.8617, 104.1954],
    associatedCountryISO3: [
      "CHN", "HKG", "JPN", "KOR", "MAC", "MNG", "PRK", "TWN"
    ]
  },
  "Eastern Europe": {
    name: "Eastern Europe",
    coordinates: [54.526, 25.2551],
    associatedCountryISO3: [
      "BLR", "BGR", "CZE", "HUN", "MDA", "POL", "ROU", "RUS", "SVK", "UKR"
    ]
  },
  "Latin America and the Caribbean": {
    name: "Latin America and the Caribbean",
    coordinates: [-14.235, -51.9253],
    associatedCountryISO3: [
      "ARG", "BOL", "BRA", "CHL", "COL", "CRI", "CUB", "DOM", "ECU", "SLV", "GTM", "HTI", "HND", "JAM", "MEX", "NIC", "PAN", "PRY", "PER", "URY", "VEN", "BLZ", "BRB", "BHS", "ATG", "GRD", "KNA", "LCA", "VCT", "DMA", "TTO", "SUR", "GUY"
    ]
  },
  Melanesia: {
    name: "Melanesia",
    coordinates: [-9.4438, 160.1562],
    associatedCountryISO3: [
      "FJI", "PGN", "SLB", "VUT"
    ]
  },
  Micronesia: {
    name: "Micronesia",
    coordinates: [7.4256, 150.5508],
    associatedCountryISO3: [
      "FSM", "GUM", "KIR", "MHL", "NRU", "PLW"
    ]
  },
  "Middle East": {
    name: "Middle East",
    coordinates: [29.3759, 47.9774],
    associatedCountryISO3: [
      "BHR", "CYP", "EGY", "IRN", "IRQ", "ISR", "JOR", "KWT", "LBN", "OMN", "QAT", "SAU", "SYR", "TUR", "ARE", "YEM", "PSE"
    ]
  },
  "Northern America": {
    name: "Northern America",
    coordinates: [54.526, -105.2551],
    associatedCountryISO3: [
      "USA", "CAN", "BMU", "GRL", "SPM"
    ]
  },
  "Northern Africa": {
    name: "Northern Africa",
    coordinates: [26.8206, 30.8025],
    associatedCountryISO3: [
      "DZA", "EGY", "LBY", "MAR", "SDN", "TUN", "ESH"
    ]
  },
  "Northern Europe": {
    name: "Northern Europe",
    coordinates: [60.472, 8.4689],
    associatedCountryISO3: [
      "DNK", "EST", "FIN", "ISL", "IRL", "LVA", "LTU", "NOR", "SWE", "GBR", "GGY", "IMN", "JEY"
    ]
  },
  Oceania: {
    name: "Oceania",
    coordinates: [-22.7359, 140.0188],
    associatedCountryISO3: [
      "AUS", "FJI", "KIR", "MHL", "FSM", "NRU", "NZL", "PLW", "PNG", "WSM", "SLB", "TON", "TUV", "VUT"
    ]
  },
  Polynesia: {
    name: "Polynesia",
    coordinates: [-17.6797, -149.4068],
    associatedCountryISO3: [
      "ASM", "COK", "PYF", "NIU", "PCN", "WSM", "TON", "TUV"
    ]
  },
  "South-Eastern Asia": {
    name: "South-Eastern Asia",
    coordinates: [2.5, 115.0],
    associatedCountryISO3: [
      "BRN", "KHM", "IDN", "LAO", "MYS", "MMR", "PHL", "SGP", "THA", "TLS", "VNM"
    ]
  },
  "Southern Asia": {
    name: "Southern Asia",
    coordinates: [23.684994, 90.356331],
    associatedCountryISO3: [
      "AFG", "BGD", "BTN", "IND", "MDV", "NPL", "PAK", "LKA"
    ]
  },
  "Southern Europe": {
    name: "Southern Europe",
    coordinates: [41.8719, 12.5674],
    associatedCountryISO3: [
      "ALB", "AND", "BIH", "HRV", "GRC", "ITA", "MLT", "MNE", "MKD", "SMR", "SRB", "SVN", "ESP", "VAT", "PRT"
    ]
  },
  "Sub-Saharan Africa": {
    name: "Sub-Saharan Africa",
    coordinates: [-1.9577, 30.1127],
    associatedCountryISO3: [
      "AGO", "BEN", "BWA", "BFA", "BDI", "CMR", "CPV", "CAF", "TCD", "COM", "COG", "COD", "DJI", "GNQ", "ERI", "SWZ", "ETH", "GAB", "GMB", "GHA", "GIN", "GNB", "CIV", "KEN", "LSO", "LBR", "MDG", "MWI", "MLI", "MRT", "MUS", "MOZ", "NAM", "NER", "NGA", "RWA", "STP", "SEN", "SYC", "SLE", "SOM", "ZAF", "SSD", "TZA", "TGO", "UGA", "ZMB", "ZWE"
    ]
  },
  "Western Europe": {
    name: "Western Europe",
    coordinates: [48.8566, 2.3522],
    associatedCountryISO3: [
      "AUT", "BEL", "FRA", "DEU", "LIE", "LUX", "MCO", "NLD", "CHE"
    ]
  },
};

// Highlight style for associated countries
const highlightStyle = {
  color: '#00bfff',
  weight: 2,
  fillColor: '#00bfff',
  fillOpacity: 0.4,
};

function countryStyle(feature: any, region: typeof regionData[string]) {
  if (region.associatedCountryISO3.includes(feature.properties.ISO3)) {
    return highlightStyle;
  }
  return {
    color: '#3b82f6',
    weight: 1,
    fillColor: '#22223b',
    fillOpacity: 0.1,
  };
}

// Accept regionName as prop for dynamic region display
export default function RegionOverview({ regionName = 'Africa' }: { regionName?: string }) {
  // Normalize regionName for lookup (case-insensitive, ignore spaces/dashes)
  function normalize(name: string) {
    return name.replace(/[\s\-]/g, '').toLowerCase();
  }

  // Map aliases to canonical region keys
  const regionAliases: Record<string, string> = {
    africa: "Africa",
    america: "Americas",
    americas: "Americas",
    asia: "Asia",
    europe: "Europe",
    "australiaandnewzealand": "Australia and New Zealand",
    "centralasia": "Central Asia",
    "easternasia": "Eastern Asia",
    "easterneurope": "Eastern Europe",
    "latinamericaandthecaribbean": "Latin America and the Caribbean",
    melanesia: "Melanesia",
    micronesia: "Micronesia",
    "middleeast": "Middle East",
    "northernamerica": "Northern America",
    "northernafrica": "Northern Africa",
    "northerneurope": "Northern Europe",
    oceania: "Oceania",
    polynesia: "Polynesia",
    "southeasternasia": "South-Eastern Asia",
    "south-easternasia": "South-Eastern Asia",
    "southernasia": "Southern Asia",
    "southerneurope": "Southern Europe",
    "sub-saharanafrica": "Sub-Saharan Africa",
    "subsaharanafrica": "Sub-Saharan Africa",
    "westerneurope": "Western Europe",
  };

  const normalizedInput = normalize(regionName || '');
  const canonicalRegion = regionAliases[normalizedInput] || Object.keys(regionData).find(
    key => normalize(key) === normalizedInput
  ) || 'Africa';
  const region = regionData[canonicalRegion];

  return (
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      {/* Left: Map */}
      <div className="flex-1 p-6">
        <div className="mb-2 text-xs text-zinc-400">
          MINI MAP (Lat. {region.coordinates[0]}, Long. {region.coordinates[1]})
        </div>
        <div style={{ width: '100%', height: 600, borderRadius: 12, overflow: 'hidden' }}>
          <MapContainer
            center={region.coordinates as [number, number]}
            zoom={3}
            style={{ width: '100%', height: '100%' }}
            scrollWheelZoom={true}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
              data={countries as any}
              style={feature => countryStyle(feature, region)}
            />
          </MapContainer>
        </div>
      </div>
      {/* Right: Basic Information */}
      <div className="w-[480px] p-6 border-l border-zinc-800 flex flex-col gap-4">
        <div className="text-sm text-zinc-400">BASIC INFORMATION</div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-semibold">Region</span>
            <div className="inline-block ml-2 px-2 py-1 rounded bg-zinc-800 text-xs">{regionName}</div>
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
            <div className="ml-2 text-xs break-all">location--7e13827c-726f-5725-97b8-907dc66a66f6</div>
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
