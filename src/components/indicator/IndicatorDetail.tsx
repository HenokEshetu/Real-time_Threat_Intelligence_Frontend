import React, { useMemo, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Indicator } from '@/types/indicator';
import { Badge } from '@/components/ui/badge';
import { Radarchart } from '../common/RadarChart';
import { StixPattern } from '../common/StixPattern';

interface ParsedReport {
  [key: string]: string;
}

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
const getRandomTailwindColor = () => {
  if (availableColors.length === 0) availableColors = [...tailwindColors];
  const idx = Math.floor(Math.random() * availableColors.length);
  const color = availableColors[idx];
  availableColors.splice(idx, 1);
  return color;
};

const parseIntelReport = (raw: string): ParsedReport => {
  const result: ParsedReport = {};
  let hasStixFormat = false;

  const stixRegex = /\*\*([^:]+):\*\*\s*([\s\S]*?)(?=\s*\*\*[^:]+:\*\*|$)/g;
  let match: RegExpExecArray | null;
  while ((match = stixRegex.exec(raw))) {
    hasStixFormat = true;
    result[match[1].trim()] = match[2].trim().replace(/\n/g, ' ');
  }

  if (!hasStixFormat && raw.includes(';')) {
    raw.split(/;\s*/g).forEach((seg) => {
      const [key, ...rest] = seg.split(/:\s*/);
      const value = rest.join(':').trim();
      if (!key || !value || key.trim().toLowerCase() === 'source') return;
      result[key.trim()] = value;
    });

    if (result['Processes']) {
      result['Processes'] = result['Processes']
        .split('.')
        .filter(Boolean)
        .join(', ');
    }
    if (result['Threat Score'] && !isNaN(Number(result['Threat Score']))) {
      result['Threat Score'] = `${result['Threat Score']}%`;
    }
    if (result['Tags']) {
      result['Tags'] = result['Tags'].split(/\s*,\s*/).join(', ');
    }
  }

  const sourceRegex = /\bSource\s*[:\-]\s*([^;\n]+)/i;
  const srcMatch = raw.match(sourceRegex);
  if (srcMatch) {
    result['Source'] = srcMatch[1].trim();
  }

  return result;
};

export const IndicatorDetail = ({
  indicator,
}: {
  indicator: Indicator;
}) => {
  const parsed = useMemo(() => {
    if (typeof indicator.description === 'string') {
      // return parseIntelReport(indicator.description);
      return {} as any;
    }
    return {};
  }, [indicator.description]);

  const labels: string[] = indicator.labels?.length
    ? indicator.labels
    : parsed['Labels'] || parsed['Tags']
    ? (parsed['Labels'] || parsed['Tags']).split(/\s*,\s*/)
    : [];
  const uniqueLabels = Array.from(new Set(labels));

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

  const getTlpColors = (tlp: string) => {
    switch (tlp?.toUpperCase()) {
      case 'WHITE':
        return 'bg-white text-black border-black';
      case 'GREEN':
        return 'bg-green-100 text-green-800 border-green-800';
      case 'AMBER':
        return 'bg-yellow-100 text-yellow-800 border-yellow-800';
      case 'RED':
        return 'bg-red-100 text-red-800 border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-800';
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="">
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Details
        </h1>
        <Card className="bg-transparent border border-gray-300 rounded-sm shadow-none !py-4">
          <CardContent className="px-3">
            <div className="pb-3 w-full">
              <h2 className="font-semibold text-base mb-2">
                Indicator Pattern
              </h2>
              <div className="bg-slate-100 border border-slate-600 text-slate-600 font-semibold p-3 rounded overflow-x-auto font-mono text-sm">
                <StixPattern pattern={indicator.pattern} />
              </div>
            </div>

            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Valid From</h2>
                <p className="bg-slate-100 border border-slate-600 text-slate-600 font-semibold p-2 rounded w-[52%] font-mono text-sm text-center uppercase">
                  {indicator.valid_from}
                </p>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Valid Until</h2>
                <p className="bg-slate-100 border border-slate-600 text-slate-600 font-semibold p-2 rounded w-[52%] font-mono text-sm text-center uppercase">
                  {indicator.valid_until}
                </p>
              </div>
            </div>

            <div className="flex justify-between py-3">
              <div className="w-[31%]">
                <h2 className="font-bold text-base mb-2">Confidence</h2>
                <span
                  className={`${getConfidenceColor(
                    indicator.confidence ?? 0,
                  )} py-1 px-6 rounded text-sm text-center uppercase`}
                >
                  {indicator.confidence ?? 0}%
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
                {indicator.type && (
                  <span className="bg-violet-50 text-violet-600 border-violet-500 border rounded py-1 px-5 text-sm text-center">
                    {indicator.type}
                  </span>
                )}
              </div>
            </div>

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
                      parseInt(parsed['Threat Score'] || '0'),
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

            {indicator.description && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Description</h2>
                  <p className="border border-slate-200 p-5 rounded-sm text-md text-slate-700 text-pretty">
                    {indicator.description}
                  </p>
                </div>
              </div>
            )}

            {parsed['Source'] && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Source</h2>
                  <span className="bg-amber-50 text-amber-600 border-amber-500 border rounded py-2 px-6 text-sm text-center">
                    {parsed['Source']}
                  </span>
                </div>
              </div>
            )}

            <div className="py-3">
              {Object.entries(parsed).map(([key, value]) => {
                if (
                  [
                    'Indicator Type',
                    'Labels',
                    'Value',
                    'Confidence',
                    'Verdict',
                    'Threat Score',
                    'Environment',
                    'Source',
                  ].includes(key)
                )
                  return null;

                return (
                  <div key={key} className="py-2">
                    <strong>{key}:</strong>
                    <p
                      className={`bg-gray-200 p-3 mt-3 rounded text-md break-normal ${
                        key !== 'Hybrid Analysis sample' ? 'font-mono' : ''
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                );
              })}
            </div>

            <hr />
            <div className="flex justify-between py-5">
              {indicator.external_references && (
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">
                    External References
                  </h2>
                  <table className="w-full text-sm text-foreground">
                    <tbody>
                      {indicator.external_references?.length > 0 &&
                        indicator.external_references.map((ref, index) => (
                          <tr
                            key={index}
                            className="hover:bg-slate-100 transition-colors border-b border-gray-300 cursor-pointer"
                          >
                            <td className="p-4 text-gray-700">
                              <Badge
                                variant="outline"
                                className="text-blue-500 border-blue-500 bg-blue-50 py-1"
                              >
                                {ref.source_name}
                              </Badge>
                            </td>
                            <td className="p-4 font-medium text-gray-900 hover:underline">
                              <a href={ref.url} className='break-all'>{ref.url}</a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
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

      <div>
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Basic Information
        </h1>
        <Card className="bg-transparent shadow-none border border-gray-300 rounded-sm">
          <CardContent className="space-y-4 p-6">
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Pattern Type</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {indicator.pattern_type}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Marking</h2>
                {/* <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  TLP:{indicator.object_marking_refs[0]}
                </span> */}
                <span
                  className={`py-1 px-5 rounded text-sm text-center uppercase border ${getTlpColors(
                    indicator.object_marking_refs[0] ?? 'UNKNOWN',
                  )}`}
                >
                  TLP:{indicator.object_marking_refs[0] ?? 'UNKNOWN'}
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

            <div className="flex justify-between py-2">
              <div className="w-full">
                <h2 className="font-bold text-base mb-2">Created By</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {indicator.created_by_ref}
                </div>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-full">
                <h2 className="font-bold text-base mb-2">Last Updated</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {new Date(indicator.modified).toLocaleDateString()}
                </div>
              </div>
            </div>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
