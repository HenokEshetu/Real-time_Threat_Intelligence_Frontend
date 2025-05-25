import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useObservedData } from "@/hooks/useObservedData";
import { Badge } from "@/components/ui/badge";

const ObservedDataDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { observedData, loading, error } = useObservedData(id!);
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !observedData) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load observed data.</span>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const labels = observedData.labels && observedData.labels.length > 0 ? observedData.labels : [];
  const objectRefs = observedData.object_refs && observedData.object_refs.length > 0 ? observedData.object_refs : [];
  const objectMarkingRefs = observedData.object_marking_refs && observedData.object_marking_refs.length > 0 ? observedData.object_marking_refs : [];
  const relationships = observedData.relationship && observedData.relationship.length > 0 ? observedData.relationship : [];
  const externalReferences = observedData.external_references && observedData.external_references.length > 0 ? observedData.external_references : [];

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      <div className="flex flex-row gap-6 w-full items-stretch">
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <h2 className="text-base font-semibold text-foreground mb-2">Observed Data</h2>
            <div className="text-md font-normal text-slate-600 mb-4">
              <strong>Type:</strong> {observedData.type}
            </div>
            <div className="mb-4">
              <h2 className="text-base font-semibold text-foreground mb-2">Labels</h2>
              <div className="flex flex-wrap gap-2">
                {labels.length > 0 ? (
                  labels.map((label: string) => (
                    <Badge key={label} variant="outline">{label}</Badge>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">-</span>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div>
                <h2 className="text-base font-semibold text-foreground mb-1">First Observed</h2>
                <div className="text-xs text-blue-900 font-mono">{formatDate(observedData.first_observed)}</div>
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground mb-1">Last Observed</h2>
                <div className="text-xs text-blue-900 font-mono">{formatDate(observedData.last_observed)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col gap-4 max-w-full items-stretch">
          <h2 className="text-base font-semibold text-foreground mb-2">Basic Information</h2>
          <div className="space-y-4 p-2 flex-1">
            <div className="flex flex-row gap-4">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Number Observed</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {observedData.number_observed}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Revoked</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {observedData.revoked ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created:</strong> {formatDate(observedData.created)}
              </div>
              <div>
                <strong>Modified:</strong> {formatDate(observedData.modified)}
              </div>
              <div>
                <strong>Language:</strong> {observedData.lang || "-"}
              </div>
              <div>
                <strong>Spec Version:</strong> {observedData.spec_version}
              </div>
              <div>
                <strong>Created By:</strong> {observedData.created_by_ref || "-"}
              </div>
              <div>
                <strong>Object Refs:</strong> {objectRefs.join(", ") || "-"}
              </div>
              <div>
                <strong>Object Marking Refs:</strong> {objectMarkingRefs.join(", ") || "-"}
              </div>
              <div>
                <strong>Confidence:</strong> {observedData.confidence ?? "-"}
              </div>
              <div>
                <strong>Type:</strong> {observedData.type}
              </div>
            </div>
          </div>
        </div>
      </div>
      {relationships.length > 0 && (
        <div className="mt-2 bg-white rounded-lg p-5 border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Relationships</h2>
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
      {externalReferences.length > 0 && (
        <div className="mt-2 bg-white rounded-lg p-5 border border-gray-300">
          <h2 className="text-xl font-bold mb-4">External References</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Source Name</th>
                <th className="text-left p-2">URL</th>
                <th className="text-left p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {externalReferences.map((ref: any, idx: number) => (
                <tr key={idx} className="border-b hover:bg-slate-50">
                  <td className="p-2">
                    <span className="bg-blue-50 text-blue-600 border border-blue-400 rounded px-2 py-1 text-xs font-semibold">
                      {ref.source_name}
                    </span>
                  </td>
                  <td className="p-2">
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline break-all"
                      >
                        {ref.url}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="p-2">
                    {ref.description ? (
                      <span>{ref.description}</span>
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
      <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors group"
        title="Edit ObservedData"
        onClick={() => {
          if (id) navigate(`/observeddata/${id}/edit`);
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
      </button>
    </div>
  );
};

export default ObservedDataDetail;
