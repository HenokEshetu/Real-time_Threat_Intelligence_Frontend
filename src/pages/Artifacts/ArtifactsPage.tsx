import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArtifacts } from "@/hooks/useArtifacts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { Artifact } from "@/types/artifact";

const tailwindColors = [
  { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600' },
  { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-600' },
  { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-600' },
  { bg: 'bg-pink-50', border: 'border-pink-500', text: 'text-pink-600' },
  { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-600' },
  { bg: 'bg-rose-50', border: 'border-rose-500', text: 'text-rose-600' },
  { bg: 'bg-cyan-50', border: 'border-cyan-500', text: 'text-cyan-600' },
  { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-600' },
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

export const ArtifactsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { artifacts, loading, error, loadMore, pageInfo } = useArtifacts({
    filters: searchTerm ? { url: searchTerm } : {},
    from: 0,
    size: 12,
  });

  const labelColorMap = React.useRef<Map<string, (typeof tailwindColors)[0]>>(new Map());

  if (loading && !artifacts.length)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600 flex items-center justify-center">
        Error loading artifacts. Please try again later.
      </div>
    );

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Artifacts</h1>
        <Link to="/artifacts/create" className="btn btn-primary">
          + New Artifact
        </Link>
      </div>
      <div className="mb-4">
        <input
          className="border rounded px-3 py-2 w-full max-w-md"
          placeholder="Search by URL or keyword..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artifacts.map((artifact: Artifact) => {
          const labels = artifact.labels || [];
          let uniqueLabels: string[] = [];
          labels.forEach((lbl: string) => {
            if (!uniqueLabels.includes(lbl)) uniqueLabels.push(lbl);
          });
          const displayLabels = uniqueLabels.slice(0, 3);
          const extraCount = uniqueLabels.length - displayLabels.length;
          return (
            <Card
              key={artifact.id}
              className="h-64 rounded-xl border shadow-sm overflow-hidden relative transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] mb-6"
              onClick={() => navigate(`/artifacts/${artifact.id}`)}
            >
              <CardContent className="p-5 flex flex-col h-full relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-base truncate">
                    {artifact.url || "Untitled Artifact"}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="px-4 py-1 text-xs font-semibold uppercase border-2 border-blue-500 bg-blue-100 text-blue-600 tracking-wide shadow-sm"
                  >
                    ARTIFACT
                  </Badge>
                </div>
                <CardDescription className="text-primary mb-3 flex-1 overflow-hidden">
                  <div className="line-clamp-3 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
                    {artifact.mime_type || "Unknown MIME type"}
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
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">Confidence:</span>{" "}
                    {artifact.confidence ?? "-"}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {artifact.created ? new Date(artifact.created).toLocaleDateString() : "-"}
                  </div>
                  <div>
                    <span className="font-medium">MD5:</span>{" "}
                    {artifact.hashes?.MD5 || "N/A"}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {pageInfo?.hasNextPage && (
        <div className="text-center mt-6">
          <button onClick={loadMore} className="btn btn-secondary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
