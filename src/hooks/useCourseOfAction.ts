import { useQuery, useMutation } from '@apollo/client';
import {
  COURSE_OF_ACTION_QUERY,
  SEARCH_COURSES_OF_ACTION,
} from '../graphql/courseofaction/queries';
import {
  CREATE_COURSE_OF_ACTION,
  UPDATE_COURSE_OF_ACTION,
  DELETE_COURSE_OF_ACTION,
} from '../graphql/courseofaction/mutations';

// List courses of action with optional filters
export const useCoursesOfAction = ({ filters = {}, page = 1, pageSize = 20 } = {}) => {
  const { data, loading, error } = useQuery(SEARCH_COURSES_OF_ACTION, {
    variables: { filters, page, pageSize },
    notifyOnNetworkStatusChange: true,
  });

  const coursesOfAction = data?.searchCoursesOfAction;

  return { coursesOfAction, loading, error };
};

// Get course of action detail by id
export const useCourseOfActionDetail = (id: string | undefined) => {
  const { data, loading, error } = useQuery(COURSE_OF_ACTION_QUERY, {
    variables: { id },
    skip: !id,
  });
  return { courseOfAction: data?.courseOfAction, loading, error };
};

// Create course of action
export const useCreateCourseOfAction = () => {
  const [createCourseOfAction, { loading, error }] = useMutation(CREATE_COURSE_OF_ACTION);
  return { createCourseOfAction, loading, error };
};

// Update course of action
export const useUpdateCourseOfAction = () => {
  const [updateCourseOfAction, { loading, error }] = useMutation(UPDATE_COURSE_OF_ACTION);
  return { updateCourseOfAction, loading, error };
};

// Delete course of action
export const useDeleteCourseOfAction = () => {
  const [deleteCourseOfAction, { loading, error }] = useMutation(DELETE_COURSE_OF_ACTION);
  return { deleteCourseOfAction, loading, error };
};
