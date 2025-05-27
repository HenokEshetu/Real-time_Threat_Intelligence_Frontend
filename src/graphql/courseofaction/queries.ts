import gql from 'graphql-tag';

export const COURSE_OF_ACTION_QUERY = gql`
  query CourseOfAction($id: String!) {
    courseOfAction(id: $id) {
      id
      type
      spec_version
      name
      description
      action
      action_bin
      action_reference
      action_type
      confidence
      created
      modified
      created_by_ref
      external_references {
        id
        source_name
        description
        url
        external_id
      }
      labels
      lang
      object_marking_refs
      revoked

      extensions
      relationship {
        id
        type
        spec_version
        created
        modified
        relationship_type
        source_ref
        target_ref
        confidence
        description
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const SEARCH_COURSES_OF_ACTION = gql`
  query SearchCoursesOfAction(
    $filters: SearchCourseOfActionInput
    $page: Int
    $pageSize: Int
  ) {
    searchCoursesOfAction(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        type
        spec_version
        name
        description
        action
        action_bin
        action_reference
        action_type
        confidence
        created
        modified
        created_by_ref
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        labels
        lang
        object_marking_refs
        revoked

        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          confidence
          description
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          labels
          revoked
          created_by_ref
          start_time
          stop_time
        }
      }
    }
  }
`;

export const COURSE_OF_ACTION_CREATED_SUBSCRIPTION = gql`
  subscription CourseOfActionCreated {
    courseOfActionCreated {
      id
      type
      spec_version
      name
      description
      action
      action_bin
      action_reference
      action_type
      confidence
      created
      modified
      created_by_ref
      external_references {
        id
        source_name
        description
        url
        external_id
      }
      labels
      lang
      object_marking_refs
      revoked
      extensions
      relationship {
        id
        type
        spec_version
        created
        modified
        relationship_type
        source_ref
        target_ref
        confidence
        description
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const COURSE_OF_ACTION_UPDATED_SUBSCRIPTION = gql`
  subscription CourseOfActionUpdated {
    courseOfActionUpdated {
      id
      type
      spec_version
      name
      description
      action
      action_bin
      action_reference
      action_type
      confidence
      created
      modified
      created_by_ref
      external_references {
        id
        source_name
        description
        url
        external_id
      }
      labels
      lang
      object_marking_refs
      revoked
      extensions
      relationship {
        id
        type
        spec_version
        created
        modified
        relationship_type
        source_ref
        target_ref
        confidence
        description
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const COURSE_OF_ACTION_DELETED_SUBSCRIPTION = gql`
  subscription CourseOfActionDeleted {
    courseOfActionDeleted
  }
`;
