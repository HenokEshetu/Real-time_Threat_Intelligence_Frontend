import { SEARCH_INDICATORS, GET_INDICATOR } from '@/graphql/indicator';
import { useQuery, gql } from '@apollo/client';

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

  const indicators = data?.searchIndicators?.results || [];

  console.log('Indicators:', indicators);

  const loadMore = () => {
    fetchMore({
      variables: {
        page: page + 1,
        pageSize,
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
