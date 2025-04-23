import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateThreatActor, useUpdateThreatActor, useThreatActorDetail } from '../../hooks/useThreatActors';
import { ArrowLeft, User, Users, Star, Award, Target, Tag, Calendar, Edit3, Info, CheckCircle2, AlertTriangle, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { ThreatActorType } from '../../types/threatActor';

const initialState = {
  type: '',
  name: '',
  description: '',
  roles: [] as string[],
  sophistication: '',
  resource_level: '',
  primary_motivation: '',
  aliases: [] as string[],
  labels: [] as string[],
  first_seen: '',
  last_seen: '',
};

const roleOptions = [
  'director', 'infrastructure-operator', 'malware-author', 'sponsor', 'agent', 'influencer'
];

const typeOptions: { value: ThreatActorType, label: string, icon: React.ReactNode, color: string }[] = [
  { value: "ACTIVIST", label: "Activist", icon: <Award className="w-4 h-4" />, color: "from-pink-500 to-pink-300" },
  { value: "COMPETITOR", label: "Competitor", icon: <Users className="w-4 h-4" />, color: "from-amber-500 to-yellow-300" },
  { value: "CRIME_SYNDICATE", label: "Crime Syndicate", icon: <AlertTriangle className="w-4 h-4" />, color: "from-red-600 to-orange-400" },
  { value: "CRIMINAL", label: "Criminal", icon: <AlertTriangle className="w-4 h-4" />, color: "from-red-400 to-orange-300" },
  { value: "HACKER", label: "Hacker", icon: <User className="w-4 h-4" />, color: "from-blue-600 to-cyan-400" },
  { value: "INSIDER_ACCIDENTAL", label: "Insider (Accidental)", icon: <Info className="w-4 h-4" />, color: "from-gray-400 to-gray-200" },
  { value: "INSIDER_DISGRUNTLED", label: "Insider (Disgruntled)", icon: <Info className="w-4 h-4" />, color: "from-gray-700 to-gray-400" },
  { value: "NATION_STATE", label: "Nation State", icon: <Star className="w-4 h-4" />, color: "from-indigo-700 to-blue-400" },
  { value: "SENSATIONALIST", label: "Sensationalist", icon: <Edit3 className="w-4 h-4" />, color: "from-fuchsia-500 to-pink-300" },
  { value: "SPY", label: "Spy", icon: <User className="w-4 h-4" />, color: "from-green-600 to-green-300" },
  { value: "TERRORIST", label: "Terrorist", icon: <AlertTriangle className="w-4 h-4" />, color: "from-red-800 to-yellow-400" },
  { value: "UNKNOWN", label: "Unknown", icon: <Info className="w-4 h-4" />, color: "from-zinc-400 to-zinc-200" },
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

export default function CreateOrEditThreatActor() {
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { createThreatActor, loading: creating } = useCreateThreatActor();
  const { updateThreatActor, loading: updating } = useUpdateThreatActor();
  const { actor, loading: loadingActor } = useThreatActorDetail(id);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(0);

  // Prefill form in edit mode
  useEffect(() => {
    if (isEdit && actor) {
      setForm({
        type: actor.type || '',
        name: actor.name || '',
        description: actor.description || '',
        roles: actor.roles || [],
        sophistication: actor.sophistication || '',
        resource_level: actor.resource_level || '',
        primary_motivation: actor.primary_motivation || '',
        aliases: actor.aliases || [],
        labels: actor.labels || [],
        first_seen: actor.first_seen || '',
        last_seen: actor.last_seen || '',
      });
    }
  }, [isEdit, actor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value.split(',').map(v => v.trim()).filter(Boolean) });
  };

  const handleTypeChange = (type: ThreatActorType) => {
    setForm({ ...form, type });
  };

  const handleStep = (dir: number) => {
    setStep(s => Math.max(0, Math.min(2, s + dir)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const input = {
        ...form,
        roles: form.roles,
        aliases: form.aliases,
        labels: form.labels,
        first_seen: form.first_seen || undefined,
        last_seen: form.last_seen || undefined,
      };
      if (isEdit && id) {
        const res = await updateThreatActor({ variables: { id, input } });
        setSuccess(true);
        setTimeout(() => navigate(`/threat-actors/${res.data.updateThreatActor.id}`), 1200);
      } else {
        const res = await createThreatActor({ variables: { input } });
        setSuccess(true);
        setTimeout(() => navigate(`/threat-actors/${res.data.createThreatActor.id}`), 1200);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save threat actor');
    }
  };

  if (isEdit && loadingActor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500" />
        <div className="text-blue-700 dark:text-cyan-300 font-semibold text-lg mt-4">Loading Threat Actor...</div>
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
          onClick={() => navigate('/threat-actors')}
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
      </div>
      <div className="w-full max-w-5xl mx-auto bg-white/80 dark:bg-zinc-900/90 rounded-3xl shadow-2xl p-0 md:p-10 relative animate-fade-in-up flex flex-col md:flex-row gap-0 md:gap-8 overflow-hidden border border-blue-100 dark:border-zinc-800 backdrop-blur-2xl">
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
                <span role="img" aria-label="paperclip" className="text-3xl">📎</span>
              </div>
            </div>
          </div>
          {/* Step 1: Basic Info */}
          {step === 0 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 bg-clip-text text-transparent drop-shadow animate-gradient-x mb-2 flex items-center gap-2">
                <Sparkles className="text-blue-400 animate-pulse" /> {isEdit ? 'Edit Threat Actor' : 'Create Threat Actor'}
              </h2>
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Type</label>
                <div className="flex flex-wrap gap-2">
                  {typeOptions.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold shadow transition-all border-2
                        bg-gradient-to-r ${opt.color}
                        ${form.type === opt.value ? 'border-blue-700 scale-105 ring-2 ring-blue-400' : 'border-transparent opacity-80'}
                        hover:scale-105 hover:ring-2 hover:ring-blue-300
                      `}
                      onClick={() => handleTypeChange(opt.value)}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
                <div className="text-xs text-zinc-400 mt-1">Choose the main type of this threat actor.</div>
              </div>
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
                <label className="block font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
                  <Edit3 className="inline w-4 h-4 mr-1" /> Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="input w-full px-4 py-2 rounded-lg border border-blue-200 dark:border-zinc-700 focus:ring-2 focus:ring-blue-400 transition bg-white/70 dark:bg-zinc-900/70"
                  placeholder="Describe this threat actor..."
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn-primary px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
                  onClick={() => handleStep(1)}
                  disabled={!form.name || !form.type}
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
                label="Roles (comma separated)"
                icon={<Users className="inline w-4 h-4 mr-1" />}
                name="roles"
                value={form.roles.join(',')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleArrayChange('roles', e.target.value)}
                placeholder="e.g. director, agent"
              />
              <FloatingLabelInput
                label="Sophistication"
                icon={<Star className="inline w-4 h-4 mr-1" />}
                name="sophistication"
                value={form.sophistication}
                onChange={handleChange}
              />
              <FloatingLabelInput
                label="Resource Level"
                icon={<Award className="inline w-4 h-4 mr-1" />}
                name="resource_level"
                value={form.resource_level}
                onChange={handleChange}
              />
              <FloatingLabelInput
                label="Primary Motivation"
                icon={<Target className="inline w-4 h-4 mr-1" />}
                name="primary_motivation"
                value={form.primary_motivation}
                onChange={handleChange}
              />
              <FloatingLabelInput
                label="Aliases (comma separated)"
                icon={<User className="inline w-4 h-4 mr-1" />}
                name="aliases"
                value={form.aliases.join(',')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleArrayChange('aliases', e.target.value)}
              />
              <FloatingLabelInput
                label="Labels (comma separated)"
                icon={<Tag className="inline w-4 h-4 mr-1" />}
                name="labels"
                value={form.labels.join(',')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleArrayChange('labels', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <FloatingLabelInput
                  label="First Seen"
                  icon={<Calendar className="inline w-4 h-4 mr-1" />}
                  name="first_seen"
                  type="date"
                  value={form.first_seen}
                  onChange={handleChange}
                />
                <FloatingLabelInput
                  label="Last Seen"
                  icon={<Calendar className="inline w-4 h-4 mr-1" />}
                  name="last_seen"
                  type="date"
                  value={form.last_seen}
                  onChange={handleChange}
                />
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
                    <span className="font-bold text-lg">{form.name}</span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-400 text-white shadow">{form.type}</span>
                  </div>
                  <div className="text-zinc-600 dark:text-zinc-300 mb-2">{form.description}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.labels.map(l => (
                      <span key={l} className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-300 to-cyan-200 text-blue-900">{l}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.roles.map(r => (
                      <span key={r} className="px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900">{r}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-zinc-500">
                    <div className="flex items-center"><span className="mr-1">🎓</span><b>Sophistication:</b>&nbsp;{form.sophistication}</div>
                    <div className="flex items-center"><span className="mr-1">💰</span><b>Resource Level:</b>&nbsp;{form.resource_level}</div>
                    <div className="flex items-center"><span className="mr-1">🎯</span><b>Primary Motivation:</b>&nbsp;{form.primary_motivation}</div>
                    <div className="flex items-center"><span className="mr-1">🕵️</span><b>Aliases:</b>&nbsp;{form.aliases.join(', ')}</div>
                    <div className="flex items-center"><span className="mr-1">📅</span><b>First Seen:</b>&nbsp;{form.first_seen}</div>
                    <div className="flex items-center"><span className="mr-1">⏰</span><b>Last Seen:</b>&nbsp;{form.last_seen}</div>
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
                  className="btn-primary px-8 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold shadow-lg hover:scale-105 transition flex items-center gap-2"
                  disabled={creating || updating}
                >
                  {creating || updating ? (
                    <span className="animate-spin mr-2"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4" strokeDasharray="60" strokeDashoffset="20" /></svg></span>
                  ) : <CheckCircle2 className="w-5 h-5" />}
                  {isEdit ? 'Update' : 'Create'}
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
}