import { useQuery } from '@apollo/client';
import { SEARCH_IDENTITIES, GET_IDENTITY } from '@/graphql/identitya/identity';

export const useIdentities = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_IDENTITIES, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  const identities = data?.searchIdentities?.results || [];

  const loadMore = () => {
    fetchMore({
      variables: { page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchIdentities: {
            ...fetchMoreResult.searchIdentities,
            results: [
              ...(prev?.searchIdentities?.results || []),
              ...fetchMoreResult.searchIdentities.results,
            ],
          },
        };
      },
    });
  };

  return {
    identities,
    loading,
    error,
    loadMore,
    hasMore: identities.length === pageSize,
  };
};

export const useIdentity = (id: string) => {
  const { data, loading, error } = useQuery(GET_IDENTITY, { variables: { id } });
  return {
    identity: data?.identity,
    loading,
    error,
  };
};
