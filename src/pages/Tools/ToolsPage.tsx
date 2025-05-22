import React, { useState } from "react";
import { useTools } from "../../hooks/useTools";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WrenchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ToolsPage: React.FC = () => {
  const { tools, loading, error } = useTools({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const glowEffects = [
    { shadow: 'shadow-blue-300', border: 'border-blue-500', text: 'text-blue-600' },
    { shadow: 'shadow-green-300', border: 'border-green-500', text: 'text-green-600' },
    { shadow: 'shadow-yellow-300', border: 'border-yellow-500', text: 'text-yellow-600' },
    { shadow: 'shadow-purple-300', border: 'border-purple-500', text: 'text-purple-600' },
    { shadow: 'shadow-pink-300', border: 'border-pink-500', text: 'text-pink-600' },
    { shadow: 'shadow-cyan-300', border: 'border-cyan-500', text: 'text-cyan-600' },
    { shadow: 'shadow-gray-400', border: 'border-gray-500', text: 'text-gray-600' },
  ];
  const getRandomGlowEffect = () => glowEffects[Math.floor(Math.random() * glowEffects.length)];

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
      Error loading tools. Please try again later.
    </div>
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-4 relative min-h-screen">
      {tools.map((tool) => {
        const isHovered = hoveredCard === tool.id;
        const glowEffect = isHovered ? getRandomGlowEffect() : null;
        return (
          <Card
            key={tool.id}
            className={`h-80 rounded-xl border shadow-sm overflow-hidden relative transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] mb-4
              ${glowEffect ? `${glowEffect.border} ${glowEffect.shadow}` : ''}`}
            onMouseEnter={() => setHoveredCard(tool.id)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate(`/tools/${tool.id}`)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${tool.name}`}
          >
            {/* Wrench icon at bottom right */}
            <div className="absolute bottom-2 right-2 z-10" style={{ pointerEvents: "none" }}>
              <WrenchIcon className="h-10 w-10" />
            </div>
            <CardContent className="p-5 flex flex-col h-full relative z-10">
              <div className="flex justify-between items-start mb-2">
                <CardTitle 
                  className={`text-base truncate transition-colors duration-300 ${glowEffect ? glowEffect.text : 'text-foreground'}`}
                >
                  Name: {tool.name}
                </CardTitle>
                <Badge
                  variant="outline"
                  className="px-4 py-1 text-xs font-semibold uppercase border-2 border-blue-500 bg-blue-100 text-blue-600 tracking-wide shadow-sm"
                >
                  TOOL
                </Badge>
              </div>
              <CardDescription className="text-primary mb-3 flex-1 overflow-hidden">
                <div className="line-clamp-4 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 4 }}>
                  {tool.description}
                </div>
              </CardDescription>
              <div className="flex flex-col gap-1 mb-2">
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Created:</span> {formatDate(tool.created)}
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Modified:</span> {formatDate(tool.modified)}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ToolsPage;
