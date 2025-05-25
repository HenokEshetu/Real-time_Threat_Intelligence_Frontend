import gql from 'graphql-tag';

export const CREATE_IDENTITY = gql`
  mutation CreateIdentity($input: CreateIdentityInput!) {
    createIdentity(input: $input) {
      id
      type
      spec_version
      name
      description
      identity_class
      sectors
      contact_information
      roles
      labels
      created
      modified
      created_by_ref
      external_references {
        source_name
        external_id
        url
        description
        id
      }
      object_marking_refs
      revoked
      lang
      confidence
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
          source_name
          external_id
          url
          description
          id
        }
        enrichment
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const UPDATE_IDENTITY = gql`
  mutation UpdateIdentity($id: String!, $input: UpdateIdentityInput!) {
    updateIdentity(id: $id, input: $input) {
      id
      type
      spec_version
      name
      description
      identity_class
      sectors
      contact_information
      roles
      labels
      created
      modified
      created_by_ref
      external_references {
        source_name
        external_id
        url
        description
        id
      }
      object_marking_refs
      revoked
      lang
      confidence
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
          source_name
          external_id
          url
          description
          id
        }
        enrichment
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const DELETE_IDENTITY = gql`
  mutation DeleteIdentity($id: String!) {
    deleteIdentity(id: $id)
  }
`;
