import gql from 'graphql-tag';

export const IDENTITY_QUERY = gql`
  query Identity($id: String!) {
    identity(id: $id) {
      id
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
      }
    }
  }
`;

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
        }
      }
    }
  }
`;
