import { useQuery } from '@apollo/client';
import { SEARCH_URL_OBSERVABLES } from '@/graphql/observables/url';
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

// export const useFile = (fileId: string) => {
//   const { files, loading, error } = useFiles();
//   const file = files.find((f) => f.id === fileId);

//   return { file, loading, error };
// };
