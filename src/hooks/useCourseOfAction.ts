import { useQuery, useMutation } from '@apollo/client';
import {
  COURSE_OF_ACTION_QUERY,
  SEARCH_COURSES_OF_ACTION,
  COURSE_OF_ACTION_CREATED_SUBSCRIPTION,
  COURSE_OF_ACTION_UPDATED_SUBSCRIPTION,
  COURSE_OF_ACTION_DELETED_SUBSCRIPTION,
} from '../graphql/courseofaction/queries';
import {
  CREATE_COURSE_OF_ACTION,
  UPDATE_COURSE_OF_ACTION,
  DELETE_COURSE_OF_ACTION,
} from '../graphql/courseofaction/mutations';
import {
  CourseOfAction,
  CourseOfActionSearchResult,
} from '../types/courseofaction';
import { useEffect } from 'react';
import { toast } from 'sonner';

// Fetch a single course of action by ID
export function useCourseOfAction(id: string) {
  const { data, loading, error } = useQuery<{ courseOfAction: CourseOfAction }>(
    COURSE_OF_ACTION_QUERY,
    {
      variables: { id },
      skip: !id,
    },
  );
  return {
    courseOfAction: data?.courseOfAction,
    loading,
    error,
  };
}

// Fetch courses of action with filters, pagination, and fetchMore
export const useCoursesOfAction = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore, subscribeToMore } = useQuery<{
    searchCoursesOfAction: CourseOfActionSearchResult;
  }>(SEARCH_COURSES_OF_ACTION, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const unsubCreate = subscribeToMore({
      document: COURSE_OF_ACTION_CREATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newItem = subscriptionData.data?.courseOfActionCreated;
        if (!newItem) return prev;
        if (
          prev.searchCoursesOfAction.results.some(
            (c: CourseOfAction) => c.id === newItem.id,
          )
        ) {
          return prev;
        }
        return {
          ...prev,
          searchCoursesOfAction: {
            ...prev.searchCoursesOfAction,
            results: [newItem, ...prev.searchCoursesOfAction.results].slice(
              0,
              pageSize,
            ),
            total: prev.searchCoursesOfAction.total + 1,
          },
        };
      },
    });

    const unsubUpdate = subscribeToMore({
      document: COURSE_OF_ACTION_UPDATED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const updated = subscriptionData.data?.courseOfActionUpdated;
        if (!updated) return prev;
        return {
          ...prev,
          searchCoursesOfAction: {
            ...prev.searchCoursesOfAction,
            results: prev.searchCoursesOfAction.results.map(
              (c: CourseOfAction) =>
                c.id === updated.id ? { ...c, ...updated } : c,
            ),
          },
        };
      },
    });

    const unsubDelete = subscribeToMore({
      document: COURSE_OF_ACTION_DELETED_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const deletedId = subscriptionData.data?.courseOfActionDeleted;
        if (!deletedId) return prev;
        return {
          ...prev,
          searchCoursesOfAction: {
            ...prev.searchCoursesOfAction,
            results: prev.searchCoursesOfAction.results.filter(
              (c: CourseOfAction) => c.id !== deletedId,
            ),
            total: prev.searchCoursesOfAction.total - 1,
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
    toast.error('Error loading course of action data', {
      description: error?.message,
    });
  }

  const coursesOfAction = data?.searchCoursesOfAction?.results || [];
  const total = data?.searchCoursesOfAction?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchCoursesOfAction: {
            ...fetchMoreResult.searchCoursesOfAction,
            results: [
              ...(prev?.searchCoursesOfAction?.results || []),
              ...(fetchMoreResult.searchCoursesOfAction?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    coursesOfAction,
    loading,
    error,
    loadMore,
    total,
    hasMore: coursesOfAction.length === pageSize,
  };
};

// Detail hook for a single course of action
export function useCourseOfActionDetail(id: string | undefined) {
  const { data, loading, error } = useQuery(COURSE_OF_ACTION_QUERY, {
    variables: { id },
    skip: !id,
  });
  return {
    courseOfAction: data?.courseOfAction,
    loading,
    error,
  };
}

// Mutation hooks for courses of action
export const useCreateCourseOfAction = () =>
  useMutation(CREATE_COURSE_OF_ACTION);
export const useUpdateCourseOfAction = () =>
  useMutation(UPDATE_COURSE_OF_ACTION);
export const useDeleteCourseOfAction = () =>
  useMutation(DELETE_COURSE_OF_ACTION);
