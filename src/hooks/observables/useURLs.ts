import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_URL_OBSERVABLES,
  FIND_URL_OBSERVABLE,
  CREATE_URL,
  UPDATE_URL,
  DELETE_URL,
} from '@/graphql/observables/url';
import { URL } from '../../types/observables/url';

export const useURLs = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_URL_OBSERVABLES, {
    variables: { filter: filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  const urls = data?.searchUrls?.results || [];
  const total = data?.searchUrls?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filter: filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchUrls: {
            ...fetchMoreResult.searchUrls,
            results: [
              ...(prev?.searchUrls?.results || []),
              ...(fetchMoreResult.searchUrls?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    urls,
    loading,
    error,
    loadMore,
    total,
    hasMore: urls.length === pageSize,
  };
};

export const useURL = (id: string) => {
  const { data, loading, error } = useQuery(FIND_URL_OBSERVABLE, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });
  return { url: data?.url, loading, error };
};

export const useCreateURL = () => useMutation(CREATE_URL);
export const useUpdateURL = () => useMutation(UPDATE_URL);
export const useDeleteURL = () => useMutation(DELETE_URL);
