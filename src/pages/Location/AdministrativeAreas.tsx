import React from 'react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockAdministrativeAreas = [
  {
    id: 'adm-1',
    name: 'Île-de-France',
    administrative_area: 'Île-de-France',
    country: 'France',
    region: 'Europe',
    latitude: '48.8499',
    longitude: '2.6370',
    description: 'The most populous administrative region in France.',
    created: '2023-01-01T12:00:00Z',
    modified: '2023-06-01T12:00:00Z',
    type: 'ADMINISTRATIVE_AREA',
    labels: ['urban', 'economic'],
    postal_code: '75000',
    city: 'Paris',
    confidence: 95,
    revoked: false,
    spec_version: '1.0',
    street_address: '',
    lang: 'fr',
    precision: 'high',
    created_by_ref: 'user-1',
    extensions: {},
    external_references: [] as any[],
    relationship: [] as any[],
  },
  {
    id: 'adm-2',
    name: 'California',
    administrative_area: 'California',
    country: 'United States',
    region: 'North America',
    latitude: '36.7783',
    longitude: '-119.4179',
    description: 'A state in the Western United States.',
    created: '2022-05-01T12:00:00Z',
    modified: '2023-03-01T12:00:00Z',
    type: 'ADMINISTRATIVE_AREA',
    labels: ['state', 'coastal'],
    postal_code: '',
    city: '',
    confidence: 90,
    revoked: false,
    spec_version: '1.0',
    street_address: '',
    lang: 'en',
    precision: 'medium',
    created_by_ref: 'user-2',
    extensions: {},
    external_references: [] as any[],
    relationship: [] as any[],
  },
  // ...add more as needed
];

export default function AdministrativeAreas() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Administrative Areas</h1>
      <Link to="/location/administrative-areas/create" className="text-blue-600 hover:underline mb-4 inline-block">+ Add Administrative Area</Link>
      <table className="min-w-full mt-4 bg-zinc-900/10 rounded">
        <thead>
          <tr>
            <th className="text-left px-3 py-2">Name</th>
            <th className="text-left px-3 py-2">Country</th>
            <th className="text-left px-3 py-2">Region</th>
            <th className="text-left px-3 py-2">Created</th>
            <th className="text-left px-3 py-2">Modified</th>
            <th className="text-left px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {mockAdministrativeAreas.map(area => (
            <tr key={area.id} className="border-b border-zinc-200 hover:bg-zinc-100/30">
              <td className="px-3 py-2 font-semibold">{area.name}</td>
              <td className="px-3 py-2">{area.country}</td>
              <td className="px-3 py-2">{area.region}</td>
              <td className="px-3 py-2">{area.created.slice(0, 10)}</td>
              <td className="px-3 py-2">{area.modified.slice(0, 10)}</td>
              <td className="px-3 py-2">
                <Link to={`/location/administrative-areas/${area.id}`} className="text-blue-600 hover:underline">Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
