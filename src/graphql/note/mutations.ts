import gql from 'graphql-tag';

export const CREATE_NOTE = gql`
  mutation CreateNote($input: CreateNoteInput!) {
    createNote(input: $input) {
      id
      type
      spec_version
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
        id
        source_name
        description
        url
        external_id
      }
      labels
      lang
      modified
      object_marking_refs
      object_refs
      relationship {
        id
        type
        spec_version
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
          id
          source_name
          description
          url
          external_id
        }
        labels
        lang
        modified
        object_marking_refs
        relationship_type
        revoked
        source_ref
        start_time
        stop_time
        target_ref
      }
      revoked
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: String!, $input: UpdateNoteInput!) {
    updateNote(id: $id, input: $input) {
      id
      type
      spec_version
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
        id
        source_name
        description
        url
        external_id
      }
      labels
      lang
      modified
      object_marking_refs
      object_refs
      relationship {
        id
        type
        spec_version
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
          id
          source_name
          description
          url
          external_id
        }
        labels
        lang
        modified
        object_marking_refs
        relationship_type
        revoked
        source_ref
        start_time
        stop_time
        target_ref
      }
      revoked
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;
