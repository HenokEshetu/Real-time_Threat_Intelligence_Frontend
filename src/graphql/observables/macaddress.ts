import { gql } from '@apollo/client';

export const SEARCH_MACADDRESS_OBSERVABLES = gql`
  query searchMACAddresses($filter: SearchMACAddressInput, $from: Int!, $size: Int!) {
    searchMACAddresses(filter: $filter, from: $from, size: $size) {
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
        revoked
        spec_version
        type
        value
      }
    }
  }
`;

export const FIND_MACADDRESS_OBSERVABLE = gql`
  query GetMACAddressByID($id: String!) {
    macAddress(id: $id) {
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
      revoked
      spec_version
      type
      value
    }
  }
`;

export const CREATE_MACADDRESS = gql`
  mutation CreateMACAddress($input: CreateMACAddressInput!) {
    createMACAddress(input: $input) {
      id
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

export const UPDATE_MACADDRESS = gql`
  mutation UpdateMACAddress($id: String!, $input: UpdateMACAddressInput!) {
    updateMACAddress(id: $id, input: $input) {
      id
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

export const DELETE_MACADDRESS = gql`
  mutation DeleteMACAddress($id: String!) {
    deleteMACAddress(id: $id)
  }
`;
