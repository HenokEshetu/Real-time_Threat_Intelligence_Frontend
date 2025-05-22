import { useQuery, useMutation } from '@apollo/client';
import { GET_CAMPAIGN, SEARCH_COMPAIGNS } from '../graphql/campaign/queries';
import {
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN
} from '../graphql/campaign/mutations';
import { Campaign, SearchCampaignsResult } from '../types/campaign';

// Fetch a single campaign by ID
export function useCampaign(id: string) {
  const { data, loading, error } = useQuery<{ campaign: Campaign }>(GET_CAMPAIGN, {
    variables: { id },
    skip: !id,
  });
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
  const { data, loading, error, fetchMore } = useQuery<{ searchCampaigns: SearchCampaignsResult }>(
    SEARCH_COMPAIGNS,
    {
      variables: { filters, page, pageSize },
      notifyOnNetworkStatusChange: true,
    }
  );

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
