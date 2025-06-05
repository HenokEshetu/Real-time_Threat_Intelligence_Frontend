import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_REPORT } from '@/graphql/report/mutations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const REPORT_TYPES = ['internal-report', 'misp-event', 'threat-report'];
const MARKING_LABELS = [
  'TLP:CLEAR',
  'TLP:GREEN',
  'TLP:AMBER+STRICT',
  'TLP:AMBER',
  'TLP:RED',
];

type ExternalReference = {
  source_name: string;
  url: string;
  external_id: string;
};

type FormState = {
  name: string;
  description: string;
  report_types: string[];
  published: string;
  authors: string[];
  object_refs: string[];
  confidence: number;
  labels: string[];
  lang: string;
  revoked: boolean;
  spec_version: string;
  type: string;
  created_by_ref: string;
  external_references: ExternalReference[];
  object_marking_refs: string[];
};

export const ReportsCreatePage = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormState>({
    name: '',
    description: '',
    report_types: [],
    published: '',
    authors: [],
    object_refs: [],
    confidence: 100,
    labels: [],
    lang: '',
    revoked: false,
    spec_version: '2.1',
    type: 'report',
    created_by_ref: '',
    external_references: [],
    object_marking_refs: [],
  });
  const [externalRef, setExternalRef] = useState<ExternalReference>({ source_name: '', url: '', external_id: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [createReport, { loading, error }] = useMutation(CREATE_REPORT);

  const handleArrayChange = (field: keyof FormState, value: string) => {
    setValues(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v: string) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleChange = (field: keyof FormState, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'This field is required';
    if (!values.published) newErrors.published = 'This field is required';
    if (values.report_types.length === 0) newErrors.report_types = 'At least one type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddExternalRef = () => {
    if (!externalRef.source_name) return;
    setValues(prev => ({
      ...prev,
      external_references: [...prev.external_references, externalRef],
    }));
    setExternalRef({ source_name: '', url: '', external_id: '' });
  };

  const handleRemoveExternalRef = (idx: number) => {
    setValues(prev => ({
      ...prev,
      external_references: prev.external_references.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    if (!validate()) return;

    let publishedISO = values.published;
    if (values.published && !values.published.endsWith('Z')) {
      publishedISO = new Date(values.published).toISOString();
    }

    try {
      await createReport({
        variables: {
          input: {
            ...values,
            published: publishedISO,
            revoked: !!values.revoked,
            authors: values.authors.filter(Boolean),
            object_refs: values.object_refs.filter(Boolean),
            labels: values.labels.filter(Boolean),
            object_marking_refs: values.object_marking_refs.filter(Boolean),
            external_references: values.external_references.filter(ref => ref.source_name),
          },
        },
      });
      setSuccess(true);
      setTimeout(() => {
        navigate('/reports');
      }, 1200);
    } catch (err) {
      // Error handled by Apollo
    }
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Create a report</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Name */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.name ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="name"
              value={values.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
              placeholder="Report name"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="name"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.name ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            Name <span className="text-destructive">*</span>
          </Label>
          {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
        </div>
        {/* Published */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.published ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="published"
              type="date"
              value={values.published}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('published', e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="published"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.published ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            Publication date <span className="text-destructive">*</span>
          </Label>
          {errors.published && <div className="text-destructive text-xs mt-1">{errors.published}</div>}
        </div>
        {/* Report Types (multi-select) */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.report_types ? 'border-destructive' : 'border-input'} bg-background`}>
            <div className="flex flex-wrap gap-2">
              {REPORT_TYPES.map(type => (
                <Badge
                  key={type}
                  variant={values.report_types.includes(type) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleArrayChange('report_types', type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
            {values.report_types.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {values.report_types.map(type => (
                  <Badge key={type} variant="secondary">{type}</Badge>
                ))}
              </div>
            )}
          </div>
          <Label
            htmlFor="report_types"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.report_types ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            Report type <span className="text-destructive">*</span>
          </Label>
          {errors.report_types && <div className="text-destructive text-xs mt-1">{errors.report_types}</div>}
        </div>
        {/* Description */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <textarea
              id="description"
              value={values.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('description', e.target.value)}
              placeholder="Write a description in markdown..."
              rows={4}
              className="w-full bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none resize-none"
            />
          </div>
          <Label
            htmlFor="description"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Description
          </Label>
        </div>
        {/* Authors (comma separated) */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="authors"
              value={values.authors.join(',')}
              onChange={e => handleChange('authors', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="Comma separated authors"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="authors"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Authors
          </Label>
        </div>
        {/* Object Refs (comma separated) */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="object_refs"
              value={values.object_refs.join(',')}
              onChange={e => handleChange('object_refs', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="Comma separated object refs"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="object_refs"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Object Refs
          </Label>
        </div>
        {/* Confidence */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              type="number"
              min={0}
              max={100}
              value={values.confidence}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('confidence', Number(e.target.value))}
              className="w-20 bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Confidence
          </Label>
        </div>
        {/* Labels (multi, comma separated) */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="labels"
              value={values.labels.join(',')}
              onChange={e => handleChange('labels', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="Comma separated labels"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
            {values.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {values.labels.map(label => (
                  <Badge key={label} variant="secondary">{label}</Badge>
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
        {/* Lang */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="lang"
              value={values.lang}
              onChange={e => handleChange('lang', e.target.value)}
              placeholder="Language (e.g. en)"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="lang"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Language
          </Label>
        </div>
        {/* Revoked */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background flex items-center gap-2">
            <input
              id="revoked"
              type="checkbox"
              checked={values.revoked}
              onChange={e => handleChange('revoked', e.target.checked)}
              className="mr-2"
            />
            <Label htmlFor="revoked" className="text-sm font-medium text-muted-foreground">
              Revoked
            </Label>
          </div>
        </div>
        {/* Spec Version */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="spec_version"
              value={values.spec_version}
              onChange={e => handleChange('spec_version', e.target.value)}
              placeholder="Spec Version"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="spec_version"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Spec Version
          </Label>
        </div>
        {/* Type */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="type"
              value={values.type}
              onChange={e => handleChange('type', e.target.value)}
              placeholder="Type"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="type"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Type
          </Label>
        </div>
        {/* Created By Ref */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="created_by_ref"
              value={values.created_by_ref}
              onChange={e => handleChange('created_by_ref', e.target.value)}
              placeholder="Created By Ref"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="created_by_ref"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Created By Ref
          </Label>
        </div>
        {/* Object Marking Refs (multi, comma separated) */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="object_marking_refs"
              value={values.object_marking_refs.join(',')}
              onChange={e => handleChange('object_marking_refs', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
              placeholder="Comma separated marking refs"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
            {values.object_marking_refs.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {values.object_marking_refs.map(ref => (
                  <Badge key={ref} variant="secondary">{ref}</Badge>
                ))}
              </div>
            )}
          </div>
          <Label
            htmlFor="object_marking_refs"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Object Marking Refs
          </Label>
        </div>
        {/* External References (array of objects) */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Source Name"
                  value={externalRef.source_name}
                  onChange={e => setExternalRef(r => ({ ...r, source_name: e.target.value }))}
                  className="w-1/3"
                />
                <Input
                  placeholder="URL"
                  value={externalRef.url}
                  onChange={e => setExternalRef(r => ({ ...r, url: e.target.value }))}
                  className="w-1/3"
                />
                <Input
                  placeholder="External ID"
                  value={externalRef.external_id}
                  onChange={e => setExternalRef(r => ({ ...r, external_id: e.target.value }))}
                  className="w-1/3"
                />
                <Button type="button" onClick={handleAddExternalRef} size="sm">Add</Button>
              </div>
              {values.external_references.length > 0 && (
                <div className="flex flex-col gap-1 mt-2">
                  {values.external_references.map((ref, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Badge variant="secondary">{ref.source_name}</Badge>
                      <span className="text-xs text-blue-700">{ref.url}</span>
                      <span className="text-xs text-gray-500">{ref.external_id}</span>
                      <Button type="button" size="xs" variant="ghost" onClick={() => handleRemoveExternalRef(idx)}>Remove</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Label
            htmlFor="external_references"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            External References
          </Label>
        </div>
        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
          {success && <div className="text-green-600 mt-2">Report created successfully!</div>}
          {error && <div className="text-destructive mt-2">{error.message}</div>}
        </div>
      </form>
    </div>
  );
};
