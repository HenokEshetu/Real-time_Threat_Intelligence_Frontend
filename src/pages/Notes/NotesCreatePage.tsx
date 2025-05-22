import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateNote } from '@/hooks/useNotes';

export const NotesCreatePage = () => {
  const navigate = useNavigate();
  const [createNote, { loading, error }] = useCreateNote();
  const [values, setValues] = useState({
    abstract: '',
    content: '',
    authors: '',
    confidence: 100,
    content_type: '',
    lang: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.abstract) newErrors.abstract = 'This field is required';
    if (!values.content) newErrors.content = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createNote({
        variables: {
          input: {
            abstract: values.abstract,
            content: values.content,
            authors: values.authors ? values.authors.split(',').map((a) => a.trim()) : [],
            confidence: Number(values.confidence),
            content_type: values.content_type,
            lang: values.lang,
          },
        },
      });
      navigate('/notes');
    } catch {}
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Create a note</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Abstract */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.abstract ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="abstract"
              value={values.abstract}
              onChange={e => handleChange('abstract', e.target.value)}
              placeholder="Abstract"
              className="bg-transparent border-none p-0 focus:ring-0"
            />
          </div>
          <Label htmlFor="abstract" className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.abstract ? 'text-destructive' : 'text-muted-foreground'}`}>
            Abstract <span className="text-destructive">*</span>
          </Label>
          {errors.abstract && <div className="text-destructive text-xs mt-1">{errors.abstract}</div>}
        </div>
        {/* Content */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.content ? 'border-destructive' : 'border-input'} bg-background`}>
            <textarea
              id="content"
              value={values.content}
              onChange={e => handleChange('content', e.target.value)}
              placeholder="Content"
              rows={4}
              className="w-full bg-transparent border-none p-0 focus:ring-0 resize-none"
            />
          </div>
          <Label htmlFor="content" className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.content ? 'text-destructive' : 'text-muted-foreground'}`}>
            Content <span className="text-destructive">*</span>
          </Label>
          {errors.content && <div className="text-destructive text-xs mt-1">{errors.content}</div>}
        </div>
        {/* Authors */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="authors"
              value={values.authors}
              onChange={e => handleChange('authors', e.target.value)}
              placeholder="Authors (comma separated)"
              className="bg-transparent border-none p-0 focus:ring-0"
            />
          </div>
          <Label htmlFor="authors" className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground">
            Authors
          </Label>
        </div>
        {/* Confidence */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="confidence"
              type="number"
              min={0}
              max={100}
              value={values.confidence}
              onChange={e => handleChange('confidence', e.target.value)}
              className="w-24 bg-transparent border-none p-0 focus:ring-0"
            />
          </div>
          <Label htmlFor="confidence" className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground">
            Confidence
          </Label>
        </div>
        {/* Content Type */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="content_type"
              value={values.content_type}
              onChange={e => handleChange('content_type', e.target.value)}
              placeholder="Content Type"
              className="bg-transparent border-none p-0 focus:ring-0"
            />
          </div>
          <Label htmlFor="content_type" className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground">
            Content Type
          </Label>
        </div>
        {/* Lang */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="lang"
              value={values.lang}
              onChange={e => handleChange('lang', e.target.value)}
              placeholder="Language"
              className="bg-transparent border-none p-0 focus:ring-0"
            />
          </div>
          <Label htmlFor="lang" className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground">
            Language
          </Label>
        </div>
        {/* Error */}
        {error && <div className="text-destructive text-sm">{error.message}</div>}
        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </div>
  );
};
