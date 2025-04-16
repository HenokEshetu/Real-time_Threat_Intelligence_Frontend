import React from 'react';
import { ThreatActor } from '../../../types/threatActor';
import { ThreatActorCard } from './ThreatActorCard';

interface ThreatActorsGridProps {
  actors: ThreatActor[];
  onActorClick?: (id: string) => void;
}

export const ThreatActorsGrid: React.FC<ThreatActorsGridProps> = ({ actors, onActorClick }) => {
  if (!actors?.length) {
    return <div className="text-center text-zinc-500 py-10">No threat actors found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {actors.map((actor) => (
        <ThreatActorCard key={actor.id} actor={actor} onClick={onActorClick} />
      ))}
    </div>
  );
};
