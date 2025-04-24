import { useQuery, useMutation } from '@apollo/client';
import { SEARCH_IDENTITIES, IDENTITY_QUERY } from '../graphql/identity/queries';
import { CREATE_IDENTITY, UPDATE_IDENTITY, DELETE_IDENTITY } from '../graphql/identity/mutations';

// List/search identities
export const useIdentities = ({ filters = {}, page = 1, pageSize = 20 } = {}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_IDENTITIES, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });
  return {
    identities: data?.searchIdentities?.results ?? [],
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
  return { identity: data?.identity, loading, error };
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
