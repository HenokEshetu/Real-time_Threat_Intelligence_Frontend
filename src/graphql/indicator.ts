import { gql } from '@apollo/client';

export const SEARCH_INDICATORS = gql`
  query SearchIndicators(
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
      confidence
      created_by_ref
      kill_chain_phases {
        kill_chain_name
        phase_name
      }
      revoked
      spec_version
      type
      pattern_version
    }
  }
`;
