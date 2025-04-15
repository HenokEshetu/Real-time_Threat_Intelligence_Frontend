import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate for navigation
import { useArtifacts } from '../../hooks/useArtifacts';
import { SearchBar } from '../../components/filters/SearchBar/SearchBar';
import { EntityCard } from '@/components/common/EntityCard/EntityCard';
import { ContentViewer } from '../../components/common/ContentViewer/ContentViewer';
import { Artifact } from '../../types/artifact';

export const ArtifactsPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [searchTerm, setSearchTerm] = useState('');
  const { artifacts, loading, error, loadMore, pageInfo } = useArtifacts({
    search: searchTerm,
    from: 0,
    size: 10, // Adjust size as needed
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleViewArtifact = (id: string) => {
    navigate(`/artifact/${id}`); // Navigate to artifact detail page
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {artifacts.map((artifact: Artifact) => (
          <EntityCard
            key={artifact.id}
            id={artifact.id}
            title={artifact.url || 'Untitled Artifact'} // Display artifact URL or fallback
            subtitle={artifact.mime_type || 'Unknown MIME type'} // Display MIME type
            description={`Confidence: ${artifact.confidence}%`} // Display confidence level
            entityType="artifacts"
            created={artifact.created}
            labels={artifact.labels || []}
            actions={[
              {
                label: 'View Details',
                onClick: () => handleViewArtifact(artifact.id), // Use onClick instead of to
              },
            ]}
            metadata={{
              'Created By': artifact.created_by_ref || 'Unknown',
              'MD5 Hash': artifact.hashes?.MD5 || 'N/A',
            }}
          />
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
