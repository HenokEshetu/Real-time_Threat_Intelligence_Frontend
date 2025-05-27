import {
  SEARCH_INDICATORS,
  GET_INDICATOR,
  INDICATOR_CREATED_SUBSCRIPTION,
  INDICATOR_UPDATED_SUBSCRIPTION,
  INDICATOR_DELETED_SUBSCRIPTION,
} from '@/graphql/indicator/queries';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

export const useIndicators = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(
    SEARCH_INDICATORS,
    {
      variables: {
        filters: filters,
        page: page,
        pageSize: pageSize,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: INDICATOR_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.indicatorCreated;
        if (!newItem) return prev;
        if (
          prev.searchIndicators.results.some((i: any) => i.id === newItem.id)
        ) {
          return prev;
        }
        return {
          ...prev,
          searchIndicators: {
            ...prev.searchIndicators,
            results: [newItem, ...prev.searchIndicators.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchIndicators.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: INDICATOR_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.indicatorUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchIndicators: {
            ...prev.searchIndicators,
            results: prev.searchIndicators.results.map((i: any) =>
              i.id === updated.id ? { ...i, ...updated } : i,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: INDICATOR_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.indicatorDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchIndicators: {
            ...prev.searchIndicators,
            results: prev.searchIndicators.results.filter(
              (i: any) => i.id !== deletedId,
            ),
            total: prev.searchIndicators.total - 1,
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

  const indicators = data?.searchIndicators?.results || [];
  const total = data?.searchIndicators?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: {
        page: page + 1,
        pageSize: pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          searchIndicators: [
            ...(prev?.searchIndicators || []),
            ...fetchMoreResult.searchIndicators,
          ],
        };
      },
    });
  };

  return {
    indicators,
    loading,
    error,
    total,
    loadMore,
    hasMore: indicators.length === pageSize,
  };
};

export const useIndicator = (id: string) => {
  const { data, loading, error } = useQuery(GET_INDICATOR, {
    variables: {
      id: id,
    },
  });

  return {
    indicator: data?.indicator,
    loading,
    error,
  };
};
