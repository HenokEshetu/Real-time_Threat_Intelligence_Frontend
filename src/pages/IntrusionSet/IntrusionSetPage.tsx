import React, { useState } from "react";
import { useIntrusionSets } from "@/hooks/useintrusionSet";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import type { IntrusionSet } from "@/types/intrusionset";

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

export const IntrusionSetPage: React.FC = () => {
  const { intrusionSets, loading, error } = useIntrusionSets({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const labelColorMap = React.useRef<Map<string, (typeof tailwindColors)[0]>>(new Map());

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg text-red-600 flex items-center justify-center">
      Error loading intrusion sets. Please try again later.
    </div>
  );

  const sets = intrusionSets?.results || [];

  return (
    <div className="grid grid-cols-4 gap-6 p-4 relative min-h-screen">
      {sets.map((set: IntrusionSet) => {
        const isHovered = hoveredCard === set.id;
        const labels = set.labels || [];
        let uniqueLabels: string[] = [];
        labels.forEach((lbl: string) => {
          if (!uniqueLabels.includes(lbl)) uniqueLabels.push(lbl);
        });
        const displayLabels = uniqueLabels.slice(0, 3);
        const extraCount = uniqueLabels.length - displayLabels.length;

        return (
          <div
            key={set.id}
            className="contents"
            onClick={() => navigate(`/intrusionset/${set.id}`)}
          >
            <Card
              className={`h-80 rounded-xl border shadow-sm overflow-hidden relative transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] mb-6
                ${isHovered ? "border-cyan-500 shadow-cyan-300" : ""}`}
              onMouseEnter={() => setHoveredCard(set.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-5 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-base truncate">
                    Name: {set.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="px-4 py-1 text-xs font-semibold uppercase border-2 border-cyan-500 bg-cyan-100 text-cyan-600 tracking-wide shadow-sm"
                  >
                    INTRUSION SET
                  </Badge>
                </div>
                <CardDescription className="text-primary mb-3 flex-1 overflow-hidden">
                  <div className="line-clamp-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 4 }}>
                    {set.description}
                  </div>
                </CardDescription>
                <div className="flex flex-wrap gap-1 mb-2">
                  {displayLabels.map((label) => {
                    if (!labelColorMap.current.has(label)) {
                      labelColorMap.current.set(label, getRandomTailwindColor());
                    }
                    const color = labelColorMap.current.get(label)!;
                    return (
                      <Badge
                        key={label}
                        variant="outline"
                        className={`${color.text} ${color.border} ${color.bg}`}
                      >
                        {label}
                      </Badge>
                    );
                  })}
                  {extraCount > 0 && (
                    <Badge
                      variant="outline"
                      className="text-gray-500 border-gray-500 bg-gray-50"
                    >
                      +{extraCount}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">first_seen:</span> {formatDate(set.first_seen)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">last_seen:</span> {formatDate(set.last_seen)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default IntrusionSetPage;
