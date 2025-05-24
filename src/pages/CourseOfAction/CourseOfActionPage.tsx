import React, { useState } from "react";
import { useCoursesOfAction } from "@/hooks/useCourseOfAction";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import type { CourseOfAction } from "@/types/courseofaction";

const tailwindColors = [
  { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600' },
  { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-600' },
  { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-600' },
  { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-600' },
  { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-600' },
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

export const CourseOfActionPage: React.FC = () => {
  const { coursesOfAction, loading, error } = useCoursesOfAction({});
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
      Error loading courses of action. Please try again later.
    </div>
  );

  const results = coursesOfAction?.results || [];

  return (
    <div className="grid grid-cols-4 gap-6 p-4 relative min-h-screen">
      {results.map((coa: CourseOfAction) => {
        const isHovered = hoveredCard === coa.id;
        const labels = coa.labels || [];
        let uniqueLabels: string[] = [];
        labels.forEach((lbl: string) => {
          if (!uniqueLabels.includes(lbl)) uniqueLabels.push(lbl);
        });
        const displayLabels = uniqueLabels.slice(0, 3);
        const extraCount = uniqueLabels.length - displayLabels.length;

        return (
          <div
            key={coa.id}
            className="contents"
            onClick={() => navigate(`/courseofaction/${coa.id}`)}
          >
            <Card
              className={`h-56 rounded-xl border shadow-sm overflow-hidden relative transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] mb-6
                ${isHovered ? "border-blue-500 shadow-blue-300" : ""}`}
              onMouseEnter={() => setHoveredCard(coa.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-5 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-base truncate">
                    {coa.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="px-4 py-1 text-xs font-semibold uppercase border-2 border-blue-500 bg-blue-100 text-blue-600 tracking-wide shadow-sm"
                  >
                    COURSE OF ACTION
                  </Badge>
                </div>
                <CardDescription className="text-primary mb-3 flex-1 overflow-hidden">
                  <div className="line-clamp-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 4 }}>
                    {coa.description}
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
                    <span className="font-medium">created:</span> {formatDate(coa.created)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">modified:</span> {formatDate(coa.modified)}
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

export default CourseOfActionPage;
