import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_THREAT_ACTOR } from "@/graphql/threatactor/mutations";
import { Button } from "@/components/ui/button";

export const ThreatActorDeletePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [deleteThreatActor, { loading, error }] = useMutation(DELETE_THREAT_ACTOR);

  const handleDelete = async () => {
    await deleteThreatActor({ variables: { id } });
    navigate("/threatactors");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-lg font-semibold mb-4">Delete Threat Actor</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete this threat actor? This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
        {error && (
          <div className="text-destructive text-xs mt-4">
            Failed to delete threat actor.
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreatActorDeletePage;
