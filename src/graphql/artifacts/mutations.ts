import gql from 'graphql-tag';

export const CREATE_ARTIFACT = gql`
  mutation CreateArtifact($input: CreateArtifactInput!) {
    createArtifact(input: $input) {
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

export const UPDATE_ARTIFACT = gql`
  mutation UpdateArtifact($id: String!, $input: UpdateArtifactInput!) {
    updateArtifact(id: $id, input: $input) {
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

export const DELETE_ARTIFACT = gql`
  mutation DeleteArtifact($id: String!) {
    deleteArtifact(id: $id)
  }
`;
