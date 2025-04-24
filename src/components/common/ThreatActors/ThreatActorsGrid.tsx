import React, { useState } from 'react';
import { ThreatActor } from '../../../types/threatActor';
import { ThreatActorCard } from './ThreatActorCard';

interface ThreatActorsGridProps {
  actors: ThreatActor[];
  onActorClick?: (id: string) => void;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

export const ThreatActorsGrid: React.FC<ThreatActorsGridProps> = ({
  actors,
  onActorClick,
  selectedId,
  onSelect,
}) => {
  if (!Array.isArray(actors)) {
    return (
      <div className="text-center text-red-600 py-10 animate-fade-in">
        Error: Unexpected data format for threat actors.
        <pre className="text-xs text-red-400 mt-2" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {JSON.stringify(actors, null, 2)}
        </pre>
      </div>
    );
  }
  if (!actors.length) {
    return (
      <div className="text-center text-zinc-500 py-10 animate-fade-in">
        No threat actors found.
      </div>
    );
  }

  // Keyboard navigation state
  const [focusedIdx, setFocusedIdx] = useState<number>(-1);

  return (
    <div
      className="flex flex-row flex-wrap gap-8 justify-start items-start animate-fade-in"
      tabIndex={0}
      aria-label="Threat Actors List"
      style={{ outline: 'none', minHeight: 320 }}
      onKeyDown={e => {
        if (['ArrowRight', 'ArrowDown'].includes(e.key)) {
          setFocusedIdx(i => Math.min(i + 1, actors.length - 1));
        } else if (['ArrowLeft', 'ArrowUp'].includes(e.key)) {
          setFocusedIdx(i => Math.max(i - 1, 0));
        }
      }}
    >
      {actors.map((actor, idx) => (
        <div
          key={actor.id}
          className={`transition-transform duration-300 hover:scale-105 focus-within:scale-105 ${
            selectedId === actor.id ? 'ring-2 ring-blue-400 scale-105' : ''
          }`}
          style={{
            animation: `fadeInUp 0.5s ${0.05 * idx}s both`,
            cursor: 'pointer',
            minWidth: 240,
            maxWidth: 260,
            flex: '0 0 auto',
          }}
          tabIndex={0}
          onClick={() => {
            onActorClick?.(actor.id);
            onSelect?.(actor.id);
          }}
          onFocus={() => setFocusedIdx(idx)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onActorClick?.(actor.id);
              onSelect?.(actor.id);
            }
          }}
          role="button"
          aria-label={`View details for ${actor.name}`}
          aria-pressed={selectedId === actor.id}
        >
          <ThreatActorCard
            actor={actor}
            onClick={onActorClick}
            flipped={selectedId === actor.id}
            interactive
          />
        </div>
      ))}
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fade-in {
            animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both;
          }
        `}
      </style>
    </div>
  );
};
