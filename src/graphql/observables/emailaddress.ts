import { gql } from '@apollo/client';

export const SEARCH_EMAILADDRESS_OBSERVABLES = gql`
  query SearchEmailAddresses($filters: SearchEmailAddressInput, $from: Int, $size: Int) {
    searchEmailAddresses(filters: $filters, from: $from, size: $size) {
      page
      pageSize
      total
      totalPages
      results {
        id
        type
        created
        modified
        labels
        confidence
        lang
        revoked
        value
        display_name
        belongs_to_refs
        created_by_ref
        defanged
      
        extensions
        external_references
        object_marking_refs
        spec_version
      }
    }
  }
`;

export const FIND_EMAILADDRESS_OBSERVABLE = gql`
  query GetEmailAddress($id: String!) {
    emailAddress(id: $id) {
      id
      type
      created
      modified
      labels
      confidence
      lang
      revoked
      value
      display_name
      belongs_to_refs
      created_by_ref
      defanged
      enrichment
      extensions
      external_references
      object_marking_refs
      spec_version
    }
  }
`;

export const FIND_EMAILADDRESSES_BY_VALUE = gql`
  query GetEmailAddressesByValue($value: String!) {
    emailAddressesByValue(value: $value) {
      id
      type
      created
      modified
      labels
      confidence
      lang
      revoked
      value
      display_name
      belongs_to_refs
      created_by_ref
      defanged
      enrichment
      extensions
      external_references
      object_marking_refs
      spec_version
    }
  }
`;

export const FIND_EMAILADDRESSES_BY_DISPLAYNAME = gql`
  query GetEmailAddressesByDisplayName($displayName: String!) {
    emailAddressesByDisplayName(displayName: $displayName) {
      id
      type
      created
      modified
      labels
      confidence
      lang
      revoked
      value
      display_name
      belongs_to_refs
      created_by_ref
      defanged
      
      extensions
      external_references
      object_marking_refs
      spec_version
    }
  }
`;

export const CREATE_EMAILADDRESS = gql`
  mutation CreateEmailAddress($input: CreateEmailAddressInput!) {
    createEmailAddress(input: $input) {
      id
      type
      created
      modified
      labels
      confidence
      lang
      revoked
      value
      display_name
      belongs_to_refs
      created_by_ref
      defanged
      
      extensions
      external_references
      object_marking_refs
      spec_version
    }
  }
`;

export const UPDATE_EMAILADDRESS = gql`
  mutation UpdateEmailAddress($id: String!, $input: UpdateEmailAddressInput!) {
    updateEmailAddress(id: $id, input: $input) {
      id
      type
      created
      modified
      labels
      confidence
      lang
      revoked
      value
      display_name
      belongs_to_refs
      created_by_ref
      defanged
      
      extensions
      external_references
      object_marking_refs
      spec_version
    }
  }
`;

export const DELETE_EMAILADDRESS = gql`
  mutation DeleteEmailAddress($id: String!) {
    deleteEmailAddress(id: $id)
  }
`;

export const EMAILADDRESS_CREATED_SUBSCRIPTION = gql`
  subscription EmailAddrCreated {
    emailAddrCreated {
      id
      type
      created
      modified
      labels
      confidence
      lang
      revoked
      value
      display_name
      belongs_to_refs
      created_by_ref
      defanged
      
      extensions
      external_references
      object_marking_refs
      spec_version
    }
  }
`;

export const EMAILADDRESS_UPDATED_SUBSCRIPTION = gql`
  subscription EmailAddrUpdated {
    emailAddressUpdated {
      id
      type
      created
      modified
      labels
      confidence
      lang
      revoked
      value
      display_name
      belongs_to_refs
      created_by_ref
      defanged
      
      extensions
      external_references
      object_marking_refs
      spec_version
    }
  }
`;

export const EMAILADDRESS_DELETED_SUBSCRIPTION = gql`
  subscription EmailAddrDeleted {
    emailAddressDeleted
  }
`;

