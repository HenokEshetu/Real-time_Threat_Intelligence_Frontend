import React, { useState } from 'react';
import { useTools } from '@/hooks/useTools';
import { useNavigate } from 'react-router-dom';
import type { Tool } from '@/types/tool';
import { HexagonToolCard } from '@/components/common/Tools/HexagonToolCard';

function chunkColumns<T>(arr: T[], colCount: number): T[][] {
  const cols: T[][] = Array.from({ length: colCount }, (): any => []);
  arr.forEach((item, idx) => {
    cols[idx % colCount].push(item);
  });
  return cols;
}

export const ToolsPage: React.FC = () => {
  const { tools, loading, error } = useTools({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const COLS = 4;
  const columns = chunkColumns(tools, COLS);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 flex items-center justify-center">
        Error loading tools. Please try again later.
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen p-8 w-full">
      <div className="flex flex-row justify-center items-start gap-x-0 relative">
        {columns.map((col, colIdx) => (
          <div
            key={colIdx}
            className={`
              flex flex-col items-center
              ${colIdx % 2 === 1 ? 'mt-[170px]' : ''}
            `}
          >
            {col.map((tool: Tool, rowIdx: number) => (
              <div
                key={tool.id}
                className={`
                  transition-all
                  ${hoveredCard === tool.id ? 'z-20' : 'z-0'}
                  mb-8
                `}
                onMouseEnter={() => setHoveredCard(tool.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <HexagonToolCard
                  tool={tool}
                  onClick={() => navigate(`/tools/${tool.id}`)}
                  className={
                    hoveredCard === tool.id
                      ? 'ring-4 ring-red-500 border-8 border-red-700 shadow-2xl'
                      : 'border-8 border-red-600'
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
