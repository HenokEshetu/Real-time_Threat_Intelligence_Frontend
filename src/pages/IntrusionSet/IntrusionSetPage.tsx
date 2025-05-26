import React, { useState, useRef, useMemo } from "react";
import { useIntrusionSets } from "@/hooks/useintrusionSet";
import { Badge } from "@/components/ui/badge";
import { KeyRound, ShieldMinusIcon, SwordIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { IntrusionSet } from "@/types/intrusionset";

// Tailwind color palette for label badges
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

  const labelColorMap = useRef<Map<string, (typeof tailwindColors)[0]>>(new Map());
  const sets = intrusionSets?.results || [];

  useMemo(() => {
    sets.forEach((set: IntrusionSet) => {
      (set.labels || []).forEach((label) => {
        if (!labelColorMap.current.has(label)) {
          labelColorMap.current.set(label, getRandomTailwindColor());
        }
      });
    });
  }, [sets]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        Error loading intrusion sets. Please try again later.
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-6 p-4 relative min-h-screen">
      {sets.map((set) => {
        const isHovered = hoveredCard === set.id;
        // No random glow effect for now, but can be added if desired
        return (
          <div
            key={set.id}
            className="contents"
            onClick={() => navigate(`/intrusionsets/${set.id}`)}
          >
            <div
              className={`h-80 rounded-xl border shadow-sm overflow-hidden relative transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] mb-6 bg-white`}
              onMouseEnter={() => setHoveredCard(set.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Shield icon at bottom right */}
              <div
                className="absolute bottom-2 right-2 z-10"
                style={{ pointerEvents: 'none' }}
              >
                <KeyRound className="h-10 w-6" />
              </div>

              <div className="p-5 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-base truncate font-semibold text-foreground">
                    Name: {set.name}
                  </div>
                  <Badge
                    variant="outline"
                    className="px-4 py-1 text-xs font-semibold uppercase border-2 border-blue-500 bg-blue-100 text-blue-600 tracking-wide shadow-sm"
                  >
                    INTRUSION SET
                  </Badge>
                </div>

                <div className="text-primary mb-3 flex-1 overflow-hidden">
                  <div
                    className="line-clamp-4 overflow-hidden text-ellipsis"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 4,
                    }}
                  >
                    {set.description}
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">first_seen:</span>{" "}
                    {formatDate(set.first_seen)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">last_seen:</span>{" "}
                    {formatDate(set.last_seen)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-auto">
                  {(set.labels || []).slice(0, 3).map((label) => {
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
                  {(set.labels && set.labels.length > 3) && (
                    <Badge
                      variant="outline"
                      className="text-muted-foreground border-border bg-muted"
                    >
                      +{set.labels.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IntrusionSetPage;
