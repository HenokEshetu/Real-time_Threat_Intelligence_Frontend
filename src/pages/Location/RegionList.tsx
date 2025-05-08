import React from 'react';
import { Link } from 'react-router-dom';

const regions = [
  "Africa",
  "Americas",
  "Asia",
  "Australia and New Zealand",
  "Central Asia",
  "Eastern Asia",
  "Eastern Europe",
  "Europe",
  "Latin America and the Caribbean",
  "Melanesia",
  "Micronesia",
  "Middle East",
  "Northern America",
  "Northern Africa",
  "Northern Europe",
  "Oceania",
  "Polynesia",
  "South-Eastern Asia",
  "Southern Asia",
  "Southern Europe",
  "Sub-Saharan Africa",
  "Western Europe"
];

export default function RegionList() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Regions</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {regions.map(region => (
          <li key={region}>
            <Link
              to={`/location/regions/${encodeURIComponent(region)}`}
              className="block px-4 py-2 rounded bg-zinc-800 text-zinc-100 hover:bg-blue-600 hover:text-white transition"
            >
              {region}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
