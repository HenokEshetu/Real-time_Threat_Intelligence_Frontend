import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArtifact } from '../../hooks/useArtifacts'; // ✅ Correct hook
import { EntityDetail } from '../../components/common/EntityDetail/EntityDetail'; // ✅ Check this path
import { Loading } from '../../components/common/Loading/Loading';
import { ErrorMessage } from '../../components/common/ErrorMessage/ErrorMessage';

export const ArtifactDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { artifact, loading, error } = useArtifact(id || '');

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
        entity={artifact}
        entityType="artifact"
        title={artifact.name}
        subtitle={artifact.mime_type}
        description={artifact.description}
        labels={artifact.labels}
        created={artifact.created}
        actions={[
          { label: 'Edit', to: `/artifacts/${artifact.id}/edit` },
        ]}
      />
    </div>
  );
};
