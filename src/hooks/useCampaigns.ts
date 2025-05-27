import { useQuery, useMutation } from '@apollo/client';
import { GET_CAMPAIGN, SEARCH_COMPAIGNS } from '../graphql/campaign/queries';
import {
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  CAMPAIGN_CREATED_SUBSCRIPTION,
  CAMPAIGN_UPDATED_SUBSCRIPTION,
  CAMPAIGN_DELETED_SUBSCRIPTION,
} from '../graphql/campaign/mutations';
import { Campaign, SearchCampaignsResult } from '../types/campaign';
import { useEffect } from 'react';
import { toast } from 'sonner';

// Fetch a single campaign by ID
export function useCampaign(id: string) {
  const { data, loading, error } = useQuery<{ campaign: Campaign }>(
    GET_CAMPAIGN,
    {
      variables: { id },
      skip: !id,
    },
  );
  return {
    campaign: data?.campaign,
    loading,
    error,
  };
}

// Fetch campaigns with filters, pagination, and fetchMore
export const useCampaigns = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery<{
    searchCampaigns: SearchCampaignsResult;
  }>(SEARCH_COMPAIGNS, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: CAMPAIGN_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.campaignCreated;
        if (!newItem) return prev;
        if (
          prev.searchCampaigns.results.some(
            (c: Campaign) => c.id === newItem.id,
          )
        ) {
          return prev;
        }
        return {
          ...prev,
          searchCampaigns: {
            ...prev.searchCampaigns,
            results: [newItem, ...prev.searchCampaigns.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchCampaigns.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: CAMPAIGN_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.campaignUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchCampaigns: {
            ...prev.searchCampaigns,
            results: prev.searchCampaigns.results.map((c: Campaign) =>
              c.id === updated.id ? { ...c, ...updated } : c,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: CAMPAIGN_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.campaignDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchCampaigns: {
            ...prev.searchCampaigns,
            results: prev.searchCampaigns.results.filter(
              (c: Campaign) => c.id !== deletedId,
            ),
            total: prev.searchCampaigns.total - 1,
          },
        };
      },
    });

    return () => {
      unsubCreate();
      unsubUpdate();
      unsubDelete();
    };
  }, [subscribeToMore, pageSize]);

  if (error) {
    toast.error('Error loading campaign data', {
      description: error?.message,
    });
  }

  const campaigns = data?.searchCampaigns?.results || [];
  const total = data?.searchCampaigns?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchCampaigns: {
            ...fetchMoreResult.searchCampaigns,
            results: [
              ...(prev?.searchCampaigns?.results || []),
              ...(fetchMoreResult.searchCampaigns?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    campaigns,
    loading,
    error,
    loadMore,
    total,
    hasMore: campaigns.length === pageSize,
  };
};

// Mutation hooks for campaigns
export const useCreateCampaign = () => useMutation(CREATE_CAMPAIGN);
export const useUpdateCampaign = () => useMutation(UPDATE_CAMPAIGN);
export const useDeleteCampaign = () => useMutation(DELETE_CAMPAIGN);
