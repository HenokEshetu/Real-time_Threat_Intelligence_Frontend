import React, { useState } from 'react';
import { ThreatActor } from '../../../types/threatActor';

interface ThreatActorCardProps {
  actor: ThreatActor;
  onClick?: (id: string) => void;
  flipped?: boolean;
  interactive?: boolean;
}

// Helper for colored chips
const Chip: React.FC<{ text: string; color?: string }> = ({ text, color }) => (
  <span
    className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold mr-1 mb-1`}
    style={{
      background: color || 'linear-gradient(90deg,#3b82f6,#06b6d4)',
      color: '#fff',
      boxShadow: '0 1px 4px rgba(59,130,246,0.15)'
    }}
  >
    {text}
  </span>
);

// Add icons for visual cues
const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'sophistication':
      return <span className="mr-1">🎓</span>;
    case 'resource_level':
      return <span className="mr-1">💰</span>;
    case 'primary_motivation':
      return <span className="mr-1">🎯</span>;
    case 'aliases':
      return <span className="mr-1">🕵️‍♂️</span>;
    case 'roles':
      return <span className="mr-1">🛡️</span>;
    case 'first_seen':
      return <span className="mr-1">📅</span>;
    case 'last_seen':
      return <span className="mr-1">⏰</span>;
    default:
      return null;
  }
};

export const ThreatActorCard: React.FC<ThreatActorCardProps> = ({
  actor,
  onClick,
  flipped: flippedProp,
  interactive = false,
}) => {
  const [flipped, setFlipped] = useState(false);

  // Color palette for chips
  const chipColors = [
    'linear-gradient(90deg,#6366f1,#3b82f6)',
    'linear-gradient(90deg,#f59e42,#f43f5e)',
    'linear-gradient(90deg,#10b981,#06b6d4)',
    'linear-gradient(90deg,#fbbf24,#f59e42)',
    'linear-gradient(90deg,#a21caf,#6366f1)',
    'linear-gradient(90deg,#f43f5e,#fbbf24)',
    'linear-gradient(90deg,#06b6d4,#3b82f6)'
  ];

  // For chip color cycling
  const getColor = (i: number) => chipColors[i % chipColors.length];

  // For screenshot style: header above avatar
  const header = (
    <div className="w-28 h-7 rounded-2xl bg-white/80 shadow-md flex items-center justify-center mb-[-18px] mx-auto z-10 relative">
      {/* Empty header for visual effect */}
    </div>
  );

  // Avatar: use a paperclip icon for visual cue
  const avatar = (
    <div className="rounded-full bg-gradient-to-br from-blue-400 to-blue-700 dark:from-blue-900 dark:to-blue-700 w-10 h-10 flex items-center justify-center text-xl font-extrabold text-white shadow-lg border-4 border-white dark:border-zinc-900">
      <span role="img" aria-label="paperclip" className="text-2xl">📎</span>
    </div>
  );

  return (
    <div
      className={`relative group ${interactive ? 'hover:ring-2 hover:ring-blue-300 focus:ring-2 focus:ring-blue-400' : ''}`}
      tabIndex={0}
      aria-label={actor.name}
      style={{ minHeight: 220, outline: 'none', background: 'none' }}
      onClick={() => {
        if (onClick) onClick(actor.id);
      }}
    >
      <div
        className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-200 dark:from-zinc-900 dark:to-zinc-800 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl px-4 py-3"
        style={{ position: 'relative', minHeight: 220 }}
      >
        {header}
        {avatar}
        <div className="mt-2 text-center">
          <div className="font-bold text-base text-blue-900 dark:text-blue-200">{actor.name}</div>
          <div className="flex justify-center mt-1">
            <Chip text="threat-actor" color="linear-gradient(90deg,#06b6d4,#3b82f6)" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-1 mt-2">
          {actor.labels?.map((label, i) => (
            <Chip
              key={label}
              text={label}
              color={
                label.toLowerCase() === 'apt'
                  ? 'linear-gradient(90deg,#fbbf24,#f59e42)'
                  : label.toLowerCase() === 'russian' || label.toLowerCase() === 'north-korea'
                  ? 'linear-gradient(90deg,#f59e42,#fbbf24)'
                  : label.toLowerCase() === 'spy' || label.toLowerCase() === 'crime_syndicate'
                  ? 'linear-gradient(90deg,#3b82f6,#6366f1)'
                  : getColor(i)
              }
            />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1 mt-1">
          {actor.roles?.map((role, i) => (
            <Chip key={role} text={role} color={getColor(i + 2)} />
          ))}
        </div>
        <div className="mt-2 flex justify-center">
          <button
            className="text-xs text-blue-600 hover:underline focus:outline-none"
            tabIndex={-1}
            onClick={e => {
              e.stopPropagation();
              if (onClick) onClick(actor.id);
            }}
          >
            Details →
          </button>
        </div>
      </div>
    </div>
  );
};
