import { gql } from '@apollo/client';

export const REPORT_FIELDS = gql`
  fragment ReportFields on Report {
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
`;
