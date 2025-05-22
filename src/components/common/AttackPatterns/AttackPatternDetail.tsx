import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Radarchart } from '@/components/common/RadarChart';

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
  { bg: 'bg-emerald-50', border: 'border-emerald-500', text: 'text-emerald-600' },
  { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-600' },
  { bg: 'bg-sky-50', border: 'border-sky-500', text: 'text-sky-600' },
  { bg: 'bg-violet-50', border: 'border-violet-500', text: 'text-violet-600' },
  { bg: 'bg-fuchsia-50', border: 'border-fuchsia-500', text: 'text-fuchsia-600' },
  { bg: 'bg-neutral-100', border: 'border-neutral-500', text: 'text-neutral-600' },
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

export const AttackPatternDetail = ({ attackPattern }: { attackPattern: any }) => {
  if (!attackPattern) return null;

  const labelColorMap = useRef<Map<string, (typeof tailwindColors)[0]>>(new Map());
  const uniqueLabels = Array.from(new Set((attackPattern.labels || []).filter((l: unknown): l is string => typeof l === 'string')));
  const uniqueAliases = Array.from(new Set((attackPattern.aliases || []).filter((a: unknown): a is string => typeof a === 'string')));

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Details Section */}
      <div>
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Details
        </h1>
        <Card className="bg-transparent border border-gray-300 rounded-sm shadow-none !py-4">
          <CardContent className="px-3">
            {/* Name */}
            <div className="pb-3 w-full">
              <h2 className="font-semibold text-base mb-2">Name</h2>
              <div className="bg-slate-100 border border-slate-600 text-slate-600 font-semibold p-3 rounded text-sm">
                {attackPattern.name}
              </div>
            </div>
            {/* Description */}
            {attackPattern.description && (
              <div className="pb-3 w-full">
                <h2 className="font-semibold text-base mb-2">Description</h2>
                <div className="border border-slate-200 p-5 rounded-sm text-md text-slate-700 text-pretty">
                  {attackPattern.description}
                </div>
              </div>
            )}
            {/* Aliases */}
            {uniqueAliases.length > 0 && (
              <div className="pb-3 w-full">
                <h2 className="font-semibold text-base mb-2">Aliases</h2>
                <div className="flex flex-wrap gap-2">
                  {uniqueAliases.map((alias) => (
                    <Badge key={String(alias)} variant="outline" className="bg-gray-100 border-gray-400 text-gray-700">
                      {String(alias)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {/* Labels */}
            {uniqueLabels.length > 0 && (
              <div className="pb-3 w-full">
                <h2 className="font-semibold text-base mb-2">Labels</h2>
                <div className="flex flex-wrap gap-2">
                  {uniqueLabels.map((label) => {
                    if (!labelColorMap.current.has(label as string)) {
                      labelColorMap.current.set(label as string, getRandomTailwindColor());
                    }
                    const color = labelColorMap.current.get(label as string)!;
                    return (
                      <Badge
                        key={String(label)}
                        variant="outline"
                        className={`${color.text} ${color.border} ${color.bg} rounded p-2`}
                      >
                        {String(label)}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Confidence */}
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Confidence</h2>
                <span className="bg-blue-50 text-blue-600 border-blue-500 border rounded py-1 px-5 text-sm text-center">
                  {attackPattern.confidence ?? '—'}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Revoked</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-400 rounded py-1 px-5 text-sm text-center">
                  {attackPattern.revoked ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
            {/* Created/Modified */}
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Created</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {attackPattern.created ? new Date(attackPattern.created).toLocaleString() : '—'}
                </div>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Modified</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {attackPattern.modified ? new Date(attackPattern.modified).toLocaleString() : '—'}
                </div>
              </div>
            </div>
            {/* Created By */}
            {attackPattern.created_by_ref && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Created By</h2>
                  <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                    {attackPattern.created_by_ref}
                  </div>
                </div>
              </div>
            )}
            {/* External References */}
            {attackPattern.external_references?.length > 0 && (
              <div className="py-3">
                <h2 className="font-bold text-base mb-2">External References</h2>
                <table className="w-full text-sm text-foreground">
                  <tbody>
                    {attackPattern.external_references.map((ref: any, index: number) => (
                      <tr
                        key={index}
                        className="hover:bg-slate-100 transition-colors border-b border-gray-300 cursor-pointer"
                      >
                        <td className="p-4 text-gray-700">
                          <Badge
                            variant="outline"
                            className="text-blue-500 border-blue-500 bg-blue-50 py-1"
                          >
                            {typeof ref.source_name === 'string' ? ref.source_name : String(ref.source_name ?? '')}
                          </Badge>
                        </td>
                        <td className="p-4 font-medium text-gray-900 hover:underline">
                          {typeof ref.url === 'string'
                            ? <a href={ref.url}>{ref.url}</a>
                            : typeof ref.description === 'string'
                              ? ref.description
                              : String(ref.description ?? '')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Kill Chain Phases */}
            {attackPattern.kill_chain_phases?.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold mb-1">Kill Chain Phases</h2>
                <div className="grid gap-2">
                  {attackPattern.kill_chain_phases.map((phase: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded p-3 text-sm"
                    >
                      <strong>{phase.kill_chain_name}</strong>: {phase.phase_name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Basic Information Section */}
      <div>
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Basic Information
        </h1>
        <Card className="bg-transparent shadow-none border border-gray-300 rounded-sm">
          <CardContent className="space-y-4 p-6">
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Type</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {attackPattern.type}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Spec Version</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {attackPattern.spec_version}
                </span>
              </div>
            </div>
            {/* Radar Chart */}
            <div className="flex justify-between py-3">
              <div className="w-full">
                <Radarchart
                  title="Distribution of opinions"
                  desc="please give your opinion"
                  footer={
                    <div className="text-sm text-muted-foreground">
                      <span>Last updated: </span>
                      {attackPattern.modified
                        ? new Date(attackPattern.modified).toLocaleDateString()
                        : '—'}
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
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Language:</strong> {attackPattern.lang || '—'}
              </div>
              <div>
                <strong>Extensions:</strong> {attackPattern.extensions ? JSON.stringify(attackPattern.extensions) : '—'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
