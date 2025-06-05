import { gql } from '@apollo/client';

export const SEARCH_IPv4_OBSERVABLES = gql`
  query searchIPv4Addresses(
    $filter: SearchIPv4AddressInput!
    $page: Int!
    $pageSize: Int!
  ) {
    searchIPv4Addresses(filters: $filter, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        confidence
        created
        created_by_ref
        defanged
        description
        pattern
        extensions
        external_references {
          description
          external_id
          id
          source_name
          url
        }
        id
        labels
        lang
        modified
        object_marking_refs
        revoked
        spec_version
        type
        value
      }
    }
  }
`;

export const GET_IPv4_OBSERVABLE = gql`
  query getIPv4Address($id: String!) {
    ipv4Address(id: $id) {
      confidence
      created
      created_by_ref
      defanged
      description
      pattern
      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      id
      labels
      lang
      modified
      object_marking_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const IPV4_CREATED_SUBSCRIPTION = gql`
  subscription IPv4AddressCreated {
    ipv4AddressCreated {
      id
      confidence
      created
      created_by_ref
      defanged
      description
      pattern
      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      labels
      lang
      modified
      object_marking_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const IPV4_UPDATED_SUBSCRIPTION = gql`
  subscription IPv4AddressUpdated {
    ipv4AddressUpdated {
      id
      confidence
      created
      created_by_ref
      defanged
      description
      pattern
      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      labels
      lang
      modified
      object_marking_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const IPV4_DELETED_SUBSCRIPTION = gql`
  subscription IPv4AddressDeleted {
    ipv4AddressDeleted
  }
`;
