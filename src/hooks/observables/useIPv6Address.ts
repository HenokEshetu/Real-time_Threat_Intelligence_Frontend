import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_IPV6ADDRESS_OBSERVABLES,
  FIND_IPV6ADDRESS_OBSERVABLE,
  FIND_IPV6ADDRESS_BY_VALUE,
  CREATE_IPV6ADDRESS,
  UPDATE_IPV6ADDRESS,
  DELETE_IPV6ADDRESS,
} from '../../graphql/observables/ipv6';
import { IPv6Address } from '../../types/observables/ipv6';

export const useIPv6Addresses = ({
  filter,
  page,
  pageSize,
}: {
  filter?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(
    SEARCH_IPV6ADDRESS_OBSERVABLES,
    {
      variables: {
        filter: filter,
        page: page,
        pageSize: pageSize,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const ipv6Addresses = data?.searchIPv6Addresses?.results || [];
  const total = data?.searchIPv6Addresses?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: {
        filter: filter,
        page: (page || 1) + 1,
        pageSize: pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchIPv6Addresses: {
            ...fetchMoreResult.searchIPv6Addresses,
            results: [
              ...(prev?.searchIPv6Addresses?.results || []),
              ...fetchMoreResult.searchIPv6Addresses.results,
            ],
          },
        };
      },
    });
  };

  return {
    ipv6Addresses,
    loading,
    error,
    loadMore,
    total,
    hasMore: ipv6Addresses.length === pageSize,
  };
};

export const useIPv6Address = (ipv6Id: string) => {
  const { data, loading, error } = useQuery(FIND_IPV6ADDRESS_OBSERVABLE, {
    variables: {
      id: ipv6Id,
    },
    notifyOnNetworkStatusChange: true,
  });
  const ipv6Address: IPv6Address = data?.ipv6Address || [];

  return { ipv6Address, loading, error };
};

export const useIPv6AddressesByValue = (value: string) => {
  const { data, loading, error } = useQuery(FIND_IPV6ADDRESS_BY_VALUE, {
    variables: {
      value,
    },
    notifyOnNetworkStatusChange: true,
  });
  const ipv6Addresses: IPv6Address[] = data?.ipv6AddressesByValue || [];

  return { ipv6Addresses, loading, error };
};

export const useCreateIPv6Address = () => useMutation(CREATE_IPV6ADDRESS);
export const useUpdateIPv6Address = () => useMutation(UPDATE_IPV6ADDRESS);
export const useDeleteIPv6Address = () => useMutation(DELETE_IPV6ADDRESS);
