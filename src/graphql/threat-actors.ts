import { gql } from '@apollo/client';

export const SEARCH_THREAT_ACTORS = gql`
  query SearchThreatActors(
    $filters: SearchThreatActorInput
    $page: Int = 1
    $pageSize: Int = 10
  ) {
    searchThreatActors(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        name
        description
        aliases
        threat_actor_types
        first_seen
        last_seen
        roles
        goals
        primary_motivation
        secondary_motivations
        personal_motivations
        resource_level
        sophistication
        created
        modified
        created_by_ref
        confidence
        labels
        lang
        revoked
        spec_version
        type
        enrichment {
          abuseipdb
          asn
          dns
          geo
          hybrid
          misp
          shodan
          ssl
          threatcrowd
          threatfox
          virustotal
          whois
        }
        extensions
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        relationship {
          id
          relationship_type
          source_ref
          target_ref
        }
      }
    }
  }
`;
