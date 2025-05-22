import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useCreateX509Certificate } from '@/hooks/observables/useX509certificate';

const MARKING_LABELS = [
  'TLP:CLEAR',
  'TLP:GREEN',
  'TLP:AMBER+STRICT',
  'TLP:AMBER',
  'TLP:RED',
];

export const X509CertificateObservablesCreatePage = () => {
  const navigate = useNavigate();
  const [createCertificate, { loading: creating, error: createError }] = useCreateX509Certificate();
  const [values, setValues] = useState({
    subject: '',
    issuer: '',
    serial_number: '',
    signature_algorithm: '',
    confidence: 100,
    version: '',
    markingLabels: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.subject) newErrors.subject = 'This field is required';
    if (!values.issuer) newErrors.issuer = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await createCertificate({
      variables: {
        input: {
          subject: values.subject,
          issuer: values.issuer,
          serial_number: values.serial_number,
          signature_algorithm: values.signature_algorithm,
          confidence: values.confidence,
          version: values.version,
          object_marking_refs: values.markingLabels ? [values.markingLabels] : [],
        },
      },
    });
    navigate('/observables/x509-certificates');
  };

  const getSliderColor = (val: number) => {
    if (val >= 80) return 'bg-green-600';
    if (val >= 60) return 'bg-lime-400';
    if (val >= 40) return 'bg-yellow-300';
    if (val >= 20) return 'bg-orange-400';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Create an X509 Certificate observable</h1>
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
        {/* Issuer */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.issuer ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="issuer"
              value={values.issuer}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('issuer', e.target.value)}
              placeholder="Issuer"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="issuer"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.issuer ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            Issuer <span className="text-destructive">*</span>
          </Label>
          {errors.issuer && <div className="text-destructive text-xs mt-1">{errors.issuer}</div>}
        </div>
        {/* Serial Number */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="serial_number"
              value={values.serial_number}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('serial_number', e.target.value)}
              placeholder="Serial Number"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="serial_number"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Serial Number
          </Label>
        </div>
        {/* Signature Algorithm */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="signature_algorithm"
              value={values.signature_algorithm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('signature_algorithm', e.target.value)}
              placeholder="Signature Algorithm"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="signature_algorithm"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Signature Algorithm
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
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${getSliderColor(values.confidence)}`}
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
        {/* Version */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="version"
              value={values.version}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('version', e.target.value)}
              placeholder="Version"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="version"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Version
          </Label>
        </div>
        {/* Markings */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Select
              value={values.markingLabels}
              onValueChange={val => handleChange('markingLabels', val)}
            >
              <SelectTrigger id="markings" className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none">
                <SelectValue placeholder="Select marking" />
              </SelectTrigger>
              <SelectContent>
                {MARKING_LABELS.map(label => (
                  <SelectItem key={label} value={label}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {values.markingLabels && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary">{values.markingLabels}</Badge>
              </div>
            )}
          </div>
          <Label
            htmlFor="markings"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Marking
          </Label>
        </div>
        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="default" className="w-full" disabled={creating}>
            {creating ? 'Creating...' : 'Create'}
          </Button>
          {createError && <div className="text-destructive text-xs mt-2">{createError.message}</div>}
        </div>
      </form>
    </div>
  );
};
