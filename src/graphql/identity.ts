import { gql } from '@apollo/client';

export const SEARCH_IDENTITIES = gql`
  query SearchIdentities($filters: SearchIdentityInput, $page: Int, $pageSize: Int) {
    searchIdentities(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        name
        description
        identity_class
        type
        spec_version
        created
        modified
        confidence
        contact_information
        created_by_ref
        extensions
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        labels
        lang
        relationship {
          id
          source_ref
          target_ref
          relationship_type
          description
          type
          spec_version
          created
          modified
        }
        revoked
        roles
        sectors
      }
    }
  }
`;

export const GET_IDENTITY = gql`
  query Identity($id: String!) {
    identity(id: $id) {
      id
      name
      description
      identity_class
      type
      spec_version
      created
      modified
      confidence
      contact_information
      created_by_ref
      extensions
      external_references {
        id
        source_name
        description
        url
        external_id
      }
      labels
      lang
      relationship {
        id
        source_ref
        target_ref
        relationship_type
        description
        type
        spec_version
        created
        modified
      }
      revoked
      roles
      sectors
    }
  }
`;
