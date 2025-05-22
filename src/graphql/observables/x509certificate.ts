import { gql } from '@apollo/client';

export const GET_X509CERTIFICATE = gql`
  query GetX509Certificate($id: String!) {
    x509Certificate(id: $id) {
      confidence
      created
      created_by_ref
      defanged
      enrichment
      extensions
      external_references {
        source_name
        url
        external_id
      }
      hashes
      id
      is_self_signed
      issuer
      labels
      lang
      modified
      object_marking_refs
      revoked
      serial_number
      signature_algorithm
      spec_version
      subject
      subject_public_key_algorithm
      subject_public_key_exponent
      subject_public_key_modulus
      type
      validity_not_after
      validity_not_before
      version
      x509_v3_extensions
    }
  }
`;

export const SEARCH_X509CERTIFICATES = gql`
  query SearchX509Certificates(
    $filters: SearchX509CertificateInput
    $from: Int = 0
    $size: Int = 10
  ) {
    searchX509Certificates(filters: $filters, from: $from, size: $size) {
      page
      pageSize
      total
      totalPages
      results {
        confidence
        created
        created_by_ref
        defanged
        
        extensions
        external_references {
          source_name
          url
          external_id
        }
        hashes
        id
        is_self_signed
        issuer
        labels
        lang
        modified
        object_marking_refs
        revoked
        serial_number
        signature_algorithm
        spec_version
        subject
        subject_public_key_algorithm
        subject_public_key_exponent
        subject_public_key_modulus
        type
        validity_not_after
        validity_not_before
        version
        x509_v3_extensions
      }
    }
  }
`;

export const CREATE_X509CERTIFICATE = gql`
  mutation CreateX509Certificate($input: CreateX509CertificateInput!) {
    createX509Certificate(input: $input) {
      confidence
      created
      created_by_ref
      defanged
      
      extensions
      external_references {
        source_name
        url
        external_id
      }
      hashes
      id
      is_self_signed
      issuer
      labels
      lang
      modified
      object_marking_refs
      revoked
      serial_number
      signature_algorithm
      spec_version
      subject
      subject_public_key_algorithm
      subject_public_key_exponent
      subject_public_key_modulus
      type
      validity_not_after
      validity_not_before
      version
      x509_v3_extensions
    }
  }
`;

export const UPDATE_X509CERTIFICATE = gql`
  mutation UpdateX509Certificate($id: String!, $input: UpdateX509CertificateInput!) {
    updateX509Certificate(id: $id, input: $input) {
      confidence
      created
      created_by_ref
      defanged
      
      extensions
      external_references {
        source_name
        url
        external_id
      }
      hashes
      id
      is_self_signed
      issuer
      labels
      lang
      modified
      object_marking_refs
      revoked
      serial_number
      signature_algorithm
      spec_version
      subject
      subject_public_key_algorithm
      subject_public_key_exponent
      subject_public_key_modulus
      type
      validity_not_after
      validity_not_before
      version
      x509_v3_extensions
    }
  }
`;

export const DELETE_X509CERTIFICATE = gql`
  mutation DeleteX509Certificate($id: String!) {
    deleteX509Certificate(id: $id)
  }
`;
