import { gql } from '@apollo/client';

export const SEARCH_IPV6ADDRESS_OBSERVABLES = gql`
  query searchIPv6Addresses($filter: SearchIPv6AddressInput, $page: Int!, $pageSize: Int!) {
    searchIPv6Addresses(filters: $filter, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        confidence
        created
        created_by_ref
        defanged

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
        resolves_to_refs
        revoked
        spec_version
        type
        value
      }
    }
  }
`;

export const FIND_IPV6ADDRESS_OBSERVABLE = gql`
  query GetIPv6AddressByID($id: String!) {
    ipv6Address(id: $id) {
      confidence
      created
      created_by_ref
      defanged
 
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
      resolves_to_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const FIND_IPV6ADDRESS_BY_VALUE = gql`
  query GetIPv6AddressesByValue($value: String!) {
    ipv6AddressesByValue(value: $value) {
      confidence
      created
      created_by_ref
      defanged
 
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
      resolves_to_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const CREATE_IPV6ADDRESS = gql`
  mutation CreateIPv6Address($input: CreateIPv6AddressInput!) {
    createIPv6Address(input: $input) {
      confidence
      created
      created_by_ref
      defanged

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
      resolves_to_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const UPDATE_IPV6ADDRESS = gql`
  mutation UpdateIPv6Address($id: String!, $input: UpdateIPv6AddressInput!) {
    updateIPv6Address(id: $id, input: $input) {
      confidence
      created
      created_by_ref
      defanged

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
      resolves_to_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const DELETE_IPV6ADDRESS = gql`
  mutation DeleteIPv6Address($id: String!) {
    deleteIPv6Address(id: $id)
  }
`;
