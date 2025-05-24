import gql from 'graphql-tag';

export const CREATE_COURSE_OF_ACTION = gql`
  mutation CreateCourseOfAction($input: CreateCourseOfActionInput!) {
    createCourseOfAction(input: $input) {
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
      enrichment
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
        enrichment
      }
    }
  }
`;

export const UPDATE_COURSE_OF_ACTION = gql`
  mutation UpdateCourseOfAction($id: String!, $input: UpdateCourseOfActionInput!) {
    updateCourseOfAction(id: $id, input: $input) {
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
      enrichment
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
        enrichment
      }
    }
  }
`;

export const DELETE_COURSE_OF_ACTION = gql`
  mutation DeleteCourseOfAction($id: String!) {
    deleteCourseOfAction(id: $id)
  }
`;
