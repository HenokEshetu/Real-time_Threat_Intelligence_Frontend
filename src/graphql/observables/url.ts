import { gql } from '@apollo/client';

export const SEARCH_URL_OBSERVABLES = gql`
  query searchUrls($filter: SearchUrlInput!, $page: Int!, $pageSize: Int!) {
    searchUrls(filters: $filter, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        confidence
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
        object_marking_refs
        revoked
        spec_version
        type
        value
      }
    }
  }
`;

export const FIND_URL_OBSERVABLE = gql`
  query GetURLByID($id: String!) {
    url(id: $id) {
      confidence
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
      object_marking_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const CREATE_URL = gql`
  mutation CreateUrl($input: CreateUrlInput!) {
    createUrl(input: $input) {
      confidence
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
      object_marking_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const UPDATE_URL = gql`
  mutation UpdateUrl($id: String!, $input: UpdateUrlInput!) {
    updateUrl(id: $id, input: $input) {
      confidence
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
      object_marking_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const DELETE_URL = gql`
  mutation DeleteUrl($id: String!) {
    deleteUrl(id: $id)
  }
`;

export const URL_CREATED_SUBSCRIPTION = gql`
  subscription UrlCreated {
    urlCreated {
      confidence
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
      object_marking_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const URL_UPDATED_SUBSCRIPTION = gql`
  subscription UrlUpdated {
    urlUpdated {
      confidence
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
      object_marking_refs
      revoked
      spec_version
      type
      value
    }
  }
`;

export const URL_DELETED_SUBSCRIPTION = gql`
  subscription UrlDeleted {
    urlDeleted
  }
`;
