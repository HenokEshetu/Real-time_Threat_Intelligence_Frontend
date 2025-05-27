import { gql } from '@apollo/client';

export const INTRUSIONSET_QUERY = gql`
  query IntrusionSet($id: String!) {
    intrusionSet(id: $id) {
      id
      type
      spec_version
      name
      description
      aliases
      labels
      confidence
      created
      x_mitre_domains
      modified
      created_by_ref
      external_references {
        id
        source_name
        description
        url
        external_id
      }
      kill_chain_phases {
        id
        kill_chain_name
        phase_name
      }
      first_seen
      last_seen
      goals
      primary_motivation
      secondary_motivations
      resource_level
      object_marking_refs
      revoked
      lang

      extensions
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
        lang
        extensions
        object_marking_refs
      }
    }
  }
`;

export const SEARCH_INTRUSIONSETS = gql`
  query SearchIntrusionSets(
    $filters: SearchIntrusionSetInput
    $page: Int
    $pageSize: Int
  ) {
    searchIntrusionSets(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        type
        spec_version
        name
        description
        x_mitre_domains
        aliases
        labels
        confidence
        created
        modified
        created_by_ref
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        kill_chain_phases {
          id
          kill_chain_name
          phase_name
        }
        first_seen
        last_seen
        goals
        primary_motivation
        secondary_motivations
        resource_level
        object_marking_refs
        revoked
        lang

        extensions
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
          lang
          extensions
          object_marking_refs
        }
      }
    }
  }
`;

export const INTRUSIONSET_CREATED_SUBSCRIPTION = gql`
  subscription IntrusionSetCreated {
    intrusionSetCreated {
      id
      type
      spec_version
      name
      description
      aliases
      labels
      confidence
      created
      modified
      x_mitre_domains
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
      first_seen
      last_seen
      goals
      primary_motivation
      resource_level
      secondary_motivations
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
      x_mitre_attack_spec_version
      x_mitre_deprecated
      x_mitre_domains
      x_mitre_modified_by_ref
      x_mitre_version
      kill_chain_phases {
        id
        kill_chain_name
        phase_name
      }
    }
  }
`;

export const INTRUSIONSET_UPDATED_SUBSCRIPTION = gql`
  subscription IntrusionSetUpdated {
    intrusionSetUpdated {
      id
      type
      spec_version
      name
      description
      aliases
      labels
      confidence
      created
      modified
      x_mitre_domains
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
      first_seen
      last_seen
      goals
      primary_motivation
      resource_level
      secondary_motivations
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
      x_mitre_attack_spec_version
      x_mitre_deprecated
      x_mitre_domains
      x_mitre_modified_by_ref
      x_mitre_version
      kill_chain_phases {
        id
        kill_chain_name
        phase_name
      }
    }
  }
`;

export const INTRUSIONSET_DELETED_SUBSCRIPTION = gql`
  subscription IntrusionSetDeleted {
    intrusionSetDeleted
  }
`;
