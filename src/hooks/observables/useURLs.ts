import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_URL_OBSERVABLES,
  FIND_URL_OBSERVABLE,
  CREATE_URL,
  UPDATE_URL,
  DELETE_URL,
  URL_CREATED_SUBSCRIPTION,
  URL_UPDATED_SUBSCRIPTION,
  URL_DELETED_SUBSCRIPTION,
} from '@/graphql/observables/url';
import { URL } from '../../types/observables/url';
import { useEffect } from 'react';

export const useURLs = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(
    SEARCH_URL_OBSERVABLES,
    {
      variables: { filter: filters, page, pageSize },
      notifyOnNetworkStatusChange: true,
      errorPolicy: 'all',
    },
  );

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: URL_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.urlCreated;
        if (!newItem) return prev;
        if (prev.searchUrls.results.some((u: URL) => u.id === newItem.id)) {
          return prev;
        }
        return {
          ...prev,
          searchUrls: {
            ...prev.searchUrls,
            results: [newItem, ...prev.searchUrls.results].slice(0, pageSize),
            total: prev.searchUrls.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: URL_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.urlUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchUrls: {
            ...prev.searchUrls,
            results: prev.searchUrls.results.map((u: URL) =>
              u.id === updated.id ? { ...u, ...updated } : u,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: URL_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.urlDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchUrls: {
            ...prev.searchUrls,
            results: prev.searchUrls.results.filter(
              (u: URL) => u.id !== deletedId,
            ),
            total: prev.searchUrls.total - 1,
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

  // Filter out URLs with null or undefined value to avoid GraphQL error
  const urls = (data?.searchUrls?.results || []).filter(
    (url: URL) => url.value !== null && url.value !== undefined,
  );
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
