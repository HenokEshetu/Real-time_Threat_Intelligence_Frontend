import { useQuery, useMutation } from '@apollo/client';
import {
  FIND_EMAILADDRESS_OBSERVABLE,
  SEARCH_EMAILADDRESS_OBSERVABLES,
  CREATE_EMAILADDRESS,
  UPDATE_EMAILADDRESS,
  DELETE_EMAILADDRESS,
  FIND_EMAILADDRESSES_BY_VALUE,
  FIND_EMAILADDRESSES_BY_DISPLAYNAME,
} from '@/graphql/observables/emailaddress';
import {
  EmailAddress,
  EmailAddressSearchResult,
  CreateEmailAddressInput,
  UpdateEmailAddressInput,
  SearchEmailAddressInput,
} from '@/types/observables/emailaddress';

// Fetch a single email address by id
export const useEmailAddress = (id?: string) => {
  const { data, loading, error } = useQuery<{ emailAddress: EmailAddress }>(
    FIND_EMAILADDRESS_OBSERVABLE,
    {
      variables: { id },
      skip: !id,
    }
  );

  return {
    email: data?.emailAddress,
    loading,
    error,
  };
};

// Search email addresses with filters, pagination
export const useEmailAddresses = ({
  filters,
  page,
  pageSize,
}: {
  filters?: SearchEmailAddressInput;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery<{ searchEmailAddresses: EmailAddressSearchResult }>(
    SEARCH_EMAILADDRESS_OBSERVABLES,
    {
      variables: {
        filters,
        from: page,
        size: pageSize,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const emails = data?.searchEmailAddresses?.results || [];
  const total = data?.searchEmailAddresses?.total || 0;
  const totalPages = data?.searchEmailAddresses?.totalPages || 0;

  const loadMore = () => {
    if (page && pageSize && data?.searchEmailAddresses?.page < totalPages) {
      fetchMore({
        variables: {
          filters,
          from: page + 1,
          size: pageSize,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            searchEmailAddresses: {
              ...fetchMoreResult.searchEmailAddresses,
              results: [
                ...(prev?.searchEmailAddresses?.results || []),
                ...(fetchMoreResult.searchEmailAddresses.results || []),
              ],
            },
          };
        },
      });
    }
  };

  return {
    emails,
    loading,
    error,
    loadMore,
    total,
    hasMore: (data?.searchEmailAddresses?.page || 1) < totalPages,
  };
};

// Find email addresses by value
export const useEmailAddressesByValue = (value: string) => {
  const { data, loading, error } = useQuery(FIND_EMAILADDRESSES_BY_VALUE, {
    variables: { value },
    skip: !value,
  });
  return {
    emails: data?.emailAddressesByValue || [],
    loading,
    error,
  };
};

// Find email addresses by display name
export const useEmailAddressesByDisplayName = (displayName: string) => {
  const { data, loading, error } = useQuery(FIND_EMAILADDRESSES_BY_DISPLAYNAME, {
    variables: { displayName },
    skip: !displayName,
  });
  return {
    emails: data?.emailAddressesByDisplayName || [],
    loading,
    error,
  };
};

// Create email address
export const useCreateEmailAddress = () => {
  const [createEmailAddress, { data, loading, error }] = useMutation(CREATE_EMAILADDRESS);
  return {
    createEmailAddress,
    createdEmailAddress: data?.createEmailAddress,
    loading,
    error,
  };
};

// Update email address
export const useUpdateEmailAddress = () => {
  const [updateEmailAddress, { data, loading, error }] = useMutation(UPDATE_EMAILADDRESS);
  return {
    updateEmailAddress,
    updatedEmailAddress: data?.updateEmailAddress,
    loading,
    error,
  };
};

// Delete email address
export const useDeleteEmailAddress = () => {
  const [deleteEmailAddress, { data, loading, error }] = useMutation(DELETE_EMAILADDRESS);
  return {
    deleteEmailAddress,
    deleted: data?.deleteEmailAddress,
    loading,
    error,
  };
};
