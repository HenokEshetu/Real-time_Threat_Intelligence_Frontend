import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_IDENTITIES,
  IDENTITY_QUERY,
  IDENTITY_CREATED_SUBSCRIPTION,
  IDENTITY_UPDATED_SUBSCRIPTION,
  IDENTITY_DELETED_SUBSCRIPTION,
} from '../graphql/identity/queries';
import {
  CREATE_IDENTITY,
  UPDATE_IDENTITY,
  DELETE_IDENTITY,
} from '../graphql/identity/mutations';
import { useEffect } from 'react';

// List/search identities
export const useIdentities = ({
  filters = undefined,
  page = 1,
  pageSize = 20,
} = {}) => {
  // Only include 'filters' in variables if it's defined and not empty
  const variables: any = {
    page,
    pageSize,
    ...(filters && Object.keys(filters).length > 0 ? { filters } : {}),
  };

  const { data, loading, error, fetchMore, subscribeToMore } = useQuery(
    SEARCH_IDENTITIES,
    {
      variables,
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: IDENTITY_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.identityCreated;
        if (!newItem) return prev;
        if (
          prev.searchIdentities.results.some((i: any) => i.id === newItem.id)
        ) {
          return prev;
        }
        return {
          ...prev,
          searchIdentities: {
            ...prev.searchIdentities,
            results: [newItem, ...prev.searchIdentities.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchIdentities.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: IDENTITY_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.identityUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchIdentities: {
            ...prev.searchIdentities,
            results: prev.searchIdentities.results.map((i: any) =>
              i.id === updated.id ? { ...i, ...updated } : i,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: IDENTITY_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.identityDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchIdentities: {
            ...prev.searchIdentities,
            results: prev.searchIdentities.results.filter(
              (i: any) => i.id !== deletedId,
            ),
            total: prev.searchIdentities.total - 1,
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

  // Defensive: ensure arrays are always arrays
  const identities = data?.searchIdentities
    ? {
        ...data.searchIdentities,
        results: Array.isArray(data.searchIdentities.results)
          ? data.searchIdentities.results.map((i: any) => ({
              ...i,
              sectors: i.sectors ?? [],
              roles: i.roles ?? [],
              labels: i.labels ?? [],
              external_references: i.external_references ?? [],
              object_marking_refs: i.object_marking_refs ?? [],
              relationship: i.relationship ?? [],
            }))
          : [],
      }
    : undefined;

  return {
    identities,
    loading,
    error,
    pageInfo: data?.searchIdentities,
    fetchMore,
  };
};

// Get identity detail by id
export const useIdentityDetail = (id: string | undefined) => {
  const { data, loading, error } = useQuery(IDENTITY_QUERY, {
    variables: { id },
    skip: !id,
  });
  return {
    identity: data?.identity
      ? {
          ...data.identity,
          sectors: data.identity.sectors ?? [],
          roles: data.identity.roles ?? [],
          labels: data.identity.labels ?? [],
          external_references: data.identity.external_references ?? [],
          object_marking_refs: data.identity.object_marking_refs ?? [],
          relationship: data.identity.relationship ?? [],
        }
      : undefined,
    loading,
    error,
  };
};

// Create identity
export const useCreateIdentity = () => {
  const [createIdentity, { loading, error }] = useMutation(CREATE_IDENTITY);
  return { createIdentity, loading, error };
};

// Update identity
export const useUpdateIdentity = () => {
  const [updateIdentity, { loading, error }] = useMutation(UPDATE_IDENTITY);
  return { updateIdentity, loading, error };
};

// Delete identity
export const useDeleteIdentity = () => {
  const [deleteIdentity, { loading, error }] = useMutation(DELETE_IDENTITY);
  return { deleteIdentity, loading, error };
};
