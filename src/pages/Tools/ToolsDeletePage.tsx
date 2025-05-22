import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTool, useDeleteTool } from '@/hooks/useTools';
import { Button } from '@/components/ui/button';

const ToolsDeletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tool, loading, error } = useTool(id || '');
  const [deleteTool, { loading: deleting, error: deleteError }] = useDeleteTool();

  const handleDelete = async () => {
    if (!id) return;
    try {
      await deleteTool({ variables: { id } });
      navigate('/tools');
    } catch (e) {
      // error handled below
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-destructive">{error.message}</div>;
  if (!tool) return <div className="min-h-screen flex items-center justify-center text-destructive">Tool not found.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete Tool</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete the tool <span className="font-semibold">{tool.name}</span>?
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
            {deleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolsDeletePage;
