import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdentities } from '../../hooks/useIdentity';
import { Plus, User, Tag, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export const IdentityListPage = () => {
  const { identities, loading, error } = useIdentities();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = identities?.filter((i: any) =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.identity_class?.toLowerCase().includes(search.toLowerCase()) ||
    i.sectors?.some((s: string) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 overflow-x-hidden">
      {/* Sparkle background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <User className="absolute top-10 left-10 w-24 h-24 text-blue-200 opacity-20 animate-spin-slow" />
        <User className="absolute bottom-10 right-10 w-32 h-32 text-cyan-200 opacity-10 animate-spin-slow" />
      </div>
      <div className="max-w-5xl mx-auto px-4 py-10 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 animate-gradient-x drop-shadow-lg flex items-center gap-2">
            <User className="text-blue-400 animate-pulse" /> Identities
          </h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search identities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input px-4 py-2 rounded-lg border border-blue-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 focus:ring-2 focus:ring-blue-400 transition text-base"
              style={{ minWidth: 220 }}
            />
            <button
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition"
              onClick={() => navigate('/identity/create')}
              title="Add Identity"
            >
              <Plus className="w-5 h-5" /> Add
            </button>
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-56 w-full rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-600 py-10 text-center">Error: {error.message}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 animate-fade-in">
            {filtered.length === 0 && (
              <div className="col-span-full text-zinc-400 text-center py-10">No identities found.</div>
            )}
            {filtered.map((identity: any, idx: number) => (
              <div
                key={identity.id}
                className="group bg-white/90 dark:bg-zinc-900/90 border border-blue-100 dark:border-zinc-800 rounded-2xl shadow-xl p-6 flex flex-col gap-3 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-200 relative"
                style={{ animation: `fadeInUp 0.5s ${0.05 * idx}s both` }}
                tabIndex={0}
                onClick={() => navigate(`/identity/${identity.id}`)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') navigate(`/identity/${identity.id}`);
                }}
                role="button"
                aria-label={`View details for ${identity.name}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="rounded-full bg-gradient-to-br from-blue-400 to-blue-700 dark:from-blue-900 dark:to-blue-700 w-12 h-12 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg border-4 border-white dark:border-zinc-900">
                    <User />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-blue-900 dark:text-blue-200">{identity.name}</div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <Badge variant="outline" className="text-blue-500 border-blue-400 bg-blue-50">
                        {identity.identity_class || '—'}
                      </Badge>
                      {identity.sectors?.slice(0, 2).map((s: string) => (
                        <Badge key={s} variant="outline" className="text-cyan-600 border-cyan-400 bg-cyan-50">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-3 mb-2">{identity.description}</div>
                <div className="flex flex-wrap gap-1 mb-1">
                  {identity.labels?.map((l: string, i: number) => (
                    <Badge key={l} variant="secondary" className="mr-1">{l}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 text-xs mt-auto">
                  {identity.roles?.length > 0 && (
                    <span className="flex items-center gap-1 text-purple-700 dark:text-purple-300">
                      <Briefcase className="w-4 h-4" /> {identity.roles.join(', ')}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-zinc-400">
                    <Tag className="w-4 h-4" /> {identity.id.slice(0, 8)}
                  </span>
                </div>
                <div className="absolute top-4 right-4 text-xs text-zinc-400">
                  {identity.created && (
                    <span>
                      <span className="font-semibold">Created:</span> {new Date(identity.created).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px) scale(0.98);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
          .animate-fade-in { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
          .animate-spin-slow { animation: spin 12s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
};
