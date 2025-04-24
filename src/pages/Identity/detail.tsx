import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useIdentityDetail } from '../../hooks/useIdentity';
import { Badge } from '@/components/ui/badge';
import {
  Edit3, ArrowLeft, Mail, Users, Tag, Calendar, Building2, User, Globe2, Phone, Briefcase
} from 'lucide-react';

export const IdentityDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { identity, loading, error } = useIdentityDetail(id);
  const navigate = useNavigate();

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500" />
      <div className="text-blue-700 dark:text-cyan-300 font-semibold text-lg mt-4">Loading Identity...</div>
    </div>
  );

  if (error || !identity) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="text-red-600 font-semibold text-lg">Failed to load identity.</div>
      <button
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        onClick={() => navigate('/identity')}
      >
        Back to list
      </button>
    </div>
  );

  // Helper for colored chips
  const Chip = ({ icon, text, color }: { icon?: React.ReactNode, text: string, color?: string }) => (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold shadow mr-1 mb-1 transition-all duration-200`}
      style={{
        background: color || 'linear-gradient(90deg,#3b82f6,#06b6d4)',
        color: '#fff',
        boxShadow: '0 1px 4px rgba(59,130,246,0.15)'
      }}
    >
      {icon}{text}
    </span>
  );

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
  const getColor = (i: number) => chipColors[i % chipColors.length];

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition"
          onClick={() => navigate('/identity')}
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>
      <div className="bg-white/90 dark:bg-zinc-900/90 rounded-3xl shadow-2xl border border-blue-100 dark:border-zinc-800 p-0 overflow-hidden relative">
        {/* Top section: Avatar and Main Info */}
        <div className="flex flex-col md:flex-row gap-0 md:gap-8">
          <div className="flex flex-col items-center md:items-start md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-200 dark:from-zinc-900 dark:to-zinc-800 p-8 relative">
            {/* Avatar */}
            <div className="relative mb-3">
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 blur-2xl opacity-30 animate-float" />
              <div className="rounded-full bg-gradient-to-br from-blue-400 to-blue-700 dark:from-blue-900 dark:to-blue-700 w-20 h-20 flex items-center justify-center text-4xl font-extrabold text-white shadow-lg border-4 border-white dark:border-zinc-900 z-10 relative">
                <User className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-blue-900 dark:text-blue-200 tracking-tight mb-1 text-center md:text-left">{identity.name}</h1>
            <div className="flex flex-wrap gap-1 mb-2">
              <Chip icon={<Building2 className="w-4 h-4" />} text={identity.identity_class || '—'} color={getColor(0)} />
            </div>
            <div className="flex gap-2 mt-2">
              <Link
                to={`/identity/${identity.id}/edit`}
                className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-semibold shadow hover:scale-105 transition"
              >
                <Edit3 className="w-4 h-4" /> Edit
              </Link>
            </div>
          </div>
          {/* Details */}
          <div className="flex-1 p-8">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-blue-700 dark:text-cyan-300 mb-2 flex items-center gap-2">
                <Tag className="w-5 h-5" /> Details
              </h2>
              <div className="space-y-2 text-sm">
                {identity.description && (
                  <div className="mb-2 text-zinc-700 dark:text-zinc-300">{identity.description}</div>
                )}
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">Contact:</span>
                  <span>{identity.contact_information || '—'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">Sectors:</span>
                  <span>
                    {(identity.sectors || []).length > 0
                      ? identity.sectors.map((s: string, i: number) => <Chip key={s} text={s} color={getColor(i + 1)} />)
                      : '—'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">Roles:</span>
                  <span>
                    {(identity.roles || []).length > 0
                      ? identity.roles.map((r: string, i: number) => <Chip key={r} text={r} color={getColor(i + 2)} />)
                      : '—'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">Labels:</span>
                  <span>
                    {(identity.labels || []).length > 0
                      ? identity.labels.map((l: string, i: number) => <Chip key={l} text={l} color={getColor(i + 3)} />)
                      : '—'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">Created:</span>
                  <span>{identity.created ? new Date(identity.created).toLocaleString() : '—'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold">Modified:</span>
                  <span>{identity.modified ? new Date(identity.modified).toLocaleString() : '—'}</span>
                </div>
              </div>
            </div>
            {/* Metadata section if you want to add more fields */}
            {/* ... */}
          </div>
        </div>
      </div>
      {/* Decorative floating shapes */}
      <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-300 to-blue-500 opacity-20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-cyan-200 to-blue-400 opacity-10 rounded-full blur-2xl animate-float-slow" />
      </div>
      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0) }
            50% { transform: translateY(-20px) }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-slow { animation: float 12s ease-in-out infinite; }
          .animate-fade-in { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px) scale(0.98);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
        `}
      </style>
    </div>
  );
};
