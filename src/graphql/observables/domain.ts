import { gql } from '@apollo/client';

export const SEARCH_DOMAIN_OBSERVABLES = gql`
  query searchDomainNames(
    $filter: SearchDomainNameInput!
    $page: Int!
    $pageSize: Int!
  ) {
    searchDomainNames(filters: $filter, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        confidence
        created
        created_by_ref
        defanged
        description
        pattern
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
        resolves_to_refs
        revoked
        spec_version
        type
        value
      }
    }
  }
`;

export const GET_DOMAIN_NAME = gql`
  query domainName($id: String!) {
    domainName(id: $id) {
      confidence
      created
      created_by_ref
      defanged
      pattern
      description
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
      resolves_to_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const DOMAIN_NAMES_BY_VALUE = gql`
  query domainNamesByValue($value: String!) {
    domainNamesByValue(value: $value) {
      id
      value
      created
      modified
      type
    }
  }
`;

export const CREATE_DOMAIN_NAME = gql`
  mutation createDomainName($input: CreateDomainNameInput!) {
    createDomainName(input: $input) {
      id
      value
      created
      modified
      type
    }
  }
`;

export const UPDATE_DOMAIN_NAME = gql`
  mutation updateDomainName($id: String!, $input: UpdateDomainNameInput!) {
    updateDomainName(id: $id, input: $input) {
      id
      value
      created
      modified
      type
    }
  }
`;

export const DELETE_DOMAIN_NAME = gql`
  mutation deleteDomainName($id: String!) {
    deleteDomainName(id: $id)
  }
`;

export const DOMAIN_NAME_CREATED_SUBSCRIPTION = gql`
  subscription DomainNameCreated {
    domainNameCreated {
      confidence
      created
      created_by_ref
      defanged
      extensions
      pattern
      description
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
      resolves_to_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const DOMAIN_NAME_UPDATED_SUBSCRIPTION = gql`
  subscription DomainNameUpdated {
    domainNameUpdated {
      confidence
      created
      created_by_ref
      defanged
      extensions
      pattern
      description
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
      resolves_to_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const DOMAIN_NAME_DELETED_SUBSCRIPTION = gql`
  subscription DomainNameDeleted {
    domainNameDeleted
  }
`;
