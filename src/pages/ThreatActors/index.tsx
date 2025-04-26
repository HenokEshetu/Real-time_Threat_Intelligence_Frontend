import React, { useState } from 'react';
import { useThreatActors } from '../../hooks/useThreatActors';
import { ThreatActorsGrid } from '../../components/common/ThreatActors/ThreatActorsGrid';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Plus } from 'lucide-react';

export const ThreatActors = () => {
  const { actors, loading, error } = useThreatActors();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Keyboard: Escape to unselect
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="relative min-h-screen !w-full bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 overflow-x-hidden">
      {/* Animated sparkle background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Sparkles className="absolute top-10 left-10 w-24 h-24 text-blue-200 opacity-30 animate-spin-slow" />
        <Sparkles className="absolute bottom-10 right-10 w-32 h-32 text-cyan-200 opacity-20 animate-spin-slow" />
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 animate-gradient-x drop-shadow-lg flex items-center gap-2">
            <Sparkles className="text-blue-400 animate-pulse" /> Threat Actors
          </h1>
          <button
            type="button"
            className="fixed bottom-10 right-10 z-50 bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-700 hover:to-cyan-500 text-white font-semibold py-3 px-7 rounded-full shadow-2xl transition-all transform hover:scale-110 focus:outline-none flex items-center gap-2 animate-float"
            style={{
              boxShadow: '0 8px 40px 0 rgba(59,130,246,0.18)',
            }}
            onClick={() => navigate('/threat-actors/create')}
          >
            <Plus className="w-6 h-6" /> Create New
          </button>
        </div>
        {/* Loading spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mb-4" />
            <div className="text-blue-700 dark:text-cyan-300 font-semibold text-lg">
              Loading Threat Actors...
            </div>
          </div>
        )}
        {/* Error display */}
        {error && (
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="bg-gradient-to-r from-red-100 to-red-50 border border-red-200 rounded-xl shadow-lg px-6 py-5 flex flex-col items-center">
              <span className="text-4xl mb-2">⚠️</span>
              <div className="text-red-700 font-bold text-lg mb-1">
                Error loading threat actors
              </div>
              <pre className="text-xs text-red-500 bg-red-50 rounded p-2 mt-2 max-w-xs overflow-x-auto">
                {error.networkError
                  ? `Network error: Unable to connect to the backend API. Please check your server connection and try again.`
                  : error.name
                  ? `${error.name}: ${error.message}`
                  : error.message || JSON.stringify(error, null, 2)}
              </pre>
            </div>
          </div>
        )}
        {/* Grid */}
        {!loading && !error && (
          <div className="animate-fade-in">
            <ThreatActorsGrid
              actors={actors}
              selectedId={selectedId ?? undefined}
              onSelect={(id) => setSelectedId(id === selectedId ? null : id)}
              onActorClick={(id) => {
                setSelectedId(id);
              }}
            />
          </div>
        )}
        {/* Show details panel if selected */}
        {selectedId && (
          <div
            className="fixed inset-0 z-50 w-full flex items-center justify-center bg-black bg-opacity-40 animate-fade-in"
            onClick={() => setSelectedId(null)}
          >
            <div
              className="bg-white/90 dark:bg-zinc-900/95 rounded-3xl shadow-2xl p-0 w-full relative border border-blue-100 dark:border-zinc-800 backdrop-blur-xl animate-fade-in-up overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              tabIndex={0}
              style={{ boxShadow: '0 12px 48px 0 rgba(59,130,246,0.22)' }}
            >
              <button
                className="absolute top-4 right-4 text-zinc-400 hover:text-blue-600 text-2xl bg-white/80 dark:bg-zinc-800/80 rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
                onClick={() => setSelectedId(null)}
                aria-label="Close"
                style={{ backdropFilter: 'blur(4px)' }}
              >
                ×
              </button>
              {/* Enhanced ThreatActorCard in detail mode */}
              {(() => {
                const actor = actors.find(
                  (a: (typeof actors)[0]) => a.id === selectedId,
                );
                if (!actor) return null;
                // Type badge color
                const typeColors: Record<string, string> = {
                  ACTIVIST: 'from-pink-500 to-pink-300',
                  COMPETITOR: 'from-amber-500 to-yellow-300',
                  CRIME_SYNDICATE: 'from-red-600 to-orange-400',
                  CRIMINAL: 'from-red-400 to-orange-300',
                  HACKER: 'from-blue-600 to-cyan-400',
                  INSIDER_ACCIDENTAL: 'from-gray-400 to-gray-200',
                  INSIDER_DISGRUNTLED: 'from-gray-700 to-gray-400',
                  NATION_STATE: 'from-indigo-700 to-blue-400',
                  SENSATIONALIST: 'from-fuchsia-500 to-pink-300',
                  SPY: 'from-green-600 to-green-300',
                  TERRORIST: 'from-red-800 to-yellow-400',
                  UNKNOWN: 'from-zinc-400 to-zinc-200',
                };
                return (
                  <div className="flex flex-col w-full items-center gap-0 py-10 px-8 relative">
                    {/* Avatar with gradient ring */}
                    <div className="relative mb-3">
                      <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 blur-2xl opacity-30 animate-float" />
                      <div className="rounded-full bg-gradient-to-br from-blue-400 to-blue-700 dark:from-blue-900 dark:to-blue-700 w-20 h-20 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg border-4 border-white dark:border-zinc-900 z-10 relative">
                        <span
                          role="img"
                          aria-label="paperclip"
                          className="text-4xl"
                        >
                          📎
                        </span>
                      </div>
                    </div>
                    {/* Name and type badge */}
                    <div className="flex flex-col items-center mb-2">
                      <h2 className="text-3xl font-extrabold text-blue-900 dark:text-blue-200 tracking-tight mb-1">
                        {actor.name}
                      </h2>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow bg-gradient-to-r ${
                          typeColors[actor.type as string] ||
                          'from-blue-400 to-cyan-300'
                        } text-white mb-1`}
                        style={{ letterSpacing: 1.5 }}
                      >
                        {actor.type}
                      </span>
                    </div>
                    {/* Description */}
                    <div className="mb-4 text-zinc-700 dark:text-zinc-300 text-center text-base max-w-lg">
                      {actor.description}
                    </div>
                    {/* Labels and roles */}
                    <div className="flex flex-wrap gap-2 mb-2 justify-center">
                      {actor.labels?.map((label: string, i: number) => (
                        <span
                          key={label}
                          className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-300 to-cyan-200 text-blue-900 shadow"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2 justify-center">
                      {actor.roles?.map((role: string, i: number) => (
                        <span
                          key={role}
                          className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 shadow"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full text-sm text-zinc-600 dark:text-zinc-300 mt-4 mb-2">
                      <div className="flex items-center">
                        <span className="mr-1">🧠</span>
                        <b>Sophistication:</b>&nbsp;
                        {actor.sophistication || (
                          <span className="text-zinc-300">—</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">💰</span>
                        <b>Resource Level:</b>&nbsp;
                        {actor.resource_level || (
                          <span className="text-zinc-300">—</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">🎯</span>
                        <b>Motivation:</b>&nbsp;
                        {actor.primary_motivation || (
                          <span className="text-zinc-300">—</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">🕵️</span>
                        <b>Aliases:</b>&nbsp;
                        {actor.aliases?.join(', ') || (
                          <span className="text-zinc-300">—</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">📅</span>
                        <b>First Seen:</b>&nbsp;
                        {actor.first_seen || (
                          <span className="text-zinc-300">—</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-1">⏰</span>
                        <b>Last Seen:</b>&nbsp;
                        {actor.last_seen || (
                          <span className="text-zinc-300">—</span>
                        )}
                      </div>
                    </div>
                    {/* Action buttons */}
                    <div className="flex gap-4 mt-8">
                      <button
                        className="btn-primary px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
                        onClick={() => navigate(`/threat-actors/${actor.id}`)}
                      >
                        <span className="text-lg">🔎</span> View Full Details
                      </button>
                      <button
                        className="btn-secondary px-6 py-2 rounded-full bg-gradient-to-r from-zinc-300 to-zinc-100 text-zinc-700 font-bold shadow hover:scale-105 transition flex items-center gap-2"
                        onClick={() =>
                          navigate(`/threat-actors/${actor.id}/edit`)
                        }
                      >
                        <span className="text-lg">✏️</span> Edit
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
      {/* Decorative floating shapes */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-300 to-blue-500 opacity-30 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-cyan-200 to-blue-400 opacity-20 rounded-full blur-2xl animate-float-slow" />
      </div>
      <style>
        {`
          @keyframes gradient-x {
            0%,100% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
          }
          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 4s ease-in-out infinite;
          }
          @keyframes float {
            0%,100% { transform: translateY(0) }
            50% { transform: translateY(-20px) }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-slow { animation: float 12s ease-in-out infinite; }
          .animate-fade-in { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
          .animate-fade-in-up { animation: fadeInUp 1s cubic-bezier(0.4,0,0.2,1) both; }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px) scale(0.98);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
        `}
      </style>
    </div>
  );
};
