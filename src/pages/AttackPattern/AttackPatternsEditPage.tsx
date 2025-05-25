import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAttackPatternDetail, useUpdateAttackPattern } from '@/hooks/observables/useAttackPattern';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';

export const AttackPatternsEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { attackPattern, loading, error } = useAttackPatternDetail(id);
  const { updateAttackPattern, loading: updating, error: updateError } = useUpdateAttackPattern();

  const [form, setForm] = useState({
    name: '',
    description: '',
    aliases: '',
    labels: '',
    confidence: '',
    revoked: false,
    lang: '',
  });

  useEffect(() => {
    if (attackPattern) {
      setForm({
        name: attackPattern.name || '',
        description: attackPattern.description || '',
        aliases: (attackPattern.aliases || []).join(', '),
        labels: (attackPattern.labels || []).join(', '),
        confidence: attackPattern.confidence?.toString() || '',
        revoked: !!attackPattern.revoked,
        lang: attackPattern.lang || '',
      });
    }
  }, [attackPattern]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    const input = {
      name: form.name,
      description: form.description,
      aliases: form.aliases.split(',').map(a => a.trim()).filter(Boolean),
      labels: form.labels.split(',').map(l => l.trim()).filter(Boolean),
      confidence: form.confidence ? Number(form.confidence) : undefined,
      revoked: form.revoked,
      lang: form.lang,
    };
    try {
      await updateAttackPattern({ variables: { id, input } });
      navigate(`/attack-patterns/${id}`);
    } catch {}
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!attackPattern) return <ErrorMessage message="Attack Pattern not found" />;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Attack Pattern</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Name
          <Input name="name" required value={form.name} onChange={handleChange} />
        </label>
        <label className="block">
          Description
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border rounded p-2"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <label className="block">
          Aliases (comma separated)
          <Input name="aliases" value={form.aliases} onChange={handleChange} />
        </label>
        <label className="block">
          Labels (comma separated)
          <Input name="labels" value={form.labels} onChange={handleChange} />
        </label>
        <label className="block">
          Confidence (number)
          <Input name="confidence" type="number" value={form.confidence} onChange={handleChange} />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="revoked" checked={form.revoked} onChange={handleChange} />
          Revoked
        </label>
        <label className="block">
          Language
          <Input name="lang" value={form.lang} onChange={handleChange} />
        </label>
        <Button type="submit" disabled={updating}>Update</Button>
        {updating && <Loading />}
        {updateError && <ErrorMessage message={updateError.message} />}
      </form>
    </div>
  );
};
