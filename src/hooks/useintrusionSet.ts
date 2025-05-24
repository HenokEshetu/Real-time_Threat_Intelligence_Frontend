import { useQuery, useMutation } from '@apollo/client';
import {
  INTRUSIONSET_QUERY,
  SEARCH_INTRUSIONSETS,
} from '../graphql/intrusionset/queries';
import {
  CREATE_INTRUSIONSET,
  UPDATE_INTRUSIONSET,
  DELETE_INTRUSIONSET,
} from '../graphql/intrusionset/mutations';

// List intrusion sets with optional filters
export const useIntrusionSets = ({ filters = {}, page = 1, pageSize = 20 } = {}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_INTRUSIONSETS, {
    variables: {
      filters,
      page,
      pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  const intrusionSets = data?.searchIntrusionSets
    ? {
        ...data.searchIntrusionSets,
        results: data.searchIntrusionSets.results,
      }
    : undefined;

  return { intrusionSets, loading, error, fetchMore };
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
  const [createIntrusionSet, { loading, error }] = useMutation(CREATE_INTRUSIONSET);
  return { createIntrusionSet, loading, error };
};

// Update intrusion set
export const useUpdateIntrusionSet = () => {
  const [updateIntrusionSet, { loading, error }] = useMutation(UPDATE_INTRUSIONSET);
  return { updateIntrusionSet, loading, error };
};

// Delete intrusion set
export const useDeleteIntrusionSet = () => {
  const [deleteIntrusionSet, { loading, error }] = useMutation(DELETE_INTRUSIONSET);
  return { deleteIntrusionSet, loading, error };
};
