import { useQuery, useMutation } from '@apollo/client';
import {
  ATTACK_PATTERN_QUERY,
  SEARCH_ATTACK_PATTERNS,
  ATTACK_PATTERN_CREATED_SUBSCRIPTION,
  ATTACK_PATTERN_UPDATED_SUBSCRIPTION,
  ATTACK_PATTERN_DELETED_SUBSCRIPTION,
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
import { useEffect } from 'react';

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
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery<{
    searchAttackPatterns: AttackPatternSearchResult;
  }>(SEARCH_ATTACK_PATTERNS, {
    variables: {
      filters,
      page,
      pageSize,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: ATTACK_PATTERN_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.attackPatternCreated;
        if (!newItem) return prev;
        if (
          prev.searchAttackPatterns.results.some(
            (a: AttackPattern) => a.id === newItem.id,
          )
        ) {
          return prev;
        }
        return {
          ...prev,
          searchAttackPatterns: {
            ...prev.searchAttackPatterns,
            results: [newItem, ...prev.searchAttackPatterns.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchAttackPatterns.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: ATTACK_PATTERN_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.attackPatternUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchAttackPatterns: {
            ...prev.searchAttackPatterns,
            results: prev.searchAttackPatterns.results.map((a: AttackPattern) =>
              a.id === updated.id ? { ...a, ...updated } : a,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: ATTACK_PATTERN_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.attackPatternDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchAttackPatterns: {
            ...prev.searchAttackPatterns,
            results: prev.searchAttackPatterns.results.filter(
              (a: AttackPattern) => a.id !== deletedId,
            ),
            total: prev.searchAttackPatterns.total - 1,
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

  const total = data?.searchAttackPatterns?.total;

  return { attackPatterns, total, loading, error, fetchMore };
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
  const [createAttackPattern, { loading, error }] = useMutation(
    CREATE_ATTACK_PATTERN,
  );
  return { createAttackPattern, loading, error };
};

// Update attack pattern
export const useUpdateAttackPattern = () => {
  const [updateAttackPattern, { loading, error }] = useMutation(
    UPDATE_ATTACK_PATTERN,
  );
  return { updateAttackPattern, loading, error };
};

// Delete attack pattern
export const useDeleteAttackPattern = () => {
  const [deleteAttackPattern, { loading, error }] = useMutation(
    DELETE_ATTACK_PATTERN,
  );
  return { deleteAttackPattern, loading, error };
};
