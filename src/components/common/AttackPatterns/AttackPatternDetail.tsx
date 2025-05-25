import React, { useMemo, useRef } from "react";
import { Radarchart } from "@/components/common/RadarChart";
import { AttackPattern } from "@/types/observables/attackpattern";
import { Badge } from "@/components/ui/badge";

// Tailwind palette for badges (copied from IndicatorDetail)
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

export const AttackPatternDetail: React.FC<{ attackPattern?: AttackPattern }> = ({ attackPattern }) => {
  if (!attackPattern) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">No attack pattern data.</span>
      </div>
    );
  }

  // Defensive fallback for nullable fields
  const aliases = Array.isArray(attackPattern.aliases) ? attackPattern.aliases : [];
  const labels = Array.isArray(attackPattern.labels) ? attackPattern.labels : [];
  const uniqueLabels = Array.from(new Set(labels));
  const externalReferences = Array.isArray(attackPattern.external_references) ? attackPattern.external_references : [];
  const killChainPhases = Array.isArray(attackPattern.kill_chain_phases) ? attackPattern.kill_chain_phases : [];
  const objectMarkingRefs = Array.isArray(attackPattern.object_marking_refs) ? attackPattern.object_marking_refs : [];
  const relationships = Array.isArray(attackPattern.relationship) ? attackPattern.relationship : [];

  const labelColorMap = useRef<Map<string, (typeof tailwindColors)[0]>>(new Map());

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

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Details Section */}
      <div>
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Details
        </h1>
        <div className="bg-transparent border border-gray-300 rounded-sm shadow-none !py-4">
          <div className="px-3">
            {/* Name */}
            <div className="pb-3 w-full">
              <h2 className="font-semibold text-base mb-2">
                Name
              </h2>
              <div className="bg-slate-100 border border-slate-600 text-slate-600 font-semibold p-3 rounded overflow-x-auto font-mono text-sm">
                {attackPattern.name}
              </div>
            </div>
            {/* Description */}
            {attackPattern.description && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Description</h2>
                  <p className="border border-slate-200 p-5 rounded-sm text-md text-slate-700 text-pretty">
                    {attackPattern.description}
                  </p>
                </div>
              </div>
            )}
            {/* Aliases */}
            {aliases.length > 0 && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Aliases</h2>
                  <div className="flex flex-wrap gap-2">
                    {aliases.map((alias) => (
                      <Badge
                        key={alias}
                        variant="outline"
                        className="text-blue-500 border-blue-500 bg-blue-50 py-1"
                      >
                        {alias}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Labels */}
            {uniqueLabels.length > 0 && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Labels</h2>
                  <div className="flex flex-wrap gap-2">
                    {uniqueLabels.map((label) => {
                      if (!labelColorMap.current.has(label)) {
                        labelColorMap.current.set(label, getRandomTailwindColor());
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
            )}
            {/* Confidence */}
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Confidence</h2>
                <span
                  className={`${getConfidenceColor(
                    attackPattern.confidence ?? 0,
                  )} py-1 px-6 rounded text-sm text-center uppercase`}
                >
                  {attackPattern.confidence ?? "-"}%
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Revoked</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-400 rounded py-1 px-5 text-sm text-center">
                  {attackPattern.revoked ? "Yes" : "No"}
                </span>
              </div>
            </div>
            {/* Kill Chain Phases */}
            {killChainPhases.length > 0 && (
              <div className="mt-4">
                <h2 className="font-semibold mb-1">Kill Chain Phases</h2>
                <div className="grid gap-2">
                  {killChainPhases.map((phase, idx) => (
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
            {/* External References */}
            {externalReferences.length > 0 && (
              <div className="mt-4">
                <h2 className="font-bold text-base mb-2">
                  External References
                </h2>
                <table className="w-full text-sm text-foreground">
                  <tbody>
                    {externalReferences.map((ref, index) => (
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
                            <a href={ref.url} target="_blank" rel="noopener noreferrer">
                              {ref.url}
                            </a>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Relationships */}
            {relationships.length > 0 && (
              <div className="mt-4">
                <h2 className="font-bold text-base mb-2">Relationships</h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">ID</th>
                      <th className="text-left p-2">Source Ref</th>
                      <th className="text-left p-2">Target Ref</th>
                      <th className="text-left p-2">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relationships.map((rel: any, idx: number) => (
                      <tr key={idx} className="border-b hover:bg-slate-50">
                        <td className="p-2">{rel.id}</td>
                        <td className="p-2">{rel.source_ref}</td>
                        <td className="p-2">{rel.target_ref}</td>
                        <td className="p-2">{rel.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Basic Information Section */}
      <div>
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Basic Information
        </h1>
        <div className="bg-transparent shadow-none border border-gray-300 rounded-sm">
          <div className="space-y-4 p-6">
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
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <Radarchart
                  title="Distribution of opinions"
                  desc="please give your opinion"
                  footer={
                    <div className="text-sm text-muted-foreground">
                      <span>Last updated: </span>
                      {attackPattern.modified ? new Date(attackPattern.modified).toLocaleDateString() : "-"}
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
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Marking</h2>
                <span
                  className={`py-1 px-5 rounded text-sm text-center uppercase border ${getTlpColors(
                    objectMarkingRefs[0],
                  )}`}
                >
                  TLP:{objectMarkingRefs[0] || "-"}
                </span>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-full">
                <h2 className="font-bold text-base mb-2">Created By</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {attackPattern.created_by_ref}
                </div>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-full">
                <h2 className="font-bold text-base mb-2">Last Updated</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {attackPattern.modified ? new Date(attackPattern.modified).toLocaleDateString() : "-"}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created:</strong>{" "}
                {attackPattern.created ? new Date(attackPattern.created).toLocaleString() : "-"}
              </div>
              <div>
                <strong>Modified:</strong>{" "}
                {attackPattern.modified ? new Date(attackPattern.modified).toLocaleString() : "-"}
              </div>
              <div>
                <strong>Language:</strong> {attackPattern.lang || "-"}
              </div>
              <div>
                <strong>Extensions:</strong>{" "}
                {typeof attackPattern.extensions === "string"
                  ? attackPattern.extensions
                  : JSON.stringify(attackPattern.extensions)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
