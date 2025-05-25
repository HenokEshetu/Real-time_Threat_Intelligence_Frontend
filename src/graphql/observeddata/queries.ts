import { gql } from '@apollo/client';

export const GET_OBSERVED_DATA = gql`
  query GetObservedData($id: String!) {
    observedData(id: $id) {
      id
      confidence
      created
      created_by_ref
      enrichment
      extensions
      external_references {
        source_name
        url
        external_id
        description
        id
      }
      first_observed
      labels
      lang
      last_observed
      modified
      number_observed
      object_marking_refs
      object_refs
      relationship {
        relationship_type
        source_ref
        target_ref
        id
        confidence
        created
        created_by_ref
        description
        enrichment
        extensions
        external_references {
          source_name
          url
          external_id
          description
          id
        }
        labels
        lang
        modified
        object_marking_refs
        revoked
        spec_version
        start_time
        stop_time
        type
      }
      revoked
      spec_version
      type
    }
  }
`;

export const SEARCH_OBSERVED_DATA = gql`
  query SearchObservedData(
    $filters: SearchObservedDataInput
    $page: Int = 1
    $pageSize: Int = 10
  ) {
    searchObservedData(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        confidence
        created
        created_by_ref
        enrichment
        extensions
        external_references {
          source_name
          url
          external_id
          description
          id
        }
        first_observed
        labels
        lang
        last_observed
        modified
        number_observed
        object_marking_refs
        object_refs
        relationship {
          relationship_type
          source_ref
          target_ref
          id
          confidence
          created
          created_by_ref
          description
          enrichment
          extensions
          external_references {
            source_name
            url
            external_id
            description
            id
          }
          labels
          lang
          modified
          object_marking_refs
          revoked
          spec_version
          start_time
          stop_time
          type
        }
        revoked
        spec_version
        type
      }
    }
  }
`;
