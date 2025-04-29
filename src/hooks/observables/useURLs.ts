import { useQuery } from '@apollo/client';
import {
  FIND_URL_OBSERVABLE,
  SEARCH_URL_OBSERVABLES,
} from '@/graphql/observables/url';
import { URL } from '../../types/observables/url';

export const useURLs = ({
  filter,
  page,
  pageSize,
}: {
  filter?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_URL_OBSERVABLES, {
    variables: {
      filter: filter,
      page: page,
      pageSize: pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  const urls = data?.searchUrls?.results || [];
  const total = data?.searchUrls?.total || 0;

  console.log('urls ', total);

  const loadMore = () => {
    fetchMore({
      variables: {
        filter: filter,
        page: page + 1,
        pageSize: pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          searchUrls: [
            ...(prev?.searchUrls || []),
            ...fetchMoreResult.searchUrls,
          ],
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

export const useURL = (urlId: string) => {
  const { data, loading, error } = useQuery(FIND_URL_OBSERVABLE, {
    variables: {
      id: urlId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const url: URL = data?.url || [];

  return { url, loading, error };
};
