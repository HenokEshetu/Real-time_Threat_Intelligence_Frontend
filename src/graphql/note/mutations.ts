import gql from 'graphql-tag';

export const CREATE_NOTE = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
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

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: String!, $input: UpdateNoteInput!) {
    updateNote(id: $id, input: $input) {
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

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;
