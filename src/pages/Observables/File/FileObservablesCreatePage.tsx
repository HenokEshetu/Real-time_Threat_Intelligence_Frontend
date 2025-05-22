import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
// You may need to implement or import the mutation for creating a file observable
// import { useCreateFile } from '@/hooks/observables/useFiles';

const FILE_TYPES = [
  'document', 'image', 'executable', 'archive', 'script', 'other'
];
const MARKING_LABELS = [
  'TLP:CLEAR',
  'TLP:GREEN',
  'TLP:AMBER+STRICT',
  'TLP:AMBER',
  'TLP:RED',
];

export const FileObservablesCreatePage = () => {
  const navigate = useNavigate();
  // const [createFile, { loading: creating, error: createError }] = useCreateFile();
  const [values, setValues] = useState({
    name: '',
    type: '',
    confidence: 100,
    description: '',
    markingLabels: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'This field is required';
    if (!values.type) newErrors.type = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // await createFile({ variables: { ...values } });
    // navigate('/observables/files');
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
        <h1 className="text-lg font-semibold">Create a file observable</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Name */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.name ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="name"
              value={values.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
              placeholder="File name"
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
        {/* Type */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.type ? 'border-destructive' : 'border-input'} bg-background`}>
            <Select
              value={values.type}
              onValueChange={val => handleChange('type', val)}
            >
              <SelectTrigger id="type" className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none">
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                {FILE_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {values.type && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge>{values.type}</Badge>
              </div>
            )}
          </div>
          <Label
            htmlFor="type"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.type ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            File type <span className="text-destructive">*</span>
          </Label>
          {errors.type && <div className="text-destructive text-xs mt-1">{errors.type}</div>}
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
        {/* Description */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <textarea
              id="description"
              value={values.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('description', e.target.value)}
              placeholder="Write a description..."
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
          <Button type="submit" variant="default" className="w-full">Create</Button>
        </div>
      </form>
    </div>
  );
};
