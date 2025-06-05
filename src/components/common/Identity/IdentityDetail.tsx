import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Radarchart } from "@/components/common/RadarChart";
import type { Identity } from "@/types/identity";

// Tailwind palette for badges (same as AttackPatternDetail)
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

interface IdentityDetailProps {
  identity?: Identity;
  loading?: boolean;
  error?: any;
}

const IdentityDetail: React.FC<IdentityDetailProps> = ({ identity, loading, error }) => {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const id = identity?.id || paramId;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !identity) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load identity.</span>
      </div>
    );
  }

  // Defensive fallback for nullable fields
  const labels = Array.isArray(identity.labels) ? identity.labels.filter(Boolean) : [];
  const uniqueLabels: string[] = Array.from(new Set(labels));
  const sectors: string[] = Array.isArray(identity.sectors) ? identity.sectors.filter(Boolean) as string[] : [];
  const roles: string[] = Array.isArray(identity.roles) ? identity.roles.filter(Boolean) as string[] : [];
  const markings: string[] = Array.isArray(identity.object_marking_refs) ? identity.object_marking_refs.filter(Boolean) as string[] : [];
  const relationships = Array.isArray(identity.relationship) ? identity.relationship : [];
  const externalReferences = Array.isArray(identity.external_references) ? identity.external_references : [];

  const labelColorMap = useRef<Map<string, (typeof tailwindColors)[0]>>(new Map());

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Details Section */}
      <div>
        <h1 className="uppercase text-xs font-bold text-slate-600 p-2">
          Details
        </h1>
        <Card className="bg-transparent border border-gray-300 rounded-sm shadow-none !py-4">
          <CardContent className="px-3">
            {/* Name Section */}
            <div className="mb-4">
              <h2 className="font-bold text-base mb-1">Name</h2>
              <div className="text-lg font-semibold text-slate-800">
                {identity.name}
              </div>
            </div>
            {/* Radar Chart */}
            <div className="mb-6">
              <Radarchart
                title="Hybrid Analysis"
                desc="please give your opinion"
                footer={
                  <div className="text-sm text-muted-foreground">
                    <span>Last updated: </span>
                    {identity?.modified
                      ? new Date(identity.modified).toLocaleDateString()
                      : ""}
                  </div>
                }
                data={[
                  { feeling: "Strongly Disagree", level: 186 },
                  { feeling: "Disagree", level: 305 },
                  { feeling: "Neutral", level: 237 },
                  { feeling: "Agree", level: 273 },
                  { feeling: "Strongly Agree", level: 209 },
                ]}
              />
            </div>
            {/* Description */}
            {identity.description && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Description</h2>
                  <p className="border border-slate-200 p-5 rounded-sm text-md text-slate-700 text-pretty">
                    {identity.description}
                  </p>
                </div>
              </div>
            )}
            {/* Sectors */}
            {sectors.length > 0 && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Sectors</h2>
                  <div className="flex flex-wrap gap-2">
                    {sectors.map((sector: string) => (
                      <Badge
                        key={sector}
                        variant="outline"
                        className="text-green-600 border-green-500 bg-green-50 py-1"
                      >
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Roles */}
            {roles.length > 0 && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Roles</h2>
                  <div className="flex flex-wrap gap-2">
                    {roles.map((role: string) => (
                      <Badge
                        key={role}
                        variant="outline"
                        className="text-blue-600 border-blue-500 bg-blue-50 py-1"
                      >
                        {role}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Contact Information */}
            {identity.contact_information && (
              <div className="flex justify-between py-3">
                <div className="w-full">
                  <h2 className="font-bold text-base mb-2">Contact Information</h2>
                  <div className="text-xs text-blue-900 font-mono border border-blue-100 rounded p-2">
                    {identity.contact_information}
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
                    {uniqueLabels.map((label: string) => {
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
                      <tr key={rel.id ?? idx} className="border-b hover:bg-slate-50">
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
            {/* External References */}
            {externalReferences.length > 0 && (
              <div className="mt-4">
                <h2 className="font-bold text-base mb-2">
                  External References
                </h2>
                <table className="w-full text-sm text-foreground">
                  <tbody>
                    {externalReferences.map(
                      (
                        ref: {
                          source_name: string;
                          url?: string;
                          description?: string;
                          id?: string;
                        },
                        index: number
                      ) => (
                        <tr
                          key={ref.id ?? index}
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
                            {typeof ref.url === "string" && ref.url.length > 0 ? (
                              <a href={ref.url} target="_blank" rel="noopener noreferrer">
                                {ref.url}
                              </a>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="p-4 text-gray-700">
                            {typeof ref.description === "string" && ref.description.length > 0 ? (
                              ref.description
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
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
        <div className="bg-transparent shadow-none border border-gray-300 rounded-sm">
          <div className="space-y-4 p-6">
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Identity Class</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {identity.identity_class}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Marking</h2>
                <span
                  className={`py-1 px-5 rounded text-sm text-center uppercase border ${getTlpColors(
                    markings[0],
                  )}`}
                >
                  {markings[0] || "-"}
                </span>
              </div>
            </div>
            <div className="flex justify-between py-3">
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Revoked</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-400 rounded py-1 px-5 text-sm text-center">
                  {identity.revoked ? "Yes" : "No"}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-base mb-2">Confidence</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-400 rounded py-1 px-5 text-sm text-center">
                  {identity.confidence ?? "-"}
                </span>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-full">
                <h2 className="font-bold text-base mb-2">Created By</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {identity.created_by_ref || "-"}
                </div>
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="w-full">
                <h2 className="font-bold text-base mb-2">Last Updated</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {identity.modified ? new Date(identity.modified).toLocaleDateString() : "-"}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created:</strong>{" "}
                {identity.created ? new Date(identity.created).toLocaleString() : "-"}
              </div>
              <div>
                <strong>Modified:</strong>{" "}
                {identity.modified ? new Date(identity.modified).toLocaleString() : "-"}
              </div>
              <div>
                <strong>Language:</strong> {identity.lang || "-"}
              </div>
              <div>
                <strong>Extensions:</strong>{" "}
                {typeof identity.extensions === "string"
                  ? identity.extensions
                  : JSON.stringify(identity.extensions)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Floating Edit Button */}
      {/* <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors group"
        title="Edit Identity"
        onClick={() => {
          if (id) navigate(`/identities/${id}/edit`);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 3.487a2.1 2.1 0 1 1 2.97 2.97L7.5 18.79l-4 1 1-4 12.362-12.303ZM19 7l-2-2M5 21h14"
          />
        </svg>
      </button> */}
    </div>
  );
};

export default IdentityDetail;
