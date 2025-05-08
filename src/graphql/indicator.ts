import { gql } from '@apollo/client';

export const SEARCH_INDICATORS = gql`
  query SearchIndicators(
    $filters: SearchIndicatorInput
    $page: Int!
    $pageSize: Int!
  ) {
    searchIndicators(filters: $filters, page: $page, pageSize: $pageSize) {
      results {
        confidence
        created
        created_by_ref
        description
        extensions
        external_references {
          description
          external_id
          id
          source_name
          url
        }
        id
        indicator_types
        kill_chain_phases {
          id
          kill_chain_name
          phase_name
        }
        labels
        lang
        modified
        name
        object_marking_refs
        pattern
        pattern_type
        pattern_version
        relationship {
          confidence
          created
          created_by_ref
          description
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
          relationship_type
          revoked
          source_ref
          spec_version
          start_time
          stop_time
          target_ref
          type
        }
        revoked
        spec_version
        type
        valid_from
        valid_until
      }
      total
      totalPages
    }
  }
`;

export const SEARCH_SUBSCRIPTION_INDICATORS = gql`
  subscription SearchIndicators(
    $filters: SearchIndicatorInput
    $page: Int! = 1
    $pageSize: Int! = 10
  ) {
    searchIndicators(filters: $filters, page: $page, pageSize: $pageSize) {
      results {
        id
        name
        pattern
        pattern_type
        valid_from
        valid_until
        indicator_types
        labels
        description
        created
        modified
      }
    }
  }
`;

export const GET_INDICATOR = gql`
  query GetIndicatorById($id: String!) {
    indicator(id: $id) {
      confidence
      created
      created_by_ref
      description
      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      id
      indicator_types
      kill_chain_phases {
        id
        kill_chain_name
        phase_name
      }
      labels
      lang
      modified
      name
      object_marking_refs
      pattern
      pattern_type
      pattern_version
      relationship {
        confidence
        created
        created_by_ref
        description
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
        relationship_type
        revoked
        source_ref
        spec_version
        start_time
        stop_time
        target_ref
        type
      }
      revoked
      spec_version
      type
      valid_from
      valid_until
    }
  }
`;
