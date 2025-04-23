import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThreatActorDetail, useUpdateThreatActor } from '../../hooks/useThreatActors';
import { FaSave, FaArrowLeft } from 'react-icons/fa';

export default function EditThreatActor() {
  const { id } = useParams<{ id: string }>();
  const { actor, loading, error } = useThreatActorDetail(id);
  const { updateThreatActor, loading: saving } = useUpdateThreatActor();
  const [form, setForm] = useState<any>(null);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (actor) setForm({ ...actor });
  }, [actor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value.split(',').map((v: string) => v.trim()).filter(Boolean) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg('');
    try {
      await updateThreatActor({ variables: { id, input: { ...form } } });
      navigate(`/threat-actors/${id}`);
    } catch (err: any) {
      setErrMsg(err.message || 'Failed to update');
    }
  };

  if (loading || !form) return <div className="text-center py-10 animate-pulse">Loading...</div>;
  if (error) return <div className="text-red-600 py-10">Error: {error.message}</div>;

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-br from-zinc-50 via-blue-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-500">
      <div className="w-full max-w-xl p-8 rounded-2xl shadow-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 dark:text-blue-300 tracking-tight">Edit Threat Actor</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="relative">
            <input name="name" value={form.name} onChange={handleChange} required className="input peer" autoFocus />
            <label className="floating-label">Name</label>
          </div>
          {/* Description */}
          <div className="relative">
            <textarea name="description" value={form.description} onChange={handleChange} className="input peer min-h-[60px]" />
            <label className="floating-label">Description</label>
          </div>
          {/* Roles */}
          <div className="relative">
            <input name="roles" value={form.roles?.join(',') || ''} onChange={e => handleArrayChange('roles', e.target.value)} className="input peer" />
            <label className="floating-label">Roles (comma separated)</label>
          </div>
          {/* Sophistication */}
          <div className="relative">
            <input name="sophistication" value={form.sophistication || ''} onChange={handleChange} className="input peer" />
            <label className="floating-label">Sophistication</label>
          </div>
          {/* Resource Level */}
          <div className="relative">
            <input name="resource_level" value={form.resource_level || ''} onChange={handleChange} className="input peer" />
            <label className="floating-label">Resource Level</label>
          </div>
          {/* Primary Motivation */}
          <div className="relative">
            <input name="primary_motivation" value={form.primary_motivation || ''} onChange={handleChange} className="input peer" />
            <label className="floating-label">Primary Motivation</label>
          </div>
          {/* Aliases */}
          <div className="relative">
            <input name="aliases" value={form.aliases?.join(',') || ''} onChange={e => handleArrayChange('aliases', e.target.value)} className="input peer" />
            <label className="floating-label">Aliases (comma separated)</label>
          </div>
          {/* Labels */}
          <div className="relative">
            <input name="labels" value={form.labels?.join(',') || ''} onChange={e => handleArrayChange('labels', e.target.value)} className="input peer" />
            <label className="floating-label">Labels (comma separated)</label>
          </div>
          {/* First Seen */}
          <div className="relative">
            <input name="first_seen" value={form.first_seen || ''} onChange={handleChange} className="input peer" type="datetime-local" />
            <label className="floating-label">First Seen (ISO date)</label>
          </div>
          {/* Last Seen */}
          <div className="relative">
            <input name="last_seen" value={form.last_seen || ''} onChange={handleChange} className="input peer" type="datetime-local" />
            <label className="floating-label">Last Seen (ISO date)</label>
          </div>
          {errMsg && <div className="text-red-600 text-sm">{errMsg}</div>}
          <div className="flex gap-4 mt-6">
            <button type="submit" className="flex items-center gap-2 btn-primary px-5 py-2 rounded-lg shadow hover:scale-105 transition-transform bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold" disabled={saving}>
              <FaSave /> {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" className="flex items-center gap-2 px-5 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-blue-700 dark:text-blue-300 font-semibold shadow hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors" onClick={() => navigate(-1)}>
              <FaArrowLeft /> Cancel
            </button>
          </div>
        </form>
      </div>
      {/* Floating label styles */}
      <style>{`
        .input {
          width: 100%;
          padding: 1.25rem 0.75rem 0.5rem 0.75rem;
          border: 1.5px solid #cbd5e1;
          border-radius: 0.75rem;
          background: transparent;
          color: inherit;
          outline: none;
          font-size: 1rem;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px #3b82f655;
        }
        .dark .input {
          border-color: #334155;
          background: #18181b;
        }
        .floating-label {
          position: absolute;
          left: 0.85rem;
          top: 1.1rem;
          font-size: 1rem;
          color: #64748b;
          pointer-events: none;
          transition: all 0.2s;
          background: transparent;
        }
        .input:focus + .floating-label,
        .input:not(:placeholder-shown):not([value=""]) + .floating-label,
        textarea.input:focus + .floating-label,
        textarea.input:not(:placeholder-shown):not([value=""]) + .floating-label {
          top: 0.2rem;
          left: 0.7rem;
          font-size: 0.85rem;
          color: #3b82f6;
          background: inherit;
        }
        .dark .floating-label {
          color: #94a3b8;
        }
        .dark .input:focus + .floating-label {
          color: #60a5fa;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
}
