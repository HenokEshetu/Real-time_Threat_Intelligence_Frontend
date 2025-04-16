import { useQuery, useMutation } from '@apollo/client';
import {
  SEARCH_THREAT_ACTORS,
  THREAT_ACTOR_QUERY,
} from '../graphql/threatActor/queries';
import {
  CREATE_THREAT_ACTOR,
  UPDATE_THREAT_ACTOR,
  DELETE_THREAT_ACTOR,
} from '../graphql/threatActor/mutations';

// List threat actors
export const useThreatActors = ({ filters = {}, page = 1, pageSize = 20 } = {}) => {
  const { data, loading, error } = useQuery(SEARCH_THREAT_ACTORS, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });
  // Return actors as an array, not the paginated object
  return { actors: data?.searchThreatActors?.results ?? [], loading, error };
};

// Get threat actor detail by id
export const useThreatActorDetail = (id: string | undefined) => {
  const { data, loading, error } = useQuery(THREAT_ACTOR_QUERY, {
    variables: { id },
    skip: !id,
  });
  return { actor: data?.threatActor, loading, error };
};

// Create threat actor
export const useCreateThreatActor = () => {
  const [createThreatActor, { loading, error }] = useMutation(CREATE_THREAT_ACTOR);
  return { createThreatActor, loading, error };
};

// Update threat actor
export const useUpdateThreatActor = () => {
  const [updateThreatActor, { loading, error }] = useMutation(UPDATE_THREAT_ACTOR);
  return { updateThreatActor, loading, error };
};

// Delete threat actor
export const useDeleteThreatActor = () => {
  const [deleteThreatActor, { loading, error }] = useMutation(DELETE_THREAT_ACTOR);
  return { deleteThreatActor, loading, error };
};
