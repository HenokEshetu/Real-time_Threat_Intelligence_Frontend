import React from 'react';
import type { Tool } from '@/types/tool';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../Loading/Loading';
import { Badge } from '@/components/ui/badge';

interface ToolDetailProps {
  tool?: Tool | null;
}

const mockKillChainPhases = [
  { kill_chain_name: 'mitre-attack', phase_name: 'initial-access' },
  { kill_chain_name: 'mitre-attack', phase_name: 'execution' },
];

const mockLabels = ['malware', 'remote-access'];
const mockExternalReferences = [
  { source_name: 'example', url: 'https://example.com', description: 'Example ref' },
];

const ToolDetail: React.FC<ToolDetailProps> = ({ tool }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!tool) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Tool not found.</span>
      </div>
    );
  }

  const killChainPhases = tool.kill_chain_phases?.length
    ? tool.kill_chain_phases
    : mockKillChainPhases;
  const labels = tool.labels?.length ? tool.labels : mockLabels;
  const externalReferences = tool.external_references?.length
    ? tool.external_references
    : mockExternalReferences;
  const createdBy = tool.created_by_ref || '-';
  const lastUpdated = tool.modified
    ? new Date(tool.modified).toLocaleDateString()
    : new Date().toLocaleDateString();
  const created = tool.created
    ? new Date(tool.created).toLocaleString()
    : '-';
  const modified = tool.modified
    ? new Date(tool.modified).toLocaleString()
    : '-';

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      {/* First row: two containers, each takes half width */}
      <div className="flex flex-row gap-6 w-full items-stretch">
        {/* Left container: Description, Tool types, Version, Kill Chain Phases */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row gap-6 h-full">
              {/* Description, Tool types, Version */}
              <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">
                  Description
                </h2>
                <div className="text-md font-normal text-slate-600 mb-4">
                  {tool.description || (
                    <span className="text-gray-400">No description.</span>
                  )}
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">
                    Tool types
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {tool.tool_types && tool.tool_types.length > 0 ? (
                      tool.tool_types.map((type: string) => (
                        <span
                          key={type}
                          className="bg-blue-50 text-blue-900 border-blue-200 border rounded p-1 text-xs"
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">
                    Tool version
                  </h2>
                  <div className="text-xs text-blue-900 font-mono">
                    {tool.tool_version || '-'}
                  </div>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground mb-1">
                    Confidence
                  </h2>
                  <div className="text-xs text-blue-900 font-mono">
                    {typeof tool.confidence === 'number' ? tool.confidence : '-'}
                  </div>
                </div>
              </div>
              {/* Kill Chain Phases */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">
                  Kill Chain Phases
                </h2>
                <div className="flex flex-col gap-1">
                  {killChainPhases.map((phase, idx) => (
                    <span
                      key={idx}
                      className="bg-green-50 text-green-800 border border-green-200 rounded px-2 py-1 text-xs font-semibold"
                    >
                      {phase.kill_chain_name} / {phase.phase_name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right container: Basic Information with labels */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col gap-4 max-w-full items-stretch">
          <h2 className="text-base font-semibold text-foreground mb-2">
            Basic Information
          </h2>
          <div className="space-y-4 p-2 flex-1">
            <div className="flex flex-row gap-4">
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Spec Version</h2>
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {tool.spec_version || '-'}
                </span>
              </div>
              <div className="w-[48%]">
                <h2 className="font-bold text-sm mb-2">Revoked</h2>
                <span className="bg-gray-100 text-gray-800 border border-gray-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {tool.revoked ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h2 className="font-semibold text-base mb-2">Labels</h2>
                <div className="flex flex-wrap gap-2">
                  {labels.map((label: string) => (
                    <Badge key={label} className="bg-blue-100 text-blue-700 border-none">
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <h2 className="font-bold text-base mb-2">Created By</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {createdBy}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-base mb-2">Last Updated</h2>
                <div className="bg-slate-200 p-2 rounded text-sm uppercase">
                  {lastUpdated}
                </div>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Created:</strong> {created}
              </div>
              <div>
                <strong>Modified:</strong> {modified}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* External Reference Section */}
      {externalReferences && externalReferences.length > 0 && (
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
      {/* <button
        className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-lg p-4 flex items-center justify-center transition-colors group"
        title="Edit Tool"
        onClick={() => {
          if (id) navigate(`/tools/${id}/edit`);
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
      </button> */}
    </div>
  );
};

export default ToolDetail;
