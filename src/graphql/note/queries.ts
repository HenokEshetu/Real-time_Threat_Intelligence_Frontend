import gql from 'graphql-tag';

export const GET_NOTE = gql`
  query GetNote($id: String!) {
    note(id: $id) {
      abstract
      authors
      confidence
      content
      content_type
      created
      created_by_ref
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
      object_refs
      relationship {
        confidence
        created
        created_by_ref
        description
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
    }
  }
`;

export const SEARCH_NOTES = gql`
  query SearchNotes($filters: SearchNoteInput, $page: Int, $pageSize: Int) {
    searchNotes(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        abstract
        authors
        confidence
        content
        content_type
        created
        created_by_ref
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
        object_refs
        relationship {
          confidence
          created
          created_by_ref
          description
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
      }
    }
  }
`;
