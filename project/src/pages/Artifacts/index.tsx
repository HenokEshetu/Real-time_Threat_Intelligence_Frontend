import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArtifacts } from '../../hooks/useArtifacts';
import { SearchBar } from '../../components/filters/SearchBar/SearchBar';
import { EntityCard } from '../../components/common/EntityCard/EntityCard';
import { ContentViewer } from '../../components/common/ContentViewer/ContentViewer';
import { Artifact } from '../../types/artifact';

export const ArtifactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { artifacts, loading, error, loadMore, pageInfo } = useArtifacts({
    search: searchTerm,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (loading && !artifacts.length) return <div>Loading artifacts...</div>;
  if (error) return <div>Error loading artifacts: {error.message}</div>;

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header d-flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Artifacts</h1>
        <Link to="/artifacts/create" className="btn btn-primary">
          + New Artifact
        </Link>
      </div>

      {/* Search */}
      <SearchBar onSearch={handleSearch} />

      {/* Artifact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {artifacts.map((artifact: Artifact) => (
          <EntityCard
            key={artifact.id}
            id={artifact.id}
            title={artifact.name || 'Untitled Artifact'}
            subtitle={artifact.mime_type || 'Unknown MimeType'}
            description={artifact.description || 'No description available'}
            entityType="Artifact"
            created={artifact.created}
            actions={[
              {
                label: 'View Details',
                to: `/artifacts/${artifact.id}`,
              },
            ]}
          >
            {/* Show content preview if available */}
            {(artifact.url || artifact.payload_bin) && (
              <ContentViewer
                content={artifact.payload_bin}
                mimeType={artifact.mime_type}
                url={artifact.url}
              />
            )}
          </EntityCard>
        ))}
      </div>

      {/* Pagination */}
      {pageInfo?.hasNextPage && (
        <div className="text-center mt-6">
          <button onClick={loadMore} className="btn btn-secondary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};
