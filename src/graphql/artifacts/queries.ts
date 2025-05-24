import gql from 'graphql-tag';

export const ARTIFACT_QUERY = gql`
  query ArtifactByID($id: String!) {
    artifactByID(id: $id) {
      id
      type
      spec_version
      created
      modified
      mime_type
      url
      confidence
      labels
      payload_bin
      hashes {
        MD5
        SHA_1
        SHA_256
        SHA_512
      }
      created_by_ref
      revoked
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
      external_references {
        id
        source_name
        description
        url
        external_id
        hashes {
          MD5
          SHA_1
          SHA_256
          SHA_512
        }
      }
      extensions
      lang
      decryption_key
      encryption_algorithm
      object_marking_refs
      defanged
    }
  }
`;

export const SEARCH_ARTIFACTS = gql`
  query SearchArtifacts($filters: SearchArtifactInput, $from: Int!, $size: Int!) {
    searchArtifacts(filters: $filters, from: $from, size: $size) {
      page
      pageSize
      total
      totalPages
      results {
        id
        type
        spec_version
        created
        modified
        mime_type
        url
        confidence
        labels
        payload_bin
        hashes {
          MD5
          SHA_1
          SHA_256
          SHA_512
        }
        created_by_ref
        revoked
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
        external_references {
          id
          source_name
          description
          url
          external_id
          hashes {
            MD5
            SHA_1
            SHA_256
            SHA_512
          }
        }
        extensions
        lang
        decryption_key
        encryption_algorithm
        object_marking_refs
        defanged
      }
    }
  }
`;
