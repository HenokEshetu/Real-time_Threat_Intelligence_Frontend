import { gql } from '@apollo/client';

export const GET_REPORT = gql`
  query GetReport($id: String!) {
    report(id: $id) {
      id
      name
      description
      authors
      published
      report_types
      confidence
      created
      modified
      labels
      object_refs
      external_references {
        source_name
        url
        external_id
      }
    }
  }
`;

export const SEARCH_REPORTS = gql`
  query SearchReports(
    $filters: SearchReportInput
    $page: Int = 1
    $pageSize: Int = 10
  ) {
    searchReports(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        name
        description
        report_types
        published
        authors
        created
        modified
        object_refs
        confidence
        labels
        lang
        revoked
        spec_version
        type
        created_by_ref

        external_references {
          source_name
          url
          external_id
        }
        object_marking_refs
        relationship {
          relationship_type
          source_ref
          target_ref
        }
      }
    }
  }
`;

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
