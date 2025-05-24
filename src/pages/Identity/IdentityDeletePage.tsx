import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useIdentityDetail, useDeleteIdentity } from "@/hooks/useIdentity";

export const IdentityDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { identity, loading: loadingDetail, error: errorDetail } = useIdentityDetail(id);
  const { deleteIdentity, loading, error } = useDeleteIdentity();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteIdentity({ variables: { id } });
      navigate("/identity");
    } catch (e) {
      // error handled below
    }
  };

  if (loadingDetail) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }
  if (errorDetail || !identity) {
    return (
      <div className="flex items-center justify-center h-40">
        <span className="text-red-500">Failed to load identity.</span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Delete Identity</h1>
      <p className="mb-6">
        Are you sure you want to delete the identity <span className="font-semibold">{identity.name}</span>?
        This action cannot be undone.
      </p>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-2 rounded font-semibold"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
        <button
          onClick={() => navigate(`/identity/${id}`)}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-semibold"
        >
          Cancel
        </button>
      </div>
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </div>
  );
};

export default IdentityDeletePage;
