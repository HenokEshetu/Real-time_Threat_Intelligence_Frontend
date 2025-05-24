import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_CAMPAIGN } from '@/graphql/campaign/mutations';
import { GET_CAMPAIGN } from '@/graphql/campaign/queries';

export const CampaignsDeletePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading: loadingQuery, error: errorQuery } = useQuery(GET_CAMPAIGN, { variables: { id } });
  const [deleteCampaign, { loading, error }] = useMutation(DELETE_CAMPAIGN);

  const handleDelete = async () => {
    try {
      await deleteCampaign({ variables: { id } });
      navigate('/campaigns');
    } catch {
      // error handled below
    }
  };

  if (loadingQuery) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }
  if (errorQuery || !data?.campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Failed to load campaign.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted">
      <div className="bg-background rounded-xl shadow p-8 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4 text-destructive">Delete Campaign</h1>
        <p className="mb-6 text-center">
          Are you sure you want to delete the campaign <span className="font-semibold">{data.campaign.name}</span>?
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
        {error && (
          <div className="text-destructive text-xs mt-4">
            Failed to delete campaign.
          </div>
        )}
      </div>
    </div>
  );
};
