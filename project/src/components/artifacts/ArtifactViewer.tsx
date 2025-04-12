import React from 'react';
import { Artifact } from '../../types/artifact';

interface ArtifactViewerProps {
  artifact: Artifact;
}

export const ArtifactViewer = ({ artifact }: ArtifactViewerProps) => {
  const renderContent = () => {
    if (artifact.payload_bin) {
      // Basic content type detection
      if (artifact.mime_type === 'application/json') {
        try {
          const json = JSON.parse(atob(artifact.payload_bin));
          return (
            <pre className="json-viewer">
              {JSON.stringify(json, null, 2)}
            </pre>
          );
        } catch {
          return <div className="text-viewer">{atob(artifact.payload_bin)}</div>;
        }
      } else if (artifact.mime_type.startsWith('text/')) {
        return <div className="text-viewer">{atob(artifact.payload_bin)}</div>;
      } else {
        return (
          <div className="binary-viewer">
            <p>Binary content - {artifact.payload_bin.length} bytes</p>
            <button className="btn btn-sm btn-outline-secondary">
              Download
            </button>
          </div>
        );
      }
    } else if (artifact.url) {
      return (
        <div className="url-viewer">
          <a href={artifact.url} target="_blank" rel="noopener noreferrer">
            {artifact.url}
          </a>
        </div>
      );
    } else {
      return <div className="no-content">No content available</div>;
    }
  };

  return (
    <div className="artifact-viewer">
      {renderContent()}
    </div>
  );
};