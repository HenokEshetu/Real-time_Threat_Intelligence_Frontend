import { useQuery } from '@apollo/client';
import {
  FIND_FILE_OBSERVABLE,
  SEARCH_FILE_OBSERVABLES,
  FILE_CREATED_SUBSCRIPTION,
  FILE_UPDATED_SUBSCRIPTION,
  FILE_DELETED_SUBSCRIPTION,
} from '../../graphql/observables/file';
import { File } from '../../types/file';
import { useEffect } from 'react';

export const useFiles = ({
  filter,
  from,
  size,
}: {
  filter?: Record<string, any>;
  from?: number;
  size?: number;
}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(
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

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: FILE_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.fileCreated;
        if (!newItem) return prev;
        if (prev.searchFiles.results.some((f: File) => f.id === newItem.id)) {
          return prev;
        }
        return {
          ...prev,
          searchFiles: {
            ...prev.searchFiles,
            results: [newItem, ...prev.searchFiles.results].slice(0, size),
            total: prev.searchFiles.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: FILE_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.fileUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchFiles: {
            ...prev.searchFiles,
            results: prev.searchFiles.results.map((f: File) =>
              f.id === updated.id ? { ...f, ...updated } : f,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: FILE_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.fileDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchFiles: {
            ...prev.searchFiles,
            results: prev.searchFiles.results.filter(
              (f: File) => f.id !== deletedId,
            ),
            total: prev.searchFiles.total - 1,
          },
        };
      },
    });

    return () => {
      unsubCreate();
      unsubUpdate();
      unsubDelete();
    };
  }, [subscribeToMore, size]);

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

export const useFile = (fileId: string) => {
  const { data, loading, error } = useQuery(FIND_FILE_OBSERVABLE, {
    variables: {
      id: fileId,
    },
    notifyOnNetworkStatusChange: true,
  });
  const file: File = data?.file || [];

  return { file, loading, error };
};
