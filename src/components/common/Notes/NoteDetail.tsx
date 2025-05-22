import React from "react";
import { Note } from "@/types/note";

interface NoteDetailProps {
  note: Note;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note }) => {
  if (!note) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-gray-400">No note found.</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8 px-3">
      <div className="flex flex-row gap-6 w-full items-stretch">
        {/* Left: Content and Abstract */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col items-stretch">
          <h2 className="text-base font-semibold text-foreground mb-2">Abstract</h2>
          <div className="text-md font-normal text-slate-600 mb-4">
            {note.abstract || <span className="text-gray-400">No abstract.</span>}
          </div>
          <h2 className="text-base font-semibold text-foreground mb-2">Content</h2>
          <div className="text-sm text-blue-900 font-mono whitespace-pre-wrap">
            {note.content}
          </div>
        </div>
        {/* Right: Basic Info */}
        <div className="flex-1 min-w-0 bg-white rounded-lg p-5 border border-gray-300 flex flex-col gap-4 max-w-full items-stretch">
          <h2 className="text-base font-semibold text-foreground mb-2">Basic Information</h2>
          <div className="space-y-4 p-2 flex-1">
            <div>
              <strong>ID:</strong> <span className="text-xs">{note.id}</span>
            </div>
            <div>
              <strong>Authors:</strong>{" "}
              {note.authors && note.authors.length > 0
                ? note.authors.join(", ")
                : <span className="text-gray-400">-</span>}
            </div>
            <div>
              <strong>Labels:</strong>{" "}
              {note.labels && note.labels.length > 0
                ? note.labels.map(label => (
                    <span key={label} className="bg-blue-100 text-blue-800 border border-blue-800 py-1 px-2 rounded text-xs mr-1">
                      {label}
                    </span>
                  ))
                : <span className="text-gray-400">-</span>}
            </div>
            <div>
              <strong>Created:</strong> {new Date(note.created).toLocaleString()}
            </div>
            <div>
              <strong>Modified:</strong> {new Date(note.modified).toLocaleString()}
            </div>
            <div>
              <strong>Created By:</strong> {note.created_by_ref || "-"}
            </div>
            <div>
              <strong>Language:</strong> {note.lang || "-"}
            </div>
            <div>
              <strong>Type:</strong> {note.type}
            </div>
            <div>
              <strong>Spec Version:</strong> {note.spec_version}
            </div>
            <div>
              <strong>Revoked:</strong> {note.revoked ? "Yes" : "No"}
            </div>
          </div>
        </div>
      </div>
      {/* Relationships */}
      {note.relationship && note.relationship.length > 0 && (
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
              {note.relationship.map((rel, idx) => (
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
      {/* External References */}
      {note.external_references && note.external_references.length > 0 && (
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
              {note.external_references.map((ref, idx) => (
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
    </div>
  );
};

export default NoteDetail;
