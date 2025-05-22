import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_USER_ACCOUNTS,
  GET_USER_ACCOUNT,
  CREATE_USER_ACCOUNT,
  UPDATE_USER_ACCOUNT,
  DELETE_USER_ACCOUNT,
} from '@/graphql/observables/useraccount';
import { UserAccountSearchResult } from '@/types/observables/useraccount';

export const useUserAccounts = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_USER_ACCOUNTS, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  const accounts = data?.searchUserAccounts?.results || [];
  const total = data?.searchUserAccounts?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchUserAccounts: {
            ...fetchMoreResult.searchUserAccounts,
            results: [
              ...(prev?.searchUserAccounts?.results || []),
              ...(fetchMoreResult.searchUserAccounts?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    accounts,
    loading,
    error,
    loadMore,
    total,
    hasMore: accounts.length === pageSize,
  };
};

export const useUserAccount = (id: string) => {
  const { data, loading, error } = useQuery(GET_USER_ACCOUNT, { variables: { id } });
  return { account: data?.userAccount, loading, error };
};

export const useCreateUserAccount = () => useMutation(CREATE_USER_ACCOUNT);
export const useUpdateUserAccount = () => useMutation(UPDATE_USER_ACCOUNT);
export const useDeleteUserAccount = () => useMutation(DELETE_USER_ACCOUNT);
