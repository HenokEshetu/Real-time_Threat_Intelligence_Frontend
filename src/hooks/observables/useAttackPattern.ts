import { useQuery, useMutation } from '@apollo/client';
import {
  ATTACK_PATTERN_QUERY,
  SEARCH_ATTACK_PATTERNS,
} from '../../graphql/attackpattern/queries';
import {
  CREATE_ATTACK_PATTERN,
  UPDATE_ATTACK_PATTERN,
  DELETE_ATTACK_PATTERN,
} from '../../graphql/attackpattern/mutations';
import {
  AttackPattern,
  AttackPatternSearchResult,
} from '@/types/observables/attackpattern';

// List attack patterns with optional filters
export const useAttackPatterns = ({
  filters = {},
  page = 1,
  pageSize = 20,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
} = {}) => {
  const { data, loading, error, fetchMore } = useQuery<{ searchAttackPatterns: AttackPatternSearchResult }>(
    SEARCH_ATTACK_PATTERNS,
    {
      variables: {
        filters,
        page,
        pageSize,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const attackPatterns = data?.searchAttackPatterns
    ? {
        ...data.searchAttackPatterns,
        results: data.searchAttackPatterns.results.map((a: AttackPattern) => ({
          ...a,
          aliases: a.aliases ?? [],
          labels: a.labels ?? [],
        })),
      }
    : undefined;

  return { attackPatterns, loading, error, fetchMore };
};

// Get attack pattern detail by id
export const useAttackPatternDetail = (id: string | undefined) => {
  const { data, loading, error } = useQuery<{ attackPattern: AttackPattern }>(
    ATTACK_PATTERN_QUERY,
    {
      variables: { id },
      skip: !id,
    },
  );
  return { attackPattern: data?.attackPattern, loading, error };
};

// Create attack pattern
export const useCreateAttackPattern = () => {
  const [createAttackPattern, { loading, error }] = useMutation(CREATE_ATTACK_PATTERN);
  return { createAttackPattern, loading, error };
};

// Update attack pattern
export const useUpdateAttackPattern = () => {
  const [updateAttackPattern, { loading, error }] = useMutation(UPDATE_ATTACK_PATTERN);
  return { updateAttackPattern, loading, error };
};

// Delete attack pattern
export const useDeleteAttackPattern = () => {
  const [deleteAttackPattern, { loading, error }] = useMutation(DELETE_ATTACK_PATTERN);
  return { deleteAttackPattern, loading, error };
};
