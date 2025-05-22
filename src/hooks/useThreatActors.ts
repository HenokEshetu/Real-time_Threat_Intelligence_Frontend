import { useQuery, useMutation } from '@apollo/client';
import {
  THREAT_ACTOR_QUERY,
  SEARCH_THREAT_ACTORS,
} from '../graphql/threatactor/queries';
import {
  CREATE_THREAT_ACTOR,
} from '../graphql/threatactor/mutations';

// List threat actors with optional filters
export const useThreatActors = ({ filters = {}, page = 1, pageSize = 20 } = {}) => {
  const { data, loading, error } = useQuery(SEARCH_THREAT_ACTORS, {
    variables: {
      filters,
      page,
      pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  // Defensive: ensure threat_actor_types is always an array
  const threatActors = data?.searchThreatActors
    ? {
        ...data.searchThreatActors,
        results: data.searchThreatActors.results.map((t: any) => ({
          ...t,
          threat_actor_types: t.threat_actor_types ?? [],
        })),
      }
    : undefined;

  return { threatActors, loading, error };
};

// Get threat actor detail by id
export const useThreatActorDetail = (id: string | undefined) => {
  const { data, loading, error } = useQuery(THREAT_ACTOR_QUERY, {
    variables: { id },
    skip: !id,
  });
  return { threatActor: data?.threatActor, loading, error };
};

// Create threat actor
export const useCreateThreatActor = () => {
  const [createThreatActor, { loading, error }] = useMutation(CREATE_THREAT_ACTOR);
  return { createThreatActor, loading, error };
};
