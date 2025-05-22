import {
  SEARCH_INDICATORS,
  GET_INDICATOR,
  SEARCH_SUBSCRIPTION_INDICATORS,
} from '@/graphql/indicator/indicator';
import { useQuery, useSubscription } from '@apollo/client';

export const useIndicators = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_INDICATORS, {
    variables: {
      filters: filters,
      page: page,
      pageSize: pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  // const { data, loading, error } = useSubscription(
  //   SEARCH_SUBSCRIPTION_INDICATORS,
  //   {
  //     variables: {
  //       filters: filters,
  //       page: page,
  //       pageSize: pageSize,
  //     },
  //     fetchPolicy: 'cache-first',
  //   },
  // );

  const indicators = data?.searchIndicators?.results || [];
  const total = data?.searchIndicators?.total || 0;

  console.log('total ', total);

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
