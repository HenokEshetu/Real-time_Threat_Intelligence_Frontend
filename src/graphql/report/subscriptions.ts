import { gql } from '@apollo/client';

export const REPORT_CREATED_SUBSCRIPTION = gql`
  subscription ReportCreated {
    reportCreated {
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
`;

export const REPORT_UPDATED_SUBSCRIPTION = gql`
  subscription ReportUpdated {
    reportUpdated {
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
`;

export const REPORT_DELETED_SUBSCRIPTION = gql`
  subscription ReportDeleted {
    reportDeleted
  }
`;
