import React from 'react';
import { Artifact } from '../../types/artifact';
import { ArtifactViewer } from './ArtifactViewer';
interface ArtifactDetailProps {
  artifact: Artifact;
}

export const ArtifactDetail = ({ artifact }: ArtifactDetailProps) => {
  return (
    <div className="artifact-detail">
      <h2>{artifact.name || 'Unnamed Artifact'}</h2>
      
      <div className="detail-section">
        <h3>Metadata</h3>
        <table className="table">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{artifact.id}</td>
            </tr>
            <tr>
              <th>MIME Type</th>
              <td>{artifact.mime_type}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>{new Date(artifact.created).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Modified</th>
              <td>{new Date(artifact.modified).toLocaleString()}</td>
            </tr>
            {artifact.hashes && (
              <tr>
                <th>Hashes</th>
                <td>
                  {Object.entries(artifact.hashes).map(([algo, hash]) => (
                    <div key={algo}>
                      <strong>{algo}:</strong> {hash}
                    </div>
                  ))}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {artifact.description && (
        <div className="detail-section">
          <h3>Description</h3>
          <p>{artifact.description}</p>
        </div>
      )}

      <div className="detail-section">
        <h3>Content</h3>
        <ArtifactViewer artifact={artifact} />
      </div>
    </div>
  );
};