import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useMacAddress, useUpdateMacAddress } from '@/hooks/observables/useMacAddress';
import { Loading } from '@/components/common/Loading/Loading';
import { ErrorMessage } from '@/components/common/ErrorMessage/ErrorMessage';

const MAC_TYPES = [
  'mac-addr',
];
const MARKING_LABELS = [
  'TLP:CLEAR',
  'TLP:GREEN',
  'TLP:AMBER+STRICT',
  'TLP:AMBER',
  'TLP:RED',
];

export const MACObservablesEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { macAddress, loading, error } = useMacAddress(id || '');
  const [updateMac, { loading: updating, error: updateError }] = useUpdateMacAddress();

  const [values, setValues] = useState({
    value: '',
    type: 'mac-addr',
    confidence: 100,
    defanged: false,
    spec_version: '2.1',
    markingLabels: '',
    labels: [] as string[],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (macAddress) {
      setValues({
        value: macAddress.value || '',
        type: macAddress.type || 'mac-addr',
        confidence: macAddress.confidence ?? 100,
        defanged: macAddress.defanged ?? false,
        spec_version: macAddress.spec_version || '2.1',
        markingLabels: macAddress.object_marking_refs?.[0]?.toUpperCase()
          ? `TLP:${macAddress.object_marking_refs[0].toUpperCase()}`
          : '',
        labels: macAddress.labels || [],
      });
    }
  }, [macAddress]);

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.value) newErrors.value = 'This field is required';
    if (!values.type) newErrors.type = 'This field is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !id) return;
    await updateMac({
      variables: {
        id,
        input: {
          value: values.value,
          type: values.type,
          confidence: values.confidence,
          defanged: values.defanged,
          spec_version: values.spec_version,
          labels: values.labels,
          object_marking_refs: values.markingLabels ? [values.markingLabels.replace('TLP:', '').toLowerCase()] : [],
        },
      },
    });
    navigate('/observables/macaddress');
  };

  const getSliderColor = (val: number) => {
    if (val >= 80) return 'bg-green-600';
    if (val >= 60) return 'bg-lime-400';
    if (val >= 40) return 'bg-yellow-300';
    if (val >= 20) return 'bg-orange-400';
    return 'bg-red-500';
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!macAddress) return <ErrorMessage message="MAC Address not found." />;

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <div className="w-full bg-background border-b px-4 py-3 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
          <span className="sr-only">Close</span>
          <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M15 5L5 15M5 5l10 10" strokeWidth="2" strokeLinecap="round" /></svg>
        </Button>
        <h1 className="text-lg font-semibold">Edit MAC observable</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-xl w-full mx-auto mt-8 bg-background rounded-xl shadow p-6 space-y-6">
        {/* Value */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.value ? 'border-destructive' : 'border-input'} bg-background`}>
            <Input
              id="value"
              value={values.value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('value', e.target.value)}
              placeholder="MAC address (e.g. 00:11:22:33:44:55)"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
          </div>
          <Label
            htmlFor="value"
            className={`absolute -top-3 left-4 bg-background px-2 text-sm font-medium ${errors.value ? 'text-destructive' : 'text-muted-foreground'}`}
          >
            MAC Address <span className="text-destructive">*</span>
          </Label>
          {errors.value && <div className="text-destructive text-xs mt-1">{errors.value}</div>}
        </div>
        {/* Type */}
        <div className="relative mt-6">
          <div className={`border rounded-xl px-4 pt-5 pb-3 ${errors.type ? 'border-destructive' : 'border-input'} bg-background`}>
            <Select
              value={values.type}
              onValueChange={val => handleChange('type', val)}
            >
              <SelectTrigger id="type" className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none">
                <SelectValue placeholder="Select MAC type" />
              </SelectTrigger>
              <SelectContent>
                {MAC_TYPES.map(type => (
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
            Type <span className="text-destructive">*</span>
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
        {/* Defanged */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background flex items-center gap-3">
            <input
              id="defanged"
              type="checkbox"
              checked={values.defanged}
              onChange={e => handleChange('defanged', e.target.checked)}
              className="mr-2"
            />
            <Label htmlFor="defanged" className="text-sm font-medium text-muted-foreground">
              Defanged
            </Label>
          </div>
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
        {/* Labels */}
        <div className="relative mt-6">
          <div className="border border-input rounded-xl px-4 pt-5 pb-3 bg-background">
            <Input
              id="labels"
              value={values.labels.join(',')}
              onChange={e => handleChange('labels', e.target.value.split(',').map(l => l.trim()).filter(Boolean))}
              placeholder="Comma separated labels"
              className="bg-transparent border-none p-0 focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            />
            {values.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {values.labels.map(label => (
                  <Badge key={label}>{label}</Badge>
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
        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant="default" className="w-full" disabled={updating}>
            {updating ? 'Saving...' : 'Save'}
          </Button>
          {updateError && <div className="text-destructive text-xs mt-2">{updateError.message}</div>}
        </div>
      </form>
    </div>
  );
};
