import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseOfActionDetail } from "@/hooks/useCourseOfAction";

const mockLabels: string[] = ["mitigation", "patch"];
const mockMarkings: string[] = ["TLP:CLEAR"];

const CourseOfActionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courseOfAction, loading, error } = useCourseOfActionDetail(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !courseOfAction) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load course of action.</span>
      </div>
    );
  }

  const coa = courseOfAction;

  const name = coa.name || "-";
  const description = coa.description || "-";
  const action = coa.action || "-";
  const actionType = coa.action_type || "-";
  const actionReference = coa.action_reference || "-";
  const actionBin = coa.action_bin || "-";
  const confidence = coa.confidence ?? "-";
  const createdBy = coa.created_by_ref || "-";
  const created = coa.created ? new Date(coa.created).toLocaleString() : "-";
  const modified = coa.modified ? new Date(coa.modified).toLocaleString() : "-";
  const labels = coa.labels && coa.labels.length > 0 ? coa.labels : mockLabels;
  const markings = coa.object_marking_refs && coa.object_marking_refs.length > 0 ? coa.object_marking_refs : mockMarkings;
  const revoked = coa.revoked ? "Yes" : "No";
  const lang = coa.lang || "-";
  const extensions = coa.extensions || "-";
  const relationships = coa.relationship || [];
  const externalReferences = coa.external_references || [];

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      <div className="flex flex-row gap-6 w-full items-stretch">
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row gap-6 h-full">
              <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">Description</h2>
                <div className="text-md font-normal text-slate-600 mb-4">
                  {description || <span className="text-gray-400">No description.</span>}
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">Action</h2>
                  <div className="text-xs text-blue-900 font-mono">{action}</div>
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">Action Type</h2>
                  <div className="text-xs text-blue-900 font-mono">{actionType}</div>
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">Action Reference</h2>
                  <div className="text-xs text-blue-900 font-mono">{actionReference}</div>
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">Action Bin</h2>
                  <div className="text-xs text-blue-900 font-mono">{actionBin}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right container: Basic Information, Labels */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col gap-4 max-w-full items-stretch">
          <h2 className="text-base font-semibold text-foreground mb-2">Basic Information</h2>
          <div className="space-y-4 p-2 flex-1">
            <div className="flex flex-row gap-4">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Marking</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {markings.join(", ")}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Revoked</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {revoked}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold text-base mb-2">Labels</h2>
              <div className="flex flex-wrap gap-2">
                {labels.map((label: string) => (
                  <span
                    key={label}
                    className="px-2 py-1 rounded text-xs font-semibold border bg-blue-100 text-blue-600 border-blue-400"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created By:</strong> {createdBy}
              </div>
              <div>
                <strong>Created:</strong> {created}
              </div>
              <div>
                <strong>Modified:</strong> {modified}
              </div>
              <div>
                <strong>Language:</strong> {lang}
              </div>
              <div>
                <strong>Confidence:</strong> {confidence}
              </div>
              <div>
                <strong>Extensions:</strong>{" "}
                {typeof extensions === "string" ? extensions : JSON.stringify(extensions)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Relationships Section */}
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
      {/* External Reference Section */}
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
      {/* Floating Edit Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors group"
        title="Edit Course of Action"
        onClick={() => {
          if (id) navigate(`/courseofaction/${id}/edit`);
        }}
      >
        {/* Pencil-square icon */}
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

export default CourseOfActionDetail;
