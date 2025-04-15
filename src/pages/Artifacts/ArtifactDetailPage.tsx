import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArtifact } from '../../hooks/useArtifacts'; // Use the new hook
import { EntityDetail } from '../../components/common/EntityDetail/EntityDetail';
import { Loading } from '../../components/common/Loading/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage';

export const ArtifactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { artifact, loading, error } = useArtifact(id || ''); // Fetch artifact by ID

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!artifact) return <ErrorMessage message="Artifact not found" />;

  return (
    <div className="container">
      <div className="mb-3">
        <Link to="/artifacts" className="btn btn-outline-secondary">
          Back to List
        </Link>
        <Link 
          to={`/artifacts/${id}/edit`} 
          className="btn btn-primary ms-2"
        >
          Edit
        </Link>
      </div>
      
      <EntityDetail
        id={artifact.id}
        name={artifact.name}
        description={artifact.description}
        created={artifact.created}
        modified={artifact.modified}
        type={artifact.type}
        icon={artifact.mime_type}
        metadata={{
          Confidence: `${artifact.confidence}%`,
          'Created By': artifact.created_by_ref || 'Unknown',
          'MD5 Hash': artifact.hashes?.MD5 || 'N/A',
          'SHA-256 Hash': artifact.hashes?.['SHA-256'] || 'N/A',
        }}
        hashes={artifact.hashes}
        children={
          artifact.payload_bin && (
            <details>
              <summary><strong>Payload:</strong></summary>
              <pre>{artifact.payload_bin}</pre>
            </details>
          )
        }
      />
    </div>
  );
};