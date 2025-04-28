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
