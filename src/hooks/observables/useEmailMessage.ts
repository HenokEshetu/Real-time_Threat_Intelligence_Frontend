import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_EMAILMESSAGE_OBSERVABLES,
  FIND_EMAILMESSAGE_OBSERVABLE,
  CREATE_EMAILMESSAGE,
  UPDATE_EMAILMESSAGE,
  DELETE_EMAILMESSAGE,
} from '../../graphql/observables/emailmessage';
import { EmailMessage, EmailMessageSearchResult } from '../../types/observables/emailmessage';

export const useEmailMessages = ({
  filters = {},
  from = 0,
  size = 10,
}: {
  filters?: Record<string, any>;
  from?: number;
  size?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_EMAILMESSAGE_OBSERVABLES, {
    variables: { filter: filters, from, size },
    notifyOnNetworkStatusChange: true,
  });

  const results = data?.searchEmailMessages?.results || [];
  const total = data?.searchEmailMessages?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filter: filters, from: from + size, size },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchEmailMessages: {
            ...fetchMoreResult.searchEmailMessages,
            results: [
              ...(prev?.searchEmailMessages?.results || []),
              ...(fetchMoreResult.searchEmailMessages?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    emailMessages: results,
    loading,
    error,
    loadMore,
    total,
    hasMore: results.length === size,
  };
};

export const useEmailMessage = (id: string) => {
  const { data, loading, error } = useQuery(FIND_EMAILMESSAGE_OBSERVABLE, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });
  return { emailMessage: data?.emailMessage, loading, error };
};

export const useCreateEmailMessage = () => useMutation(CREATE_EMAILMESSAGE);
export const useUpdateEmailMessage = () => useMutation(UPDATE_EMAILMESSAGE);
export const useDeleteEmailMessage = () => useMutation(DELETE_EMAILMESSAGE);
