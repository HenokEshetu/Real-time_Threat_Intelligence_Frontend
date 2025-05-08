import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdministrativeAreaCreation() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    administrative_area: '',
    country: '',
    region: '',
    latitude: '',
    longitude: '',
    description: '',
    postal_code: '',
    city: '',
    labels: '',
    confidence: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would call your GraphQL mutation
    // For now, just redirect back to the list
    navigate('/location/administrative-areas');
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <Link to="/location/administrative-areas" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Administrative Areas</Link>
      <h1 className="text-2xl font-bold mb-4">Create Administrative Area</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border px-3 py-2 rounded" required />
        <input name="administrative_area" value={form.administrative_area} onChange={handleChange} placeholder="Administrative Area" className="w-full border px-3 py-2 rounded" />
        <input name="country" value={form.country} onChange={handleChange} placeholder="Country" className="w-full border px-3 py-2 rounded" />
        <input name="region" value={form.region} onChange={handleChange} placeholder="Region" className="w-full border px-3 py-2 rounded" />
        <input name="latitude" value={form.latitude} onChange={handleChange} placeholder="Latitude" className="w-full border px-3 py-2 rounded" />
        <input name="longitude" value={form.longitude} onChange={handleChange} placeholder="Longitude" className="w-full border px-3 py-2 rounded" />
        <input name="postal_code" value={form.postal_code} onChange={handleChange} placeholder="Postal Code" className="w-full border px-3 py-2 rounded" />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="w-full border px-3 py-2 rounded" />
        <input name="labels" value={form.labels} onChange={handleChange} placeholder="Labels (comma separated)" className="w-full border px-3 py-2 rounded" />
        <input name="confidence" value={form.confidence} onChange={handleChange} placeholder="Confidence" className="w-full border px-3 py-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}
