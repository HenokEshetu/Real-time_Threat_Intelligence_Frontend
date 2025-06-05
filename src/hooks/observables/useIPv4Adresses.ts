import { useQuery } from '@apollo/client';
import {
  SEARCH_IPv4_OBSERVABLES,
  GET_IPv4_OBSERVABLE,
  IPV4_CREATED_SUBSCRIPTION,
  IPV4_UPDATED_SUBSCRIPTION,
  IPV4_DELETED_SUBSCRIPTION,
} from '../../graphql/observables/ipv4';
import { IPv4Address } from '../../types/observables/ipv4';
import { useEffect } from 'react';

export const useIPv4 = ({
  filter,
  page,
  pageSize,
}: {
  filter?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(
    SEARCH_IPv4_OBSERVABLES,
    {
      variables: {
        filter: filter,
        page: page,
        pageSize: pageSize,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: IPV4_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.ipv4AddressCreated;
        if (!newItem) return prev;
        if (
          prev.searchIPv4Addresses.results.some(
            (i: IPv4Address) => i.id === newItem.id,
          )
        ) {
          return prev;
        }
        return {
          ...prev,
          searchIPv4Addresses: {
            ...prev.searchIPv4Addresses,
            results: [newItem, ...prev.searchIPv4Addresses.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchIPv4Addresses.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: IPV4_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.ipv4AddressUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchIPv4Addresses: {
            ...prev.searchIPv4Addresses,
            results: prev.searchIPv4Addresses.results.map((i: IPv4Address) =>
              i.id === updated.id ? { ...i, ...updated } : i,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: IPV4_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.ipv4AddressDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchIPv4Addresses: {
            ...prev.searchIPv4Addresses,
            results: prev.searchIPv4Addresses.results.filter(
              (i: IPv4Address) => i.id !== deletedId,
            ),
            total: prev.searchIPv4Addresses.total - 1,
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

  const ipv4addresses = data?.searchIPv4Addresses?.results || [];
  const total = data?.searchIPv4Addresses?.total || 0;

  console.log('ipv4address ', ipv4addresses.length);

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
          searchIPv4Addresses: [
            ...(prev?.searchIPv4Addresses || []),
            ...fetchMoreResult.searchIPv4Addresses,
          ],
        };
      },
    });
  };

  return {
    ipv4addresses,
    loading,
    error,
    loadMore,
    total,
    hasMore: ipv4addresses.length === pageSize,
  };
};

export const useIPv4Address = (id?: string) => {
  const { data, loading, error } = useQuery(GET_IPv4_OBSERVABLE, {
    variables: { id },
  });

  return {
    ipv4: data?.ipv4Address,
    loading,
    error,
  };
};

// export const useFile = (fileId: string) => {
//   const { files, loading, error } = useFiles();
//   const file = files.find((f) => f.id === fileId);

//   return { file, loading, error };
// };
