import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useArtifact, useDeleteArtifact } from "@/hooks/useArtifacts";

export const ArtifactsDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { artifact, loading: loadingArtifact, error: errorArtifact } = useArtifact(id || "");
  const { deleteArtifact, loading, error } = useDeleteArtifact();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteArtifact({ variables: { id } });
      navigate("/artifacts");
    } catch (err) {
      // error handled below
    }
  };

  if (loadingArtifact)
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-400">Loading artifact...</span>
      </div>
    );
  if (errorArtifact)
    return (
      <div className="text-red-500 text-center mt-10">
        {errorArtifact.message}
      </div>
    );
  if (!artifact)
    return (
      <div className="text-center mt-10 text-gray-500">
        Artifact not found.
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Delete Artifact</h1>
      <div className="mb-4">
        Are you sure you want to delete artifact <span className="font-mono">{artifact.id}</span>?
      </div>
      <div className="flex gap-4">
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate(`/artifacts/${artifact.id}`)}
        >
          Cancel
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </div>
  );
};

export default ArtifactsDeletePage;
