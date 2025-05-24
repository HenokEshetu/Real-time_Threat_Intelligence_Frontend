import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArtifact } from "@/hooks/useArtifacts";

const mockLabels: string[] = ["malicious", "file"];
const mockMarkings: string[] = ["TLP:CLEAR"];

const ArtifactsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artifact, loading, error } = useArtifact(id || "");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (error || !artifact) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-red-500">Failed to load artifact.</span>
      </div>
    );
  }

  const labels = artifact.labels && artifact.labels.length > 0 ? artifact.labels : mockLabels;
  const markings = artifact.object_marking_refs && artifact.object_marking_refs.length > 0 ? artifact.object_marking_refs : mockMarkings;
  const created = artifact.created ? new Date(artifact.created).toLocaleString() : "-";
  const modified = artifact.modified ? new Date(artifact.modified).toLocaleString() : "-";
  const confidence = artifact.confidence ?? "-";
  const revoked = artifact.revoked ? "Yes" : "No";
  const lang = artifact.lang || "-";
  const extensions = artifact.extensions || "-";
  const url = artifact.url || "-";
  const mimeType = artifact.mime_type || "-";
  const md5 = artifact.hashes?.MD5 || "-";
  const sha1 = artifact.hashes?.SHA_1 || "-";
  const sha256 = artifact.hashes?.SHA_256 || "-";
  const sha512 = artifact.hashes?.SHA_512 || "-";
  const createdBy = artifact.created_by_ref || "-";
  const decryptionKey = artifact.decryption_key || "-";
  const encryptionAlgorithm = artifact.encryption_algorithm ?? "-";
  const defanged = artifact.defanged ? "Yes" : "No";
  const payloadBin = artifact.payload_bin ? <span className="break-all">{artifact.payload_bin}</span> : "-";
  const enrichment = artifact.enrichment ? JSON.stringify(artifact.enrichment, null, 2) : "-";
  const externalReferences = artifact.external_references || [];

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      <div className="flex flex-row gap-6 w-full items-stretch">
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <div className="flex flex-col flex-1">
            <div className="flex flex-row gap-6 h-full">
              <div className="flex-1 min-w-0 flex flex-col">
                <h2 className="text-base font-semibold text-foreground mb-2">URL</h2>
                <div className="text-md font-normal text-slate-600 mb-4 break-all">
                  {url}
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">MIME Type</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 border border-green-400 rounded p-1 text-xs">
                      {mimeType}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <h2 className="text-base font-semibold text-foreground mb-2">Labels</h2>
                  <div className="flex flex-wrap gap-2">
                    {labels.map((label: string) => (
                      <span
                        key={label}
                        className="bg-blue-100 text-blue-800 border border-blue-400 rounded p-1 text-xs"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-foreground mb-1">Created</h2>
                    <div className="text-xs text-blue-900 font-mono">{created}</div>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-foreground mb-1">Modified</h2>
                    <div className="text-xs text-blue-900 font-mono">{modified}</div>
                  </div>
                </div>
              </div>
              {/* No chart here */}
            </div>
          </div>
        </div>
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
                <span className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-5 rounded text-sm text-center uppercase">
                  {revoked}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Confidence:</strong> {confidence}
              </div>
              <div>
                <strong>Language:</strong> {lang}
              </div>
              <div>
                <strong>Extensions:</strong>{" "}
                {typeof extensions === "string" ? extensions : JSON.stringify(extensions)}
              </div>
              <div>
                <strong>Defanged:</strong> {defanged}
              </div>
              <div>
                <strong>Decryption Key:</strong> {decryptionKey}
              </div>
              <div>
                <strong>Encryption Algorithm:</strong> {encryptionAlgorithm}
              </div>
              <div>
                <strong>Created By:</strong> {createdBy}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hashes */}
      <div className="flex flex-row gap-6 w-full">
        <div className="flex-1 bg-white rounded-lg p-5 border border-gray-300">
          <h2 className="text-base font-semibold mb-2">Hashes</h2>
          <div className="flex flex-col gap-1 text-xs">
            <div>
              <strong>MD5:</strong> {md5}
            </div>
            <div>
              <strong>SHA-1:</strong> {sha1}
            </div>
            <div>
              <strong>SHA-256:</strong> {sha256}
            </div>
            <div>
              <strong>SHA-512:</strong> {sha512}
            </div>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-5 border border-gray-300">
          <h2 className="text-base font-semibold mb-2">Payload Bin</h2>
          <div className="text-xs break-all">{payloadBin}</div>
        </div>
      </div>
      {/* Enrichment */}
      <div className="bg-white rounded-lg p-5 border border-gray-300">
        <h2 className="text-base font-semibold mb-2">Enrichment</h2>
        <pre className="text-xs bg-gray-50 rounded p-2 overflow-x-auto">{enrichment}</pre>
      </div>
      {/* External References */}
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
        title="Edit Artifact"
        onClick={() => {
          if (id) navigate(`/artifacts/${id}/edit`);
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

export default ArtifactsDetail;
