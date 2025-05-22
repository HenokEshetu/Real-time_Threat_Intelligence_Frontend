import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useTool, useUpdateTool } from '@/hooks/useTools';
import { ToolType } from '@/types/tool';

const TOOL_TYPES: ToolType[] = [
  'CREDENTIAL_EXPLOITATION',
  'DENIAL_OF_SERVICE',
  'EXPLOITATION',
  'INFORMATION_GATHERING',
  'NETWORK_CAPTURE',
  'REMOTE_ACCESS',
  'UNKNOWN',
  'VULNERABILITY_SCANNING',
];

export const ToolsEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { tool, loading, error } = useTool(id || '');
  const [updateTool, { loading: updating, error: updateError }] = useUpdateTool();

  const [values, setValues] = useState({
    name: '',
    description: '',
    tool_types: '',
    tool_version: '',
    confidence: 100,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (tool) {
      setValues({
        name: tool.name || '',
        description: tool.description || '',
        tool_types: Array.isArray(tool.tool_types) && tool.tool_types.length > 0 ? tool.tool_types[0] : '',
        tool_version: tool.tool_version || '',
        confidence: typeof tool.confidence === 'number' ? tool.confidence : 100,
      });
    }
  }, [tool]);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'This field is required';
    if (!values.tool_types) newErrors.tool_types = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !id) return;
    try {
      await updateTool({
        variables: {
          id,
          input: {
            name: values.name,
            description: values.description,
            tool_types: [values.tool_types],
            tool_version: values.tool_version,
            confidence: Number(values.confidence),
          },
        },
      });
      navigate('/tools');
    } catch (e) {
      // error handled below
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }
  if (error || !tool) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Failed to load tool.
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
        <h1 className="text-lg font-semibold">Update a tool</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Name */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.name ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="name"
              value={values.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
              placeholder="Tool name"
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
        {/* Tool Types */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.tool_types ? 'border-destructive' : 'border-input'} bg-background`}>
            <Select
              value={values.tool_types}
              onValueChange={val => handleChange('tool_types', val)}
            >
              <SelectTrigger id="tool_types" className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none">
                <SelectValue placeholder="Select tool type" />
              </SelectTrigger>
              <SelectContent>
                {TOOL_TYPES.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {values.tool_types && (
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge>{values.tool_types}</Badge>
              </div>
            )}
          </div>
          <Label
            htmlFor="tool_types"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.tool_types ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            Tool type <span className="text-destructive">*</span>
          </Label>
          {errors.tool_types && <div className="text-destructive text-xs mt-1">{errors.tool_types}</div>}
        </div>
        {/* Tool Version */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="tool_version"
              value={values.tool_version}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('tool_version', e.target.value)}
              placeholder="Tool version"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="tool_version"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Tool version
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('confidence', e.target.value)}
              className="w-20 bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
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
