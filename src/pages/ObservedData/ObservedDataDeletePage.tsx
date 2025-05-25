import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useObservedData, useDeleteObservedData } from "@/hooks/useObservedData";
import { Button } from "@/components/ui/button";

const ObservedDataDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { observedData, loading, error } = useObservedData(id!);
  const [deleteObservedData, { loading: deleting, error: deleteError }] = useDeleteObservedData();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteObservedData({ variables: { id } });
      navigate("/observeddata");
    } catch (e) {
      // error handled below
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-destructive">Failed to load observed data.</div>;
  if (!observedData) return <div className="min-h-screen flex items-center justify-center text-destructive">Observed data not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete Observed Data</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete observed data <span className="font-semibold">{observedData.id}</span>?
          <br />
          This action cannot be undone.
        </p>
        {deleteError && (
          <div className="text-destructive text-sm mb-4">{deleteError.message}</div>
        )}
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate(-1)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={handleDelete}
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ObservedDataDeletePage;
