import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useIdentityDetail, useUpdateIdentity } from '../../hooks/useIdentity';
import {
  User, Tag, Briefcase, Building2, Globe2, Mail, ChevronRight, ChevronLeft, CheckCircle2, Sparkles, AlertTriangle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const identityClassOptions = [
  'individual', 'group', 'organization', 'class', 'unknown'
];

function FloatingLabelInput({ label, icon, ...props }: any) {
  return (
    <div className="relative">
      <input
        {...props}
        className={`peer input w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-400 transition placeholder-transparent`}
        placeholder=" "
      />
      <label className="absolute left-4 top-2 text-zinc-500 dark:text-zinc-400 text-sm pointer-events-none transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 bg-white dark:bg-zinc-900 px-1">
        {icon} {label}
      </label>
    </div>
  );
}

export const IdentityEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { identity, loading } = useIdentityDetail(id);
  const { updateIdentity, loading: saving } = useUpdateIdentity();
  const [form, setForm] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (identity) setForm({ ...identity });
  }, [identity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleArrayChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value.split(',').map((v: string) => v.trim()).filter(Boolean) });
  };

  const handleStep = (dir: number) => {
    setStep(s => Math.max(0, Math.min(2, s + dir)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await updateIdentity({ variables: { id, input: form } });
      setSuccess(true);
      setTimeout(() => navigate(`/identity/${id}`), 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to update');
    }
  };

  if (loading || !form) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500" />
        <div className="text-blue-700 dark:text-cyan-300 font-semibold text-lg mt-4">Loading Identity...</div>
      </div>
    );
  }

  // Stepper progress
  const steps = [
    { label: "Basic Info", icon: <User className="w-4 h-4" /> },
    { label: "Attributes", icon: <Tag className="w-4 h-4" /> },
    { label: "Review", icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  // Helper for animated stepper
  const StepCircle = ({ active, done, icon }: any) => (
    <div className={`transition-all duration-300 rounded-full w-12 h-12 flex items-center justify-center shadow-lg
      ${active ? 'bg-gradient-to-br from-blue-600 to-cyan-400 scale-110 ring-4 ring-blue-200' : done ? 'bg-gradient-to-br from-green-400 to-cyan-300' : 'bg-gradient-to-br from-zinc-400 to-zinc-200 opacity-60'}
      `}>
      {icon}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 relative">
      {/* Sparkle background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Sparkles className="absolute top-10 left-10 w-24 h-24 text-blue-200 opacity-30 animate-spin-slow" />
        <Sparkles className="absolute bottom-10 right-10 w-32 h-32 text-cyan-200 opacity-20 animate-spin-slow" />
      </div>
      <div className="absolute top-6 left-6 z-10">
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition"
          onClick={() => navigate('/identity')}
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
      </div>
      <div className="w-full max-w-4xl mx-auto bg-white/80 dark:bg-zinc-900/90 rounded-3xl shadow-2xl p-0 md:p-10 relative animate-fade-in-up flex flex-col md:flex-row gap-0 md:gap-8 overflow-hidden border border-blue-100 dark:border-zinc-800 backdrop-blur-2xl">
        {/* Stepper */}
        <div className="hidden md:flex flex-col items-center justify-start pt-8 pr-8 min-w-[140px] sticky top-10">
          <div className="flex flex-col gap-8">
            {steps.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center">
                <StepCircle active={step === i} done={step > i} icon={s.icon} />
                <div className={`mt-2 text-xs font-semibold ${step === i ? 'text-blue-700 dark:text-cyan-300' : 'text-zinc-400'}`}>{s.label}</div>
                {i < steps.length - 1 && <div className="w-1 h-8 bg-gradient-to-b from-blue-200 to-blue-50 dark:from-zinc-700 dark:to-zinc-900 mx-auto" />}
              </div>
            ))}
          </div>
        </div>
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="flex-1 space-y-8 py-8 px-4 md:px-0 relative">
          {/* Floating Avatar Preview */}
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 blur-2xl opacity-30 animate-float" />
              <div className="rounded-full bg-gradient-to-br from-blue-400 to-blue-700 dark:from-blue-900 dark:to-blue-700 w-16 h-16 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg border-4 border-white dark:border-zinc-900 z-10 relative">
                <User className="w-8 h-8" />
              </div>
            </div>
          </div>
          {/* Step 1: Basic Info */}
          {step === 0 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow animate-gradient-x mb-2 flex items-center gap-2">
                <Sparkles className="text-blue-400 animate-pulse" /> Edit Identity
              </h2>
              <FloatingLabelInput
                label="Name"
                icon={<User className="inline w-4 h-4 mr-1" />}
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoFocus
              />
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Identity Class</label>
                <div className="flex flex-wrap gap-2">
                  {identityClassOptions.map(opt => (
                    <button
                      key={opt}
                      type="button"
                      className={`px-3 py-1 rounded-full font-semibold shadow transition-all border-2
                        bg-gradient-to-r from-blue-200 to-cyan-100
                        ${form.identity_class === opt ? 'border-blue-700 scale-105 ring-2 ring-blue-400' : 'border-transparent opacity-80'}
                        hover:scale-105 hover:ring-2 hover:ring-blue-300
                      `}
                      onClick={() => setForm((f: any) => ({ ...f, identity_class: opt }))}
                    >
                      <Building2 className="inline w-4 h-4 mr-1" /> {opt}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Choose the class for this identity.</div>
              </div>
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
                  <Tag className="inline w-4 h-4 mr-1" /> Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 transition bg-white/70 dark:bg-zinc-900/70"
                  placeholder="Describe this identity..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn-primary px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
                  onClick={() => handleStep(1)}
                  disabled={!form.name || !form.identity_class}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          {/* Step 2: Attributes */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-cyan-300 mb-2 flex items-center gap-2">
                <Tag className="w-5 h-5" /> Attributes
              </h2>
              <FloatingLabelInput
                label="Sectors (comma separated)"
                icon={<Globe2 className="inline w-4 h-4 mr-1" />}
                name="sectors"
                value={form.sectors?.join(',') || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleArrayChange('sectors', e.target.value)}
                placeholder="e.g. government, finance"
              />
              <FloatingLabelInput
                label="Contact Information"
                icon={<Mail className="inline w-4 h-4 mr-1" />}
                name="contact_information"
                value={form.contact_information || ''}
                onChange={handleChange}
                placeholder="Email, phone, etc."
              />
              <FloatingLabelInput
                label="Roles (comma separated)"
                icon={<Briefcase className="inline w-4 h-4 mr-1" />}
                name="roles"
                value={form.roles?.join(',') || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleArrayChange('roles', e.target.value)}
                placeholder="e.g. admin, user"
              />
              <FloatingLabelInput
                label="Labels (comma separated)"
                icon={<Tag className="inline w-4 h-4 mr-1" />}
                name="labels"
                value={form.labels?.join(',') || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleArrayChange('labels', e.target.value)}
                placeholder="e.g. trusted, external"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn-secondary px-6 py-2 rounded-full bg-gradient-to-r from-zinc-300 to-zinc-100 text-zinc-700 font-bold shadow hover:scale-105 transition flex items-center gap-2"
                  onClick={() => handleStep(-1)}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  className="btn-primary px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
                  onClick={() => handleStep(1)}
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          {/* Step 3: Review & Submit */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-blue-700 dark:text-cyan-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Review & Submit
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-blue-200 dark:from-zinc-900 dark:to-zinc-800 border border-blue-100 dark:border-zinc-800 rounded-xl shadow-lg p-6">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-6 h-6 text-blue-400" />
                    <span className="font-bold text-lg">{form.name}</span>
                    <Badge variant="outline" className="ml-2">{form.identity_class}</Badge>
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-300 mb-2">{form.description}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.sectors?.map((s: string, i: number) => (
                      <Badge key={s} variant="secondary">{s}</Badge>
                    ))}
                    {form.roles?.map((r: string, i: number) => (
                      <Badge key={r} variant="secondary">{r}</Badge>
                    ))}
                    {form.labels?.map((l: string, i: number) => (
                      <Badge key={l} variant="secondary">{l}</Badge>
                    ))}
                  </div>
                  <div className="text-sm mt-2">
                    <span className="font-semibold">Contact:</span> {form.contact_information || '—'}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  className="btn-secondary px-6 py-2 rounded-full bg-gradient-to-r from-zinc-300 to-zinc-100 text-zinc-700 font-bold shadow hover:scale-105 transition flex items-center gap-2"
                  onClick={() => handleStep(-1)}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
                  disabled={saving}
                >
                  {saving ? (
                    <span className="animate-spin mr-2"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" strokeDasharray="60" strokeDashoffset="20" /></svg></span>
                  ) : <CheckCircle2 className="w-5 h-5" />}
                  Save
                </button>
              </div>
              {error && (
                <div className="flex items-center gap-2 mt-2 text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2 animate-fade-in">
                  <AlertTriangle className="w-5 h-5" /> {error}
                </div>
              )}
              {success && (
                <div className="flex items-center gap-2 mt-2 text-green-700 bg-green-50 border border-green-200 rounded px-3 py-2 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5" /> Success! Redirecting...
                </div>
              )}
            </div>
          )}
        </form>
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
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px) scale(0.98);}
            to { opacity: 1; transform: translateY(0) scale(1);}
          }
          .animate-fade-in { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
          .animate-fade-in-up { animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1) both; }
          .animate-spin-slow { animation: spin 12s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes float {
            0%,100% { transform: translateY(0) }
            50% { transform: translateY(-20px) }
          }
          .animate-float { animation: float 6s ease-in-out infinite; }
          .animate-float-slow { animation: float 12s ease-in-out infinite; }
        `}
      </style>
    </div>
  );
};
