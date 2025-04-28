import { useQuery } from '@apollo/client';
import { SEARCH_FILE_OBSERVABLES } from '../../graphql/observables/file';
import { File } from '../../types/observables/file';

export const useFiles = ({
  filter,
  from,
  size,
}: {
  filter?: Record<string, any>;
  from?: number;
  size?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(
    SEARCH_FILE_OBSERVABLES,
    {
      variables: {
        filter: filter,
        from: from,
        size: size,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const files = data?.searchFiles?.results || [];
  const total = data?.searchFiles?.total || 0;

  console.log('files ', files.length);

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
          searchFiles: [
            ...(prev?.searchFiles || []),
            ...fetchMoreResult.searchFiles,
          ],
        };
      },
    });
  };

  return {
    files,
    loading,
    error,
    loadMore,
    total,
    hasMore: files.length === size,
  };
};

// export const useFile = (fileId: string) => {
//   const { files, loading, error } = useFiles();
//   const file = files.find((f) => f.id === fileId);

//   return { file, loading, error };
// };
