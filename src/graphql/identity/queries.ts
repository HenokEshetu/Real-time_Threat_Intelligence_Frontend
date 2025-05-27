import { gql } from '@apollo/client';

export const IDENTITY_QUERY = gql`
  query Identity($id: String!) {
    identity(id: $id) {
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

        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const SEARCH_IDENTITIES = gql`
  query SearchIdentities(
    $filters: SearchIdentityInput
    $page: Int
    $pageSize: Int
  ) {
    searchIdentities(filters: $filters, page: $page, pageSize: $pageSize) {
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

export const IDENTITY_CREATED_SUBSCRIPTION = gql`
  subscription IdentityCreated {
    identityCreated {
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
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const IDENTITY_UPDATED_SUBSCRIPTION = gql`
  subscription IdentityUpdated {
    identityUpdated {
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
        labels
        revoked
        created_by_ref
        start_time
        stop_time
      }
    }
  }
`;

export const IDENTITY_DELETED_SUBSCRIPTION = gql`
  subscription IdentityDeleted {
    identityDeleted
  }
`;
