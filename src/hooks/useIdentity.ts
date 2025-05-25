import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_IDENTITIES, IDENTITY_QUERY } from '../graphql/identity/queries';
import { CREATE_IDENTITY, UPDATE_IDENTITY, DELETE_IDENTITY } from '../graphql/identity/mutations';

// List/search identities
export const useIdentities = ({ filters = undefined, page = 1, pageSize = 20 } = {}) => {
  // Always send filters, but as null if not provided or empty
  const variables: any = {
    filters: (filters && Object.keys(filters).length > 0) ? filters : null,
    page,
    pageSize,
  };

  const { data, loading, error, fetchMore } = useQuery(SEARCH_IDENTITIES, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  // Defensive: ensure arrays are always arrays
  const identities = data?.searchIdentities
    ? {
        ...data.searchIdentities,
        results: data.searchIdentities.results.map((i: any) => ({
          ...i,
          sectors: i.sectors ?? [],
          roles: i.roles ?? [],
          labels: i.labels ?? [],
          external_references: i.external_references ?? [],
          object_marking_refs: i.object_marking_refs ?? [],
          relationship: i.relationship ?? [],
        })),
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
