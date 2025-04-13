import React from 'react';
import { Link } from 'react-router-dom';
import { Artifact } from '../../types/artifact';
import { getFileIcon } from '../common/fileIcons/fileIcons';

interface ArtifactCardProps {
  artifact: Artifact;
}

export const ArtifactCard = ({ artifact }: ArtifactCardProps) => {
  const fileIcon = getFileIcon(artifact.mime_type);
  
  return (
    <div className="card">
      <div className="card-header">
        {fileIcon}
        <h3>{artifact.name || 'Unnamed Artifact'}</h3>
      </div>
      <div className="card-body">
        <p>Type: {artifact.mime_type}</p>
        <p>Created: {new Date(artifact.created).toLocaleDateString()}</p>
        {artifact.labels && artifact.labels.length > 0 && (
          <div className="tags">
            {artifact.labels.map(label => (
              <span key={label} className="tag">{label}</span>
            ))}
          </div>
        )}
      </div>
      <div className="card-footer">
        <Link to={`/artifacts/${artifact.id}`} className="btn btn-sm btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};