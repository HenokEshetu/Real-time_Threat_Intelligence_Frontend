import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN } from '@/graphql/campaign/mutations';
import { XIcon, Sparkles } from 'lucide-react';

const initialValues = {
  name: '',
  description: '',
  aliases: [] as string[],
  first_seen: '',
  last_seen: '',
  objective: '',
};

export const CampaignsCreatePage = () => {
  const navigate = useNavigate();
  const [createCampaign, { loading, error }] = useMutation(CREATE_CAMPAIGN);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.name) newErrors.name = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const { data } = await createCampaign({
        variables: {
          input: {
            name: values.name,
            description: values.description,
            aliases: values.aliases,
            first_seen: values.first_seen || null,
            last_seen: values.last_seen || null,
            objective: values.objective,
          },
        },
      });
      if (data?.createCampaign?.id) {
        navigate(`/campaigns/${data.createCampaign.id}`);
      } else {
        navigate(-1);
      }
    } catch {
      // error handled below
    }
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <XIcon className="size-5" />
        </Button>
        <h1 className="text-lg font-semibold">Create a campaign</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-6xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Name */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.name ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="name"
              value={values.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
              placeholder="Campaign name"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="name"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium flex items-center gap-1 ${errors.name ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            <Sparkles className="text-purple-500 size-4" />
            Name <span className="text-destructive">*</span>
          </Label>
          {errors.name && <div className="text-destructive text-xs mt-1">{errors.name}</div>}
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
        {/* Aliases */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="aliases"
              value={values.aliases.join(', ')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(
                  'aliases',
                  e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
              placeholder="Comma separated aliases"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
            {values.aliases.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {values.aliases.map((alias: string) => (
                  <Badge key={alias} variant="secondary">{alias}</Badge>
                ))}
              </div>
            )}
          </div>
          <Label
            htmlFor="aliases"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Aliases
          </Label>
        </div>
        {/* First Seen */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="first_seen"
              type="date"
              value={values.first_seen}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('first_seen', e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="first_seen"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            First Seen
          </Label>
        </div>
        {/* Last Seen */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="last_seen"
              type="date"
              value={values.last_seen}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('last_seen', e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="last_seen"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Last Seen
          </Label>
        </div>
        {/* Objective */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="objective"
              value={values.objective}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('objective', e.target.value)}
              placeholder="Objective"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="objective"
            className="absolute -top-3 left-4 bg-background px-2 text-sm font-medium text-muted-foreground"
          >
            Objective
          </Label>
        </div>
        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="default" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
          {error && (
            <div className="text-destructive text-xs mt-2">
              Failed to create campaign.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
