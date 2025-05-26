import React from "react";
import type { Tool } from "@/types/tool";
import { Badge } from "@/components/ui/badge";
import { WrenchIcon } from "lucide-react";

interface HexagonToolCardProps {
  tool: Tool;
  onClick?: () => void;
  className?: string;
}

export const HexagonToolCard: React.FC<HexagonToolCardProps> = ({ tool, onClick, className }) => (
  <div
    className={`
      w-[340px] h-[300px] flex items-center justify-center
      bg-gradient-to-br from-cyan-400 via-blue-400 to-fuchsia-500
      m-2
      shadow-xl
      transition-all duration-200 cursor-pointer relative group
      [clip-path:polygon(25%_6.7%,75%_6.7%,100%_50%,75%_93.3%,25%_93.3%,0%_50%)]
      hover:scale-105 hover:shadow-2xl
      hover:bg-gradient-to-br hover:from-fuchsia-500 hover:via-blue-400 hover:to-cyan-400
      active:scale-95
      ${className || ""}
    `}
    onClick={onClick}
    tabIndex={0}
    role="button"
    style={{
      transition: "box-shadow 0.2s, background 0.2s, transform 0.2s",
    }}
  >
    <div className="flex flex-col items-center justify-center h-full w-full p-8 bg-white/80 rounded-[2rem]">
      <div className="mb-4">
        <WrenchIcon className="h-16 w-16 text-blue-700 drop-shadow-lg" />
      </div>
      <div className="font-bold text-blue-900 text-center text-xl truncate">{tool.name}</div>
      <div className="text-sm text-gray-700 text-center line-clamp-3">{tool.description}</div>
      <div className="flex flex-wrap gap-2 justify-center mt-4">
        {(tool.labels || []).slice(0, 2).map(label => (
          <Badge key={label} className="text-sm bg-blue-100 text-blue-700 border-none">{label}</Badge>
        ))}
      </div>
    </div>
  </div>
);
