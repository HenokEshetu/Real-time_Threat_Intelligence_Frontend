import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Define the type for administrative areas
interface AdministrativeArea {
  id: string;
  name: string;
  description: string;
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  postal_code: string;
  city: string;
  labels: string[];
  confidence: number;
  created: string;
  modified: string;
}

// Reuse the same mock data as in the list page
const mockAdministrativeAreas: AdministrativeArea[] = [
  // ...same as above...
];

export default function AdministrativeAreaDetail() {
  const { areaId } = useParams<{ areaId: string }>();
  const area = mockAdministrativeAreas.find(a => a.id === areaId);

  if (!area) {
    return <div className="p-8 text-center text-red-600">Administrative Area not found.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Link to="/location/administrative-areas" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Administrative Areas</Link>
      <h1 className="text-3xl font-bold mb-2">{area.name}</h1>
      <div className="text-zinc-500 mb-4">{area.description}</div>
      <table className="min-w-full bg-zinc-900/10 rounded mb-6">
        <tbody>
          <tr><td className="font-semibold pr-4">Country:</td><td>{area.country}</td></tr>
          <tr><td className="font-semibold pr-4">Region:</td><td>{area.region}</td></tr>
          <tr><td className="font-semibold pr-4">Latitude:</td><td>{area.latitude}</td></tr>
          <tr><td className="font-semibold pr-4">Longitude:</td><td>{area.longitude}</td></tr>
          <tr><td className="font-semibold pr-4">Postal Code:</td><td>{area.postal_code}</td></tr>
          <tr><td className="font-semibold pr-4">City:</td><td>{area.city}</td></tr>
          <tr><td className="font-semibold pr-4">Labels:</td><td>{area.labels.join(', ')}</td></tr>
          <tr><td className="font-semibold pr-4">Confidence:</td><td>{area.confidence}</td></tr>
          <tr><td className="font-semibold pr-4">Created:</td><td>{area.created}</td></tr>
          <tr><td className="font-semibold pr-4">Modified:</td><td>{area.modified}</td></tr>
        </tbody>
      </table>
      {/* Add map or more details as needed */}
    </div>
  );
}
