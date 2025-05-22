import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useEmailMessage, useUpdateEmailMessage } from '@/hooks/observables/useEmailMessage';

const MARKING_LABELS = [
  'TLP:CLEAR',
  'TLP:GREEN',
  'TLP:AMBER+STRICT',
  'TLP:AMBER',
  'TLP:RED',
];

export const EmailMessageObservablesEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { emailMessage, loading, error } = useEmailMessage(id || '');
  const [updateEmailMessage, { loading: updating, error: updateError }] = useUpdateEmailMessage();

  const [values, setValues] = useState({
    subject: '',
    from_ref: '',
    to_refs: '',
    confidence: 100,
    labels: '',
    markingLabels: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (emailMessage) {
      setValues({
        subject: emailMessage.subject || '',
        from_ref: emailMessage.from_ref || '',
        to_refs: Array.isArray(emailMessage.to_refs) ? emailMessage.to_refs.join(', ') : '',
        confidence: typeof emailMessage.confidence === 'number' ? emailMessage.confidence : 100,
        labels: Array.isArray(emailMessage.labels) ? emailMessage.labels.join(', ') : '',
        markingLabels: Array.isArray(emailMessage.object_marking_refs) && emailMessage.object_marking_refs.length > 0 ? emailMessage.object_marking_refs[0] : '',
      });
    }
  }, [emailMessage]);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.subject) newErrors.subject = 'This field is required';
    if (!values.from_ref) newErrors.from_ref = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !id) return;
    await updateEmailMessage({
      variables: {
        id,
        input: {
          subject: values.subject,
          from_ref: values.from_ref,
          to_refs: values.to_refs ? values.to_refs.split(',').map((s) => s.trim()) : [],
          confidence: Number(values.confidence),
          labels: values.labels ? values.labels.split(',').map((s) => s.trim()) : [],
          object_marking_refs: values.markingLabels ? [values.markingLabels] : [],
        },
      },
    });
    navigate('/observables/emailmessages');
  };

  const getSliderColor = (val: number) => {
    if (val >= 80) return 'bg-green-600';
    if (val >= 60) return 'bg-lime-400';
    if (val >= 40) return 'bg-yellow-300';
    if (val >= 20) return 'bg-orange-400';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }
  if (error || !emailMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Failed to load email message observable.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Update an email message observable</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Subject */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.subject ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="subject"
              value={values.subject}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('subject', e.target.value)}
              placeholder="Subject"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="subject"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.subject ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            Subject <span className="text-destructive">*</span>
          </Label>
          {errors.subject && <div className="text-destructive text-xs mt-1">{errors.subject}</div>}
        </div>
        {/* From */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.from_ref ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="from_ref"
              value={values.from_ref}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('from_ref', e.target.value)}
              placeholder="From"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="from_ref"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.from_ref ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            From <span className="text-destructive">*</span>
          </Label>
          {errors.from_ref && <div className="text-destructive text-xs mt-1">{errors.from_ref}</div>}
        </div>
        {/* To */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="to_refs"
              value={values.to_refs}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('to_refs', e.target.value)}
              placeholder="To (comma separated)"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="to_refs"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            To
          </Label>
        </div>
        {/* Confidence */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={0}
                max={100}
                value={values.confidence}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('confidence', Number(e.target.value))}
                className="w-20 bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
              />
            </div>
            <div className="w-full mt-2">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={values.confidence}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('confidence', Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${getSliderColor(Number(values.confidence))}`}
                style={{ accentColor: 'currentColor' }}
              />
            </div>
          </div>
          <Label
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Confidence
          </Label>
        </div>
        {/* Labels */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="labels"
              value={values.labels}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('labels', e.target.value)}
              placeholder="Labels (comma separated)"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
            {values.labels && (
              <div className="flex flex-wrap gap-1 mt-2">
                {values.labels.split(',').map((label) => (
                  <Badge key={label.trim()}>{label.trim()}</Badge>
                ))}
              </div>
            )}
          </div>
          <Label
            htmlFor="labels"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Labels
          </Label>
        </div>
        {/* Markings */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <select
              id="markingLabels"
              value={values.markingLabels}
              onChange={e => handleChange('markingLabels', e.target.value)}
              className="w-full bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            >
              <option value="">Select marking</option>
              {MARKING_LABELS.map(label => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>
            {values.markingLabels && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary">{values.markingLabels}</Badge>
              </div>
            )}
          </div>
          <Label
            htmlFor="markingLabels"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Marking
          </Label>
        </div>
        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="default" className="w-full" disabled={updating}>
            {updating ? 'Updating...' : 'Update'}
          </Button>
          {updateError && <div className="text-destructive text-xs mt-2">{updateError.message}</div>}
        </div>
      </form>
    </div>
  );
};
