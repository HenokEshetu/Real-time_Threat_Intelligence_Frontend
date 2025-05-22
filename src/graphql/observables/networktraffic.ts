import { gql } from '@apollo/client';

export const SEARCH_NETWORKTRAFFIC_OBSERVABLES = gql`
  query searchNetworkTraffic($filter: SearchNetworkTrafficInput!, $from: Int!, $size: Int!) {
    searchNetworkTraffic(filters: $filter, from: $from, size: $size) {
      page
      pageSize
      total
      totalPages
      results {
        confidence
        created
        created_by_ref
        defanged
        dst_byte_count
        dst_packets
        dst_payload_ref
        dst_port
        dst_ref
        encapsulated_by_ref
        encapsulates_refs
        end
 
        extensions
        external_references {
          description
          external_id
          id
          source_name
          url
        }
        id
        ipfix
        is_active
        labels
        lang
        modified
        object_marking_refs
        protocols
        revoked
        spec_version
        src_byte_count
        src_packets
        src_payload_ref
        src_port
        src_ref
        start
        type
      }
    }
  }
`;

export const FIND_NETWORKTRAFFIC_OBSERVABLE = gql`
  query GetNetworkTrafficByID($id: String!) {
    networkTraffic(id: $id) {
      confidence
      created
      created_by_ref
      defanged
      dst_byte_count
      dst_packets
      dst_payload_ref
      dst_port
      dst_ref
      encapsulated_by_ref
      encapsulates_refs
      end

      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      id
      ipfix
      is_active
      labels
      lang
      modified
      object_marking_refs
      protocols
      revoked
      spec_version
      src_byte_count
      src_packets
      src_payload_ref
      src_port
      src_ref
      start
      type
    }
  }
`;

export const CREATE_NETWORKTRAFFIC = gql`
  mutation CreateNetworkTraffic($input: CreateNetworkTrafficInput!) {
    createNetworkTraffic(input: $input) {
      id
      confidence
      created
      created_by_ref
      defanged
      dst_byte_count
      dst_packets
      dst_payload_ref
      dst_port
      dst_ref
      encapsulated_by_ref
      encapsulates_refs
      end

      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      ipfix
      is_active
      labels
      lang
      modified
      object_marking_refs
      protocols
      revoked
      spec_version
      src_byte_count
      src_packets
      src_payload_ref
      src_port
      src_ref
      start
      type
    }
  }
`;

export const UPDATE_NETWORKTRAFFIC = gql`
  mutation UpdateNetworkTraffic($id: ID!, $input: UpdateNetworkTrafficInput!) {
    updateNetworkTraffic(id: $id, input: $input) {
      id
      confidence
      created
      created_by_ref
      defanged
      dst_byte_count
      dst_packets
      dst_payload_ref
      dst_port
      dst_ref
      encapsulated_by_ref
      encapsulates_refs
      end

      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      ipfix
      is_active
      labels
      lang
      modified
      object_marking_refs
      protocols
      revoked
      spec_version
      src_byte_count
      src_packets
      src_payload_ref
      src_port
      src_ref
      start
      type
    }
  }
`;

export const DELETE_NETWORKTRAFFIC = gql`
  mutation DeleteNetworkTraffic($id: ID!) {
    deleteNetworkTraffic(id: $id)
  }
`;
