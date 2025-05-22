import { useQuery, useMutation } from '@apollo/client';
import {
  ATTACK_PATTERN_QUERY,
  SEARCH_ATTACK_PATTERN,
} from '../../graphql/attackpattern/queries';
import {
  CREATE_ATTACK_PATTERN,
} from '../../graphql/attackpattern/mutations';

// List attack patterns with optional filters
export const useAttackPattern = ({ filters = {}, page = 1, pageSize = 20 } = {}) => {
  const { data, loading, error, fetchMore } = useQuery(SEARCH_ATTACK_PATTERN, {
    variables: {
      filters,
      page,
      pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  const attackPattern = data?.searchAttackPattern
    ? {
        ...data.searchAttackPattern,
        results: data.searchAttackPattern.results.map((a: any) => ({
          ...a,
          aliases: a.aliases ?? [],
        })),
      }
    : undefined;

  return { attackPattern, loading, error };
};

// Get attack pattern detail by id
export const useAttackPatternDetail = (id: string | undefined) => {
  const { data, loading, error } = useQuery(ATTACK_PATTERN_QUERY, {
    variables: { id },
    skip: !id,
  });
  return { attackPattern: data?.attackPattern, loading, error };
};

// Create attack pattern
export const useCreateAttackPattern = () => {
  const [createAttackPattern, { loading, error }] = useMutation(CREATE_ATTACK_PATTERN);
  return { createAttackPattern, loading, error };
};
