import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@apollo/client';
import { GET_REPORT } from '@/graphql/report/report';

const REPORT_TYPES = ['internal-report', 'misp-event', 'threat-report'];
const RELIABILITY_OPTIONS = [
  'A - Completely reliable',
  'B - Usually reliable',
  'C - Fairly reliable',
  'D - Not usually reliable',
  'E - Unreliable',
  'F - Reliability cannot be judged',
];
const CONFIDENCE_LEVELS = [
  { value: 100, label: '1 - Confirmed by other sources' },
  { value: 80, label: '2 - Probably True' },
  { value: 60, label: '3 - Possibly True' },
  { value: 40, label: '4 - Doubtful' },
  { value: 20, label: '5 - Improbable' },
  { value: 0, label: '6 - Truth Cannot be judged' },
];
const MARKING_LABELS = [
  'TLP:CLEAR',
  'TLP:GREEN',
  'TLP:AMBER+STRICT',
  'TLP:AMBER',
  'TLP:RED',
];

export const ReportsEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REPORT, { variables: { id } });

  const [values, setValues] = useState({
    name: '',
    published: '',
    report_types: '',
    reliability: '',
    confidence: 100,
    confidenceLevel: CONFIDENCE_LEVELS[0].label,
    description: '',
    markingLabels: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (data?.report) {
      const report = data.report;
      setValues({
        name: report.name || '',
        published: report.published ? report.published.slice(0, 10) : '',
        report_types: Array.isArray(report.report_types) && report.report_types.length > 0 ? report.report_types[0] : '',
        reliability: report.reliability || '',
        confidence: typeof report.confidence === 'number' ? report.confidence : 100,
        confidenceLevel:
          CONFIDENCE_LEVELS.find(l => l.value === report.confidence)?.label ||
          CONFIDENCE_LEVELS[0].label,
        description: report.description || '',
        markingLabels: Array.isArray(report.object_marking_refs) && report.object_marking_refs.length > 0 ? report.object_marking_refs[0] : '',
      });
    }
  }, [data]);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'This field is required';
    if (!values.published) newErrors.published = 'This field is required';
    if (!values.report_types) newErrors.report_types = 'This field is required';
    if (!values.reliability) newErrors.reliability = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // submit update logic here
  };

  const getConfidenceLabel = (val: number) => {
    for (let i = 0; i < CONFIDENCE_LEVELS.length; i++) {
      if (val >= CONFIDENCE_LEVELS[i].value) return CONFIDENCE_LEVELS[i].label;
    }
    return CONFIDENCE_LEVELS[CONFIDENCE_LEVELS.length - 1].label;
  };

  const getConfidenceValue = (label: string) => {
    const found = CONFIDENCE_LEVELS.find((l) => l.label === label);
    return found ? found.value : 0;
  };

  const getSliderColor = (val: number) => {
    if (val >= 80) return 'bg-green-600';
    if (val >= 60) return 'bg-lime-400';
    if (val >= 40) return 'bg-yellow-300';
    if (val >= 20) return 'bg-orange-400';
    return 'bg-red-500';
  };

  const handleConfidenceChange = (field: 'confidence' | 'confidenceLevel', value: number | string) => {
    if (field === 'confidence') {
      const num = typeof value === 'number' ? value : parseInt(value as string, 10);
      setValues((prev) => ({
        ...prev,
        confidence: num,
        confidenceLevel: getConfidenceLabel(num),
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        confidenceLevel: value as string,
        confidence: getConfidenceValue(value as string),
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }
  if (error || !data?.report) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Failed to load report.
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
        <h1 className="text-lg font-semibold">Update a report</h1>
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
        {/* Report Types */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.report_types ? 'border-destructive' : 'border-input'} bg-background`}>
            <Select
              value={values.report_types}
              onValueChange={val => handleChange('report_types', val)}
            >
              <SelectTrigger id="report_types" className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {REPORT_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {values.report_types && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge>{values.report_types}</Badge>
              </div>
            )}
          </div>
          <Label
            htmlFor="report_types"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.report_types ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            Report type <span className="text-destructive">*</span>
          </Label>
          {errors.report_types && (
            <div className="text-destructive text-xs mt-1">{errors.report_types}</div>
          )}
        </div>
        {/* Reliability */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.reliability ? 'border-destructive' : 'border-input'} bg-background`}>
            <Select
              value={values.reliability}
              onValueChange={val => handleChange('reliability', val)}
            >
              <SelectTrigger id="reliability" className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none">
                <SelectValue placeholder="Select reliability" />
              </SelectTrigger>
              <SelectContent>
                {RELIABILITY_OPTIONS.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Label
            htmlFor="reliability"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.reliability ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            Reliability <span className="text-destructive">*</span>
          </Label>
          {errors.reliability && <div className="text-destructive text-xs mt-1">{errors.reliability}</div>}
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleConfidenceChange('confidence', Number(e.target.value))}
                className="w-20 bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
              />
              <Select
                value={values.confidenceLevel}
                onValueChange={val => handleConfidenceChange('confidenceLevel', val)}
              >
                <SelectTrigger className="min-w-[220px] bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none">
                  <SelectValue placeholder="Select confidence" />
                </SelectTrigger>
                <SelectContent>
                  {CONFIDENCE_LEVELS.map(level => (
                    <SelectItem key={level.label} value={level.label}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full mt-2">
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={values.confidence}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleConfidenceChange('confidence', Number(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${getSliderColor(values.confidence)}`}
                style={{ accentColor: 'currentColor' }}
              />
            </div>
          </div>
          <Label
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Confidence level
          </Label>
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
          <Button type="submit" variant="default" className="w-full">Update</Button>
        </div>
      </form>
    </div>
  );
};
