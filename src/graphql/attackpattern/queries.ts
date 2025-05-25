import gql from 'graphql-tag';

export const ATTACK_PATTERN_QUERY = gql`
  query AttackPattern($id: String!) {
    attackPattern(id: $id) {
      id
      type
      spec_version
      version
      name
      description
      aliases
      labels
      confidence
      created
      modified
      created_by_ref
      
      extensions
      external_references {
        id
        source_name
        description
        url
        external_id
      }

      object_marking_refs
      revoked
      lang
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
          id
          source_name
          description
          url
          external_id
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

export const SEARCH_ATTACK_PATTERNS = gql`
  query SearchAttackPatterns($filters: SearchAttackPatternInput, $page: Int, $pageSize: Int) {
    searchAttackPatterns(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        type
        spec_version
        version
        name
        description
        aliases
        labels
        confidence
        created
        modified
        created_by_ref
        
        extensions
        external_references {
          id
          source_name
          description
          url
          external_id
        }
 
        object_marking_refs
        revoked
        lang
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
            id
            source_name
            description
            url
            external_id
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
