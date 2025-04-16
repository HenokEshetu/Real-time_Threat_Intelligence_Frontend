import React from 'react';
import { useThreatActors } from '../../hooks/useThreatActors';
import { ThreatActorsGrid } from '../../components/common/ThreatActors/ThreatActorsGrid';
import { Link } from 'react-router-dom';

export const ThreatActors = () => {
  const { actors, loading, error } = useThreatActors();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Threat Actors</h1>
        <Link
          to="/threat-actors/create"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          Create New Threat Actor
        </Link>
      </div>
      {loading && <div className="text-center py-10">Loading...</div>}
      {error && <div className="text-red-600 text-center py-10">Error loading threat actors.</div>}
      {!loading && !error && <ThreatActorsGrid actors={actors} />}
    </div>
  );
};
