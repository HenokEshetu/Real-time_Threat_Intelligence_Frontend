import { gql } from '@apollo/client';





export const CREATE_REPORT = gql`
  mutation CreateReport($input: CreateReportInput!) {
    createReport(input: $input) {
      id
      name
      description
      authors
      published
      report_types
      confidence
      created
      created_by_ref
      modified
      labels
      object_refs
      external_references {
        source_name
        url
        external_id
      }
      extensions
      lang
      revoked
      spec_version
      type
      relationship
    }
  }
`;

export const UPDATE_REPORT = gql`
  mutation UpdateReport($id: String!, $input: UpdateReportInput!) {
    updateReport(id: $id, input: $input) {
      id
      name
      description
      authors
      published
      report_types
      confidence
      created
      created_by_ref
      modified
      labels
      object_refs
      external_references {
        source_name
        url
        external_id
      }
      extensions
      lang
      revoked
      spec_version
      type
      relationship
    }
  }
`;

export const DELETE_REPORT = gql`
  mutation DeleteReport($id: String!) {
    deleteReport(id: $id)
  }
`;
