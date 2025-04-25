import React, { useMemo, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Indicator } from '@/types/indicator';
import { Badge } from '@/components/ui/badge';
import { Radarchart } from '../common/RadarChart';

interface ParsedReport {
  [key: string]: string;
}

// Color palette for label badges
const tailwindColors = [
  { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-600' },
  { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-600' },
  { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-600' },
  { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-600' },
  { bg: 'bg-teal-50', border: 'border-teal-500', text: 'text-teal-600' },
  { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600' },
  { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-600' },
  { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-600' },
  { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-600' },
  { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-600' },
  { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-600' },
  { bg: 'bg-lime-50', border: 'border-lime-500', text: 'text-lime-600' },
  {
    bg: 'bg-emerald-50',
    border: 'border-emerald-500',
    text: 'text-emerald-600',
  },
  { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-600' },
  { bg: 'bg-sky-50', border: 'border-sky-500', text: 'text-sky-600' },
  { bg: 'bg-violet-50', border: 'border-violet-500', text: 'text-violet-600' },
  {
    bg: 'bg-fuchsia-50',
    border: 'border-fuchsia-500',
    text: 'text-fuchsia-600',
  },
  {
    bg: 'bg-neutral-100',
    border: 'border-neutral-500',
    text: 'text-neutral-600',
  },
  { bg: 'bg-slate-100', border: 'border-slate-500', text: 'text-slate-600' },
  { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-600' },
];

let availableColors = [...tailwindColors];

/**
 * Gets a random Tailwind color combination and ensures it's not reused until all colors are used
 */
const getRandomTailwindColor = () => {
  if (availableColors.length === 0) {
    availableColors = [...tailwindColors];
  }

  const idx = Math.floor(Math.random() * availableColors.length);
  const color = availableColors[idx];
  availableColors.splice(idx, 1);

  return color;
};

/**
 * Enhanced parser that handles both STIX and Hybrid Analysis formats
 */
const parseIntelReport = (raw: string): ParsedReport => {
  const result: ParsedReport = {};

  // First try STIX format (key: value with ** markers)
  const stixRegex = /\*\*([^:]+):\*\*\s*([\s\S]*?)(?=\s*\*\*[^:]+:\*\*|$)/g;
  let stixMatch: RegExpExecArray | null;
  let hasStixFormat = false;

  while ((stixMatch = stixRegex.exec(raw))) {
    hasStixFormat = true;
    const key = stixMatch[1].trim();
    const val = stixMatch[2].trim().replace(/\n/g, ' ');
    result[key] = val;
  }

  // If no STIX format detected, try Hybrid Analysis format (key: value;)
  if (!hasStixFormat) {
    const hybridRegex = /([^:;]+):\s*([^;]+);/g;
    let hybridMatch: RegExpExecArray | null;

    while ((hybridMatch = hybridRegex.exec(raw))) {
      const key = hybridMatch[1].trim();
      const val = hybridMatch[2].trim();
      result[key] = val;
    }
  }

  // Special handling for Tags/Processes in Hybrid Analysis format
  if (result['Tags'] && result['Tags'].includes(',')) {
    result['Tags'] = result['Tags'].split(/\s*,\s*/).join(', ');
  }
  if (result['Processes'] && result['Processes'].includes(',')) {
    result['Processes'] = result['Processes'].split(/\s*,\s*/).join(', ');
  }

  return result;
};

export const IndicatorOverview = ({ indicator }: { indicator: Indicator }) => {
  // Parse the indicator description into key-value pairs
  const parsed = useMemo(() => {
    if (typeof indicator.description === 'string') {
      return parseIntelReport(indicator.description);
    }
    return {};
  }, [indicator.description]);

  // Get labels either from indicator.labels or parsed from description
  const labels: string[] = indicator.labels?.length
    ? indicator.labels
    : parsed['Labels'] || parsed['Tags']
    ? (parsed['Labels'] || parsed['Tags']).split(/\s*,\s*/)
    : [];
  const uniqueLabels = Array.from(new Set(labels));

  // Persistent color mapping for consistent label colors
  const labelColorMap = useRef<Map<string, (typeof tailwindColors)[0]>>(
    new Map(),
  );

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'bg-green-100 text-green-800';
    if (confidence >= 50) return 'bg-amber-100 text-amber-800';
    return 'bg-red-100 text-red-800';
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict?.toLowerCase()) {
      case 'malicious':
        return 'bg-red-100 text-red-800';
      case 'suspicious':
        return 'bg-amber-100 text-amber-800';
      case 'benign':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getThreatScoreColor = (score: number) => {
    if (score >= 70) return 'bg-red-100 text-red-800';
    if (score >= 40) return 'bg-amber-100 text-amber-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Details Section */}
      <div className="h-auto">
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Details
        </h1>
        <Card className="bg-transparent h-full border border-gray-300 rounded-sm shadow-none">
          <CardContent className="px-3">
            {/* Pattern */}
            <div className="pb-3 w-full">
              <h2 className="font-semibold text-base mb-2">
                Indicator Pattern
              </h2>
              <p className="bg-slate-200 p-3 rounded overflow-x-auto font-mono text-sm">
                {indicator.pattern}
              </p>
            </div>

            {/* Validity & Confidence */}
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Valid From</h2>
                <p className="bg-slate-200 p-2 rounded w-[52%] font-mono text-sm text-center uppercase">
                  {indicator.valid_from}
                </p>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Valid Until</h2>
                <p className="bg-slate-200 p-2 rounded w-[52%] font-mono text-sm text-center uppercase">
                  {indicator.valid_until}
                </p>
              </div>
            </div>

            {/* Confidence, Detection, Type */}
            <div className="flex justify-between py-3">
              <div className="w-[31%]">
                <h2 className="font-bold text-base mb-2">Confidence</h2>
                <span
                  className={`${getConfidenceColor(
                    indicator.confidence,
                  )} py-1 px-6 rounded text-sm text-center uppercase`}
                >
                  {indicator.confidence}%
                </span>
              </div>
              <div className="w-[31%]">
                <h2 className="font-bold text-base mb-2">Detection</h2>
                <span className="bg-red-100 py-1 px-7 rounded text-sm text-center text-red-800 uppercase">
                  No
                </span>
              </div>
              <div className="w-[31%]">
                <h2 className="font-bold text-base mb-2">Indicator Type</h2>
                {parsed['Indicator Type'] && (
                  <span className="bg-violet-50 text-violet-600 border-violet-500 border rounded py-1 px-5 text-sm text-center">
                    {parsed['Indicator Type']}
                  </span>
                )}
              </div>
            </div>

            {/* Hybrid Analysis specific fields */}
            {parsed['Verdict'] && (
              <div className="flex justify-between py-3">
                <div className="w-[31%]">
                  <h2 className="font-bold text-base mb-2">Verdict</h2>
                  <span
                    className={`${getVerdictColor(
                      parsed['Verdict'],
                    )} py-1 px-6 rounded text-sm text-center uppercase`}
                  >
                    {parsed['Verdict']}
                  </span>
                </div>
                <div className="w-[31%]">
                  <h2 className="font-bold text-base mb-2">Threat Score</h2>
                  <span
                    className={`${getThreatScoreColor(
                      parseInt(parsed['Threat Score'] || 0),
                    )} py-1 px-6 rounded text-sm text-center`}
                  >
                    {parsed['Threat Score']}
                  </span>
                </div>
                <div className="w-[31%]">
                  <h2 className="font-bold text-base mb-2">Environment</h2>
                  <span className="bg-blue-50 text-blue-600 border-blue-500 border rounded py-1 px-5 text-sm text-center">
                    {parsed['Environment']}
                  </span>
                </div>
              </div>
            )}

            {/* Parsed fields */}
            <div className="mt-4 space-y-2">
              {Object.entries(parsed).map(([key, value]) => {
                if (
                  [
                    'Indicator Type',
                    'Labels',
                    'Value',
                    'Confidence',
                    // 'Verdict',
                    // 'Threat Score',
                    // 'Environment',
                  ].includes(key)
                )
                  return null;

                return (
                  <div key={key} className="py-2">
                    <strong>{key}:</strong>
                    <p
                      className={`bg-slate-200 p-3 mt-3 rounded text-md break-normal ${
                        key !== 'Description' ? 'font-mono' : ''
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Kill Chain Phases */}
            {indicator.kill_chain_phases?.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold mb-1">Kill Chain Phases</h2>
                <div className="grid gap-2">
                  {indicator.kill_chain_phases.map((phase, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded p-3 text-sm"
                    >
                      <strong>{phase.kill_chain_name}</strong>:{' '}
                      {phase.phase_name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Metadata Section */}
      <div>
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Basic Information
        </h1>
        <Card className="bg-transparent shadow-none border border-gray-300 rounded-sm">
          <CardContent className="space-y-4 p-6">
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created:</strong>{' '}
                {new Date(indicator.created).toLocaleString()}
              </div>
              <div>
                <strong>Modified:</strong>{' '}
                {new Date(indicator.modified).toLocaleString()}
              </div>
            </div>

            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Pattern Type</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {indicator.pattern_type}
                </span>
              </div>
            </div>

            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <Radarchart
                  title="Distribution of opinions"
                  desc="please give your opinion"
                  footer={
                    <div className="text-sm text-muted-foreground">
                      <span>Last updated: </span>
                      {new Date(indicator.modified).toLocaleDateString()}
                    </div>
                  }
                  data={[
                    { feeling: 'Strongly Disagree', level: 186 },
                    { feeling: 'Disagree', level: 305 },
                    { feeling: 'Neutral', level: 237 },
                    { feeling: 'Agree', level: 273 },
                    { feeling: 'Strongly Agree', level: 209 },
                  ]}
                />
              </div>
              {uniqueLabels.length > 0 && (
                <div className="w-[48%]">
                  <h2 className="font-semibold text-base mb-2">Labels</h2>
                  <div className="flex flex-wrap gap-2">
                    {uniqueLabels.map((label) => {
                      if (!labelColorMap.current.has(label)) {
                        labelColorMap.current.set(
                          label,
                          getRandomTailwindColor(),
                        );
                      }
                      const color = labelColorMap.current.get(label)!;
                      return (
                        <Badge
                          key={label}
                          variant="outline"
                          className={`${color.text} ${color.border} ${color.bg} rounded p-2`}
                        >
                          {label}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Created By</h2>
                <div className="bg-slate-200 p-2 rounded text-sm text-center uppercase">
                  {indicator.created_by_ref}
                </div>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Last Updated</h2>
                <div className="bg-slate-200 p-2 rounded text-sm text-center uppercase">
                  {new Date(indicator.modified).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Processes from Hybrid Analysis */}
            {parsed['Processes'] && (
              <div className="mt-4">
                <h2 className="font-bold text-base mb-2">Observed Processes</h2>
                <div className="bg-slate-200 p-3 rounded text-sm font-mono">
                  {parsed['Processes']}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
