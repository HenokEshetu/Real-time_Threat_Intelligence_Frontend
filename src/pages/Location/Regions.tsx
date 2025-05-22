import React from 'react';
import { useNavigate } from 'react-router-dom';

const regions = [
  "Africa", "Americas", "Asia", "Australia and New Zealand", "Central Asia", "Eastern Asia",
  "Eastern Europe", "Europe", "Latin America and the Caribbean", "Melanesia", "Micronesia",
  "Middle East", "Northern Africa", "Northern America", "Northern Europe", "Oceania", "Polynesia",
  "South-Eastern Asia", "Southern Asia", "Southern Europe", "Sub-Saharan Africa", "Western Europe"
];

export default function Regions() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Regions</h2>
      <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-zinc-700 text-zinc-300">
              <th className="px-4 py-3 text-left">NAME</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {regions.map(region => (
              <tr
                key={region}
                className="hover:bg-zinc-700 cursor-pointer border-b border-zinc-700"
                onClick={() => navigate(`/locations/regions/${encodeURIComponent(region)}`)}
              >
                <td className="px-4 py-3">{region}</td>
                <td className="px-4 py-3 text-right">&rarr;</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-2 text-xs text-zinc-400">{regions.length} entities</div>
      </div>
    </div>
  );
}
