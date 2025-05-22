import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_NETWORKTRAFFIC_OBSERVABLES,
  FIND_NETWORKTRAFFIC_OBSERVABLE,
  CREATE_NETWORKTRAFFIC,
  UPDATE_NETWORKTRAFFIC,
  DELETE_NETWORKTRAFFIC,
} from '../../graphql/observables/networktraffic';
import { NetworkTraffic } from '../../types/observables/networktraffic';

export const useNetworkTraffic = ({
  filter,
  from,
  size,
}: {
  filter?: Record<string, any>;
  from?: number;
  size?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(
    SEARCH_NETWORKTRAFFIC_OBSERVABLES,
    {
      variables: {
        filter: filter,
        from: from,
        size: size,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const networkTraffic = data?.searchNetworkTraffic?.results || [];
  const total = data?.searchNetworkTraffic?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: {
        filter: filter,
        from: from + 1,
        size: size,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          searchNetworkTraffic: [
            ...(prev?.searchNetworkTraffic || []),
            ...fetchMoreResult.searchNetworkTraffic,
          ],
        };
      },
    });
  };

  return {
    networkTraffic,
    loading,
    error,
    loadMore,
    total,
    hasMore: networkTraffic.length === size,
  };
};

export const useNetworkTrafficById = (id: string) => {
  const { data, loading, error } = useQuery(FIND_NETWORKTRAFFIC_OBSERVABLE, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });
  const networkTraffic: NetworkTraffic = data?.networkTraffic || {};

  return { networkTraffic, loading, error };
};

export const useCreateNetworkTraffic = () => useMutation(CREATE_NETWORKTRAFFIC);
export const useUpdateNetworkTraffic = () => useMutation(UPDATE_NETWORKTRAFFIC);
export const useDeleteNetworkTraffic = () => useMutation(DELETE_NETWORKTRAFFIC);
