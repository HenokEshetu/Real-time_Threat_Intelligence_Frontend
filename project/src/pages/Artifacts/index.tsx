import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useArtifacts } from '../../../hooks/useArtifacts';
import { ArtifactCard } from '../../../components/artifacts/ArtifactCard';
import { SearchBar } from '../../../components/filters';

export const ArtifactsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { artifacts, loading, error, loadMore, pageInfo } = useArtifacts({
    search: searchTerm
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  if (loading && !artifacts.length) return <div>Loading artifacts...</div>;
  if (error) return <div>Error loading artifacts: {error.message}</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1>Artifacts</h1>
        <Link to="/artifacts/create" className="btn btn-primary">
          New Artifact
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="grid">
        {artifacts.map((artifact) => (
          <ArtifactCard key={artifact.id} artifact={artifact} />
        ))}
      </div>

      {pageInfo?.hasNextPage && (
        <div className="text-center mt-3">
          <button onClick={loadMore} className="btn btn-secondary">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};