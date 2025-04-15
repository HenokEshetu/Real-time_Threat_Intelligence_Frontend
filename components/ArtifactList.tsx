import React, { useEffect, useState } from 'react';
import { ArtifactService } from '../services/artifact.service';

interface Artifact {
  id: string;
  type: string;
  spec_version: string;
  created: string;
  modified: string;
  mime_type: string;
  url: string;
  confidence: number;
  labels: string[];
}

const ArtifactList: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArtifacts = async () => {
      const data = await ArtifactService.fetchArtifacts({}, (page - 1) * 10, 10);
      setArtifacts(data.results);
      setTotalPages(data.totalPages);
    };
    fetchArtifacts();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <h1>Artifact List</h1>
      <ul>
        {artifacts.map((artifact) => (
          <li key={artifact.id}>
            <p><strong>ID:</strong> {artifact.id}</p>
            <p><strong>Type:</strong> {artifact.type}</p>
            <p><strong>Created:</strong> {artifact.created}</p>
            <p><strong>Confidence:</strong> {artifact.confidence}</p>
            <p><strong>Labels:</strong> {artifact.labels.join(', ')}</p>
            <a href={artifact.url} target="_blank" rel="noopener noreferrer">Download</a>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default ArtifactList;
