import React, { useState } from "react";
import { useIdentities } from "@/hooks/useIdentity";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Identity } from "@/types/identity";

const borderColors = [
  "border-l-8 border-blue-400",
  "border-l-8 border-green-400",
  "border-l-8 border-purple-400",
  "border-l-8 border-pink-400",
  "border-l-8 border-yellow-400",
  "border-l-8 border-cyan-400",
  "border-l-8 border-rose-400",
  "border-l-8 border-indigo-400",
];

const sectorColors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-yellow-100 text-yellow-700",
  "bg-cyan-100 text-cyan-700",
  "bg-rose-100 text-rose-700",
  "bg-indigo-100 text-indigo-700",
];

const labelColors = [
  "bg-blue-50 text-blue-600 border-blue-400",
  "bg-green-50 text-green-600 border-green-400",
  "bg-yellow-50 text-yellow-600 border-yellow-400",
  "bg-purple-50 text-purple-600 border-purple-400",
  "bg-pink-50 text-pink-600 border-pink-400",
  "bg-gray-100 text-gray-600 border-gray-400",
];

let availableLabelColors = [...labelColors];
const getRandomLabelColor = () => {
  if (availableLabelColors.length === 0) availableLabelColors = [...labelColors];
  const idx = Math.floor(Math.random() * availableLabelColors.length);
  const color = availableLabelColors[idx];
  availableLabelColors.splice(idx, 1);
  return color;
};

export const IdentityListPage: React.FC = () => {
  const { identities, loading, error } = useIdentities({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();
  const labelColorMap = React.useRef<Map<string, string>>(new Map());

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg text-red-600 flex flex-col items-center justify-center">
      <div>Error loading identities. Please try again later.</div>
      <div className="text-xs mt-2 text-red-400">
        {error.message}
      </div>
    </div>
  );

  const results = identities?.results || [];

  if (!loading && results.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 text-gray-500">
        No identities found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
      {results.map((identity: Identity, idx: number) => {
        const isHovered = hoveredCard === identity.id;
        const borderColor = borderColors[idx % borderColors.length];
        // Defensive: ensure arrays are always arrays
        const sectors = Array.isArray(identity.sectors) ? identity.sectors : [];
        const labels = Array.isArray(identity.labels) ? identity.labels : [];
        const relationships = Array.isArray(identity.relationship) ? identity.relationship : [];
        const displayLabels = Array.from(new Set(labels)).slice(0, 3);
        const extraLabelCount = labels.length - displayLabels.length;
        const displaySectors = Array.from(new Set(sectors)).slice(0, 3);
        const extraSectorCount = sectors.length - displaySectors.length;
        const relCount = relationships.length;

        return (
          <Card
            key={identity.id}
            className={`relative overflow-visible shadow-md transition-all duration-300 cursor-pointer bg-white/90 hover:shadow-xl hover:scale-[1.015] ${borderColor} ${isHovered ? "ring-2 ring-blue-300" : ""}`}
            onMouseEnter={() => setHoveredCard(identity.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(`/identity/${identity.id}`)}
          >
            {/* Floating avatar */}
            <div className="absolute -left-8 -top-8 z-20">
              <div className="rounded-full bg-gradient-to-br from-blue-200 to-blue-400 shadow-lg w-16 h-16 flex items-center justify-center border-4 border-white">
                {identity.name ? (
                  <span className="text-2xl font-bold text-white">{identity.name[0].toUpperCase()}</span>
                ) : (
                  <UserCircle2 className="w-10 h-10 text-white" />
                )}
              </div>
            </div>
            <CardContent className="pt-10 pl-10 pr-6 pb-6 flex flex-col h-full">
              <div className="flex justify-between items-center mb-2">
                <CardTitle className="text-lg font-semibold truncate">
                  {identity.name || <span className="text-gray-400">Unnamed</span>}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="px-3 py-1 text-xs font-semibold uppercase border-2 border-blue-400 bg-blue-50 text-blue-700 tracking-wide shadow-sm"
                >
                  {identity.identity_class}
                </Badge>
              </div>
              <CardDescription className="mb-3 text-gray-700 min-h-[2.5rem]">
                <div className="line-clamp-2 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                  {identity.description || <span className="text-gray-400">No description.</span>}
                </div>
              </CardDescription>
              {/* Sectors */}
              <div className="flex flex-wrap gap-1 mb-2">
                {displaySectors.map((sector, i) => (
                  <span
                    key={sector}
                    className={`rounded-full px-2 py-0.5 text-xs font-medium border border-gray-200 ${sectorColors[i % sectorColors.length]}`}
                  >
                    {sector}
                  </span>
                ))}
                {extraSectorCount > 0 && (
                  <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
                    +{extraSectorCount}
                  </span>
                )}
              </div>
              {/* Labels */}
              <div className="flex flex-wrap gap-1 mb-2">
                {displayLabels.map((label) => {
                  if (!labelColorMap.current.has(label)) {
                    labelColorMap.current.set(label, getRandomLabelColor());
                  }
                  const color = labelColorMap.current.get(label)!;
                  return (
                    <Badge
                      key={label}
                      variant="outline"
                      className={`border ${color} text-xs font-medium`}
                    >
                      {label}
                    </Badge>
                  );
                })}
                {extraLabelCount > 0 && (
                  <Badge
                    variant="outline"
                    className="text-gray-500 border-gray-400 bg-gray-50 text-xs"
                  >
                    +{extraLabelCount}
                  </Badge>
                )}
              </div>
              {/* Relationship count */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">Relationships:</span>
                <Badge className="bg-purple-100 text-purple-700 px-2 py-0.5 text-xs font-semibold">
                  {relCount}
                </Badge>
              </div>
              {/* Dates */}
              <div className="flex gap-4 text-xs text-gray-400 mt-auto">
                <div>
                  <span className="font-medium text-gray-500">Created:</span>{" "}
                  {identity.created ? new Date(identity.created).toLocaleDateString() : "-"}
                </div>
                <div>
                  <span className="font-medium text-gray-500">Modified:</span>{" "}
                  {identity.modified ? new Date(identity.modified).toLocaleDateString() : "-"}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
