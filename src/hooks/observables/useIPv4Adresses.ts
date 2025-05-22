import { useQuery } from '@apollo/client';
import { SEARCH_IPv4_OBSERVABLES, GET_IPv4_OBSERVABLE } from '../../graphql/observables/ipv4';
import { IPv4Address } from '../../types/observables/ipv4';

export const useIPv4 = ({
  filter,
  page,
  pageSize,
}: {
  filter?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(
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
    skip: !id,
  });

  return {
    ipv4: data?.getIPv4Address,
    loading,
    error,
  };
};

// export const useFile = (fileId: string) => {
//   const { files, loading, error } = useFiles();
//   const file = files.find((f) => f.id === fileId);

//   return { file, loading, error };
// };
