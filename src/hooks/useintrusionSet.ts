import { useQuery, useMutation } from '@apollo/client';
import {
  INTRUSIONSET_QUERY,
  SEARCH_INTRUSIONSETS,
  INTRUSIONSET_CREATED_SUBSCRIPTION,
  INTRUSIONSET_UPDATED_SUBSCRIPTION,
  INTRUSIONSET_DELETED_SUBSCRIPTION,
} from '../graphql/intrusionset/queries';
import {
  CREATE_INTRUSIONSET,
  UPDATE_INTRUSIONSET,
  DELETE_INTRUSIONSET,
} from '../graphql/intrusionset/mutations';
import { useEffect } from 'react';
import { IntrusionSet } from '@/types/intrusionset';
import { toast } from 'sonner';

// List intrusion sets with optional filters and subscriptions
export const useIntrusionSets = ({
  filters = {},
  page = 1,
  pageSize = 20,
} = {}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(
    SEARCH_INTRUSIONSETS,
    {
      variables: {
        filters,
        page,
        pageSize,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    },
  );

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: INTRUSIONSET_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.intrusionSetCreated;
        if (!newItem) return prev;
        if (
          prev.searchIntrusionSets.results.some(
            (m: IntrusionSet) => m.id === newItem.id,
          )
        ) {
          return prev;
        }
        return {
          ...prev,
          searchIntrusionSets: {
            ...prev.searchIntrusionSets,
            results: [newItem, ...prev.searchIntrusionSets.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchIntrusionSets.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: INTRUSIONSET_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.intrusionSetUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchIntrusionSets: {
            ...prev.searchIntrusionSets,
            results: prev.searchIntrusionSets.results.map((m: IntrusionSet) =>
              m.id === updated.id ? { ...m, ...updated } : m,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: INTRUSIONSET_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.intrusionSetDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchIntrusionSets: {
            ...prev.searchIntrusionSets,
            results: prev.searchIntrusionSets.results.filter(
              (m: IntrusionSet) => m.id !== deletedId,
            ),
            total: prev.searchIntrusionSets.total - 1,
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

  if (error) {
    toast.error('Error loading intrusion set data', {
      description: error?.message,
    });
  }

  const results = data?.searchIntrusionSets?.results || [];
  const total = data?.searchIntrusionSets?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: {
        filters,
        page: page + 1,
        pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchIntrusionSets: {
            ...fetchMoreResult.searchIntrusionSets,
            results: [
              ...(prev?.searchIntrusionSets?.results || []),
              ...(fetchMoreResult.searchIntrusionSets?.results || []),
            ],
          },
        };
      },
    });
  };

  return { results, total, loading, error, loadMore };
};

// Get intrusion set detail by id
export const useIntrusionSetDetail = (id: string | undefined) => {
  const { data, loading, error } = useQuery(INTRUSIONSET_QUERY, {
    variables: { id },
    skip: !id,
  });
  return { intrusionSet: data?.intrusionSet, loading, error };
};

// Create intrusion set
export const useCreateIntrusionSet = () => {
  const [createIntrusionSet, { loading, error }] =
    useMutation(CREATE_INTRUSIONSET);
  return { createIntrusionSet, loading, error };
};

// Update intrusion set
export const useUpdateIntrusionSet = () => {
  const [updateIntrusionSet, { loading, error }] =
    useMutation(UPDATE_INTRUSIONSET);
  return { updateIntrusionSet, loading, error };
};

// Delete intrusion set
export const useDeleteIntrusionSet = () => {
  const [deleteIntrusionSet, { loading, error }] =
    useMutation(DELETE_INTRUSIONSET);
  return { deleteIntrusionSet, loading, error };
};
