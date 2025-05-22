import { gql } from '@apollo/client';

export const SEARCH_EMAILMESSAGE_OBSERVABLES = gql`
  query searchEmailMessages($filter: SearchEmailMessageInput, $from: Int!, $size: Int!) {
    searchEmailMessages(filters: $filter, from: $from, size: $size) {
      page
      pageSize
      total
      totalPages
      results {
        additional_header_fields
        bcc_refs
        body
        body_multipart
        cc_refs
        confidence
        content_type
        created
        created_by_ref
        date
        defanged

        extensions
        external_references {
          description
          external_id
          id
          source_name
          url
        }
        from_ref
        id
        is_multipart
        labels
        lang
        message_id
        modified
        object_marking_refs
        raw_email_ref
        received_lines
        revoked
        sender_ref
        spec_version
        subject
        to_refs
        type
      }
    }
  }
`;

export const FIND_EMAILMESSAGE_OBSERVABLE = gql`
  query GetEmailMessageByID($id: String!) {
    emailMessage(id: $id) {
      additional_header_fields
      bcc_refs
      body
      body_multipart
      cc_refs
      confidence
      content_type
      created
      created_by_ref
      date
      defanged

      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      from_ref
      id
      is_multipart
      labels
      lang
      message_id
      modified
      object_marking_refs
      raw_email_ref
      received_lines
      revoked
      sender_ref
      spec_version
      subject
      to_refs
      type
    }
  }
`;

export const CREATE_EMAILMESSAGE = gql`
  mutation CreateEmailMessage($input: CreateEmailMessageInput!) {
    createEmailMessage(input: $input) {
      id
      additional_header_fields
      bcc_refs
      body
      body_multipart {
        body
        body_raw_ref
        confidence
        content_disposition
        content_type
        created
        created_by_ref
        defanged

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
        revoked
        spec_version
        type
      }
      cc_refs
      confidence
      content_type
      created
      created_by_ref
      date
      defanged

      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      from_ref
      is_multipart
      labels
      lang
      message_id
      modified
      object_marking_refs
      raw_email_ref
      received_lines
      revoked
      sender_ref
      spec_version
      subject
      to_refs
      type
    }
  }
`;

export const UPDATE_EMAILMESSAGE = gql`
  mutation UpdateEmailMessage($id: String!, $input: UpdateEmailMessageInput!) {
    updateEmailMessage(id: $id, input: $input) {
      id
      additional_header_fields
      bcc_refs
      body
      body_multipart {
        body
        body_raw_ref
        confidence
        content_disposition
        content_type
        created
        created_by_ref
        defanged
 
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
        revoked
        spec_version
        type
      }
      cc_refs
      confidence
      content_type
      created
      created_by_ref
      date
      defanged
 
      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      from_ref
      is_multipart
      labels
      lang
      message_id
      modified
      object_marking_refs
      raw_email_ref
      received_lines
      revoked
      sender_ref
      spec_version
      subject
      to_refs
      type
    }
  }
`;

export const DELETE_EMAILMESSAGE = gql`
  mutation DeleteEmailMessage($id: String!) {
    deleteEmailMessage(id: $id)
  }
`;
