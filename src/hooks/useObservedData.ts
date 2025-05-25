import { useQuery, useMutation } from '@apollo/client';
import {
  GET_OBSERVED_DATA,
  SEARCH_OBSERVED_DATA,
} from '@/graphql/observeddata/queries';
import {
  CREATE_OBSERVED_DATA,
  UPDATE_OBSERVED_DATA,
  DELETE_OBSERVED_DATA,
} from '@/graphql/observeddata/mutations';
import { ObservedDataSearchResult } from '@/types/observeddata';

export const useObservedDataList = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_OBSERVED_DATA, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  const observedData = data?.searchObservedData?.results || [];
  const total = data?.searchObservedData?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchObservedData: {
            ...fetchMoreResult.searchObservedData,
            results: [
              ...(prev?.searchObservedData?.results || []),
              ...(fetchMoreResult.searchObservedData?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    observedData,
    loading,
    error,
    loadMore,
    total,
    hasMore: observedData.length === pageSize,
  };
};

export const useObservedData = (id: string) => {
  const { data, loading, error } = useQuery(GET_OBSERVED_DATA, { variables: { id } });
  return { observedData: data?.observedData, loading, error };
};

export const useCreateObservedData = () => useMutation(CREATE_OBSERVED_DATA);
export const useUpdateObservedData = () => useMutation(UPDATE_OBSERVED_DATA);
export const useDeleteObservedData = () => useMutation(DELETE_OBSERVED_DATA);
