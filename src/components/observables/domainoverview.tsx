import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DomainName } from '@/types/observables/domain';

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

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 75) return 'bg-green-100 text-green-800';
  if (confidence >= 50) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
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

export const DomainOverview = ({ domain }: { domain: DomainName }) => {
  const labels: string[] = domain.labels || [];
  const uniqueLabels = Array.from(new Set(labels));
  const labelColorMap = useRef<Map<string, (typeof tailwindColors)[0]>>(
    new Map(),
  );

  const extension = domain?.extensions
    ? domain?.extensions['extension-definition--virustotal-enrichment']
    : {};
  const last_analysis_stat = extension
    ? extension?.data?.attributes?.last_analysis_stats
    : {};
  const ext_type = extension ? extension?.extension_type : '';

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Details
        </h1>
        <Card className="bg-transparent border border-gray-300 rounded-sm shadow-none !py-4">
          <CardContent className="px-3">
            <div className="pb-3 w-full flex justify-between">
              <div className="w-[50%]">
                <h2 className="font-semibold text-base mb-2">Domain Value</h2>
                <div className="bg-slate-100 w-[90%] border border-slate-600 text-slate-600 font-semibold p-3 rounded overflow-x-auto font-mono text-sm">
                  {domain.value}
                </div>
              </div>
              <div className="w-[50%]">
                <h2 className="font-semibold text-base mb-2">Pattern</h2>
                <div className="bg-slate-100 w-[90%] border border-slate-600 text-slate-600 font-semibold p-3 rounded overflow-x-auto font-mono text-sm">
                  {domain.pattern}
                </div>
              </div>
            </div>
            <div className="flex justify-between py-3 mb-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Created</h2>
                <p className="bg-slate-100 border border-slate-600 text-slate-600 font-semibold p-2 rounded w-[52%] font-mono text-sm text-center uppercase">
                  {domain.created}
                </p>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Modified</h2>
                <p className="bg-slate-100 border border-slate-600 text-slate-600 font-semibold p-2 rounded w-[52%] font-mono text-sm text-center uppercase">
                  {domain.modified}
                </p>
              </div>
            </div>
            <hr />
            <div className="flex justify-between py-3 mt-3">
              <div className="w-[31%]">
                <h2 className="font-bold text-base mb-2">Confidence</h2>
                <span
                  className={`${getConfidenceColor(
                    domain.confidence || 0,
                  )} py-1 px-6 rounded text-sm text-center uppercase`}
                >
                  {domain.confidence || 0}%
                </span>
              </div>
              <div className="w-[31%]">
                <h2 className="font-bold text-base mb-2">Type</h2>
                <span className="bg-violet-50 text-violet-600 border-violet-500 border rounded py-1 px-5 text-sm text-center capitalize">
                  {domain.type}
                </span>
              </div>
              <div className="w-[31%]">
                <h2 className="font-bold text-base mb-2">Defanged</h2>
                <span
                  className={`py-1 px-5 rounded text-sm text-center ${
                    domain.defanged
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {domain.defanged ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
            <div className="flex justify-between py-5">
              <div className="">
                <h2 className="font-bold text-base mb-2">Extension Type</h2>
                <Badge
                  variant="outline"
                  className="border border-gray-500 text-gray-600 bg-gray-100 rounded-sm py-2 px-5"
                >
                  {ext_type ?? 'UNKOWN'}
                </Badge>
              </div>
              <div className="">
                <h2 className="font-bold text-base mb-2">Malicious</h2>
                <Badge className="text-red-600 bg-red-100 py-1 px-6 rounded text-sm text-center uppercase">
                  {last_analysis_stat ? last_analysis_stat['malicious'] : 0}%
                </Badge>
              </div>
              <div className="">
                <h2 className="font-bold text-base mb-2">Suspicious</h2>
                <Badge className="text-amber-600 bg-amber-100 py-1 px-6 rounded text-sm text-center uppercase">
                  {last_analysis_stat ? last_analysis_stat['suspicious'] : 0}%
                </Badge>
              </div>
              <div className="">
                <h2 className="font-bold text-base mb-2">Undetected</h2>
                <Badge className="text-sky-600 bg-sky-100 py-1 px-6 rounded text-sm text-center uppercase">
                  {last_analysis_stat ? last_analysis_stat['undetected'] : 0}%
                </Badge>
              </div>
              <div className="">
                <h2 className="font-bold text-base mb-2">Harmless</h2>
                <Badge className="text-green-600 bg-green-100 py-1 px-6 rounded text-sm text-center uppercase">
                  {last_analysis_stat ? last_analysis_stat['harmless'] : 0}%
                </Badge>
              </div>
            </div>
            <hr />
            <div className="w-full py-3 mb-3">
              <h2 className="font-bold text-base mb-2">Description</h2>
              <p className="border p-5 rounded text-md text-foreground">
                {domain.description ? domain.description : '-'}
              </p>
            </div>
            <hr />
            <div className="flex justify-between py-5">
              {domain.external_references && (
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">
                    External References
                  </h2>
                  <table className="w-full text-sm text-foreground">
                    <tbody>
                      {domain.external_references.map((ref, index) => (
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
                            {ref.url ? (
                              <a href={ref.url} className="break-all">
                                {ref.url}
                              </a>
                            ) : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
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
                <h2 className="font-bold text-sm mb-2">Marking</h2>
                <span
                  className={`py-1 px-5 rounded text-sm text-center uppercase border ${getTlpColors(
                    domain.object_marking_refs?.[0] || 'clear',
                  )}`}
                >
                  TLP:{domain.object_marking_refs?.[0] || 'clear'}
                </span>
              </div>
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
            </div>
            <div className="flex justify-between py-2">
              <div className="w-full">
                <h2 className="font-bold text-base mb-2">Created By</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {domain.created_by_ref}
                </div>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-full">
                <h2 className="font-bold text-base mb-2">Last Updated</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {new Date(domain.modified).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created:</strong>{' '}
                {new Date(domain.created).toLocaleString()}
              </div>
              <div>
                <strong>Modified:</strong>{' '}
                {new Date(domain.modified).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
