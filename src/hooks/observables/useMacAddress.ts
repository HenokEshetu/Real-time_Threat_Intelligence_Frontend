import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_MACADDRESS_OBSERVABLES,
  FIND_MACADDRESS_OBSERVABLE,
  CREATE_MACADDRESS,
  UPDATE_MACADDRESS,
  DELETE_MACADDRESS,
} from '../../graphql/observables/macaddress';
import { MACAddress } from '../../types/observables/macaddress';

export const useMacAddresses = ({
  filter,
  from = 0,
  size = 10,
}: {
  filter?: Record<string, any>;
  from?: number;
  size?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(
    SEARCH_MACADDRESS_OBSERVABLES,
    {
      variables: {
        filter,
        from,
        size,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const macAddresses = data?.searchMACAddresses?.results || [];
  const total = data?.searchMACAddresses?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: {
        filter,
        from: from + 1,
        size,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchMACAddresses: {
            ...fetchMoreResult.searchMACAddresses,
            results: [
              ...(prev?.searchMACAddresses?.results || []),
              ...fetchMoreResult.searchMACAddresses.results,
            ],
          },
        };
      },
    });
  };

  return {
    macAddresses,
    loading,
    error,
    loadMore,
    total,
    hasMore: macAddresses.length === size,
  };
};

export const useMacAddress = (macAddressId: string) => {
  const { data, loading, error } = useQuery(FIND_MACADDRESS_OBSERVABLE, {
    variables: {
      id: macAddressId,
    },
    notifyOnNetworkStatusChange: true,
  });
  const macAddress: MACAddress = data?.macAddress || null;

  return { macAddress, loading, error };
};

export const useCreateMacAddress = () => useMutation(CREATE_MACADDRESS);
export const useUpdateMacAddress = () => useMutation(UPDATE_MACADDRESS);
export const useDeleteMacAddress = () => useMutation(DELETE_MACADDRESS);
