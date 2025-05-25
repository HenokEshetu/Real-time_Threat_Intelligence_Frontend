import { gql } from '@apollo/client';

export const CREATE_OBSERVED_DATA = gql`
  mutation CreateObservedData($input: CreateObservedDataInput!) {
    createObservedData(input: $input) {
      id
      confidence
      created
      created_by_ref
      enrichment
      extensions
      external_references {
        source_name
        url
        external_id
        description
        id
      }
      first_observed
      labels
      lang
      last_observed
      modified
      number_observed
      object_marking_refs
      object_refs
      relationship {
        relationship_type
        source_ref
        target_ref
        id
        confidence
        created
        created_by_ref
        description
        enrichment
        extensions
        external_references {
          source_name
          url
          external_id
          description
          id
        }
        labels
        lang
        modified
        object_marking_refs
        revoked
        spec_version
        start_time
        stop_time
        type
      }
      revoked
      spec_version
      type
    }
  }
`;

export const UPDATE_OBSERVED_DATA = gql`
  mutation UpdateObservedData($id: String!, $input: UpdateObservedDataInput!) {
    updateObservedData(id: $id, input: $input) {
      id
      confidence
      created
      created_by_ref
      enrichment
      extensions
      external_references {
        source_name
        url
        external_id
        description
        id
      }
      first_observed
      labels
      lang
      last_observed
      modified
      number_observed
      object_marking_refs
      object_refs
      relationship {
        relationship_type
        source_ref
        target_ref
        id
        confidence
        created
        created_by_ref
        description
        enrichment
        extensions
        external_references {
          source_name
          url
          external_id
          description
          id
        }
        labels
        lang
        modified
        object_marking_refs
        revoked
        spec_version
        start_time
        stop_time
        type
      }
      revoked
      spec_version
      type
    }
  }
`;

export const DELETE_OBSERVED_DATA = gql`
  mutation DeleteObservedData($id: String!) {
    deleteObservedData(id: $id)
  }
`;
