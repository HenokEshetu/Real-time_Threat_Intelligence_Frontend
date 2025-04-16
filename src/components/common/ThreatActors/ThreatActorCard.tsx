import React, { useState } from 'react';
import { ThreatActor } from '../../../types/threatActor';

interface ThreatActorCardProps {
  actor: ThreatActor;
  onClick?: (id: string) => void;
}

export const ThreatActorCard: React.FC<ThreatActorCardProps> = ({ actor, onClick }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-lg shadow-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 transition-transform hover:scale-105 cursor-pointer`}
      onClick={() => {
        setExpanded((v) => !v);
        if (onClick) onClick(actor.id);
      }}
      tabIndex={0}
      aria-expanded={expanded}
      role="button"
    >
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-blue-100 dark:bg-blue-900 w-10 h-10 flex items-center justify-center text-xl font-bold text-blue-700 dark:text-blue-300">
          {actor.name?.[0] ?? "?"}
        </div>
        <div>
          <div className="font-semibold text-lg">{actor.name}</div>
          <div className="text-xs text-zinc-500">{actor.roles?.join(', ')}</div>
        </div>
      </div>
      <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 line-clamp-2">
        {actor.description}
      </div>
      {expanded && (
        <div className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
          {actor.aliases && (
            <div>
              <span className="font-medium">Aliases:</span> {actor.aliases.join(', ')}
            </div>
          )}
          {actor.labels && (
            <div>
              <span className="font-medium">Labels:</span> {actor.labels.join(', ')}
            </div>
          )}
          {actor.sophistication && (
            <div>
              <span className="font-medium">Sophistication:</span> {actor.sophistication}
            </div>
          )}
          {actor.resource_level && (
            <div>
              <span className="font-medium">Resource Level:</span> {actor.resource_level}
            </div>
          )}
          {actor.primary_motivation && (
            <div>
              <span className="font-medium">Motivation:</span> {actor.primary_motivation}
            </div>
          )}
          {actor.first_seen && (
            <div>
              <span className="font-medium">First Seen:</span> {new Date(actor.first_seen).toLocaleDateString()}
            </div>
          )}
          {actor.last_seen && (
            <div>
              <span className="font-medium">Last Seen:</span> {new Date(actor.last_seen).toLocaleDateString()}
            </div>
          )}
        </div>
      )}
      <div className="mt-2 text-right">
        <button
          className="text-xs text-blue-600 hover:underline focus:outline-none"
          tabIndex={-1}
          onClick={e => {
            e.stopPropagation();
            setExpanded(v => !v);
          }}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </div>
    </div>
  );
};
