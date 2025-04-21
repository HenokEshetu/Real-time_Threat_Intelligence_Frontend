import { gql } from '@apollo/client';

// Fetch a single report by ID
export const GET_REPORT = gql`
  query GetReport($id: String!) {
    getReport(id: $id) {
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

// Fetch multiple reports (paginated)
export const SEARCH_REPORTS = gql`
  query SearchReports($filters: SearchReportInput, $page: Int = 1, $pageSize: Int = 10) {
    searchReports(filters: $filters, page: $page, pageSize: $pageSize) {
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
