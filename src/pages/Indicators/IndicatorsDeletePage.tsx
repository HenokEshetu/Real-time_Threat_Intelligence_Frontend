import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { DELETE_INDICATOR } from "@/graphql/indicator/mutations";

const IndicatorsDeletePage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [deleteIndicator, { loading, error }] = useMutation(DELETE_INDICATOR);

  const handleDelete = async () => {
    try {
      await deleteIndicator({ variables: { id } });
      navigate(-1);
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full text-center">
        <h2 className="text-lg font-semibold mb-4">Delete Indicator</h2>
        <p className="mb-6">Are you sure you want to delete this indicator?</p>
        <div className="flex gap-4 justify-center">
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
        {error && <div className="text-destructive text-xs mt-4">Failed to delete indicator.</div>}
      </div>
    </div>
  );
};

export default IndicatorsDeletePage;
export { IndicatorsDeletePage };
