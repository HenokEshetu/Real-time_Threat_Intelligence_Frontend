import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useIntrusionSetDetail, useDeleteIntrusionSet } from "@/hooks/useintrusionSet";
import { Button } from "@/components/ui/button";

export const IntrusionSetDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { intrusionSet, loading, error } = useIntrusionSetDetail(id);
  const { deleteIntrusionSet, loading: deleting, error: deleteError } = useDeleteIntrusionSet();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteIntrusionSet({ variables: { id } });
      navigate("/intrusionset");
    } catch (e) {
      // error handled by hook
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }
  if (error || !intrusionSet) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Failed to load intrusion set.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-semibold mb-4">Delete Intrusion Set</h1>
        <p className="mb-6">Are you sure you want to delete <span className="font-bold">{intrusionSet.name}</span>?</p>
        <div className="flex gap-4">
          <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
        {deleteError && <div className="text-destructive text-xs mt-4">{deleteError.message}</div>}
      </div>
    </div>
  );
};

export default IntrusionSetDeletePage;
