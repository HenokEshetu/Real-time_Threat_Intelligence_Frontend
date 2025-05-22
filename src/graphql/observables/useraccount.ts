import { gql } from '@apollo/client';

export const GET_USER_ACCOUNT = gql`
  query GetUserAccount($id: String!) {
    userAccount(id: $id) {
      id
      account_created
      account_expires
      account_first_login
      account_last_login
      account_login
      account_type
      can_escalate_privs
      confidence
      created
      created_by_ref
      credential
      credential_last_changed
      defanged
      display_name
      enrichment
      extensions
      external_references {
        source_name
        url
        external_id
      }
      is_disabled
      is_privileged
      is_service_account
      labels
      lang
      modified
      object_marking_refs
      revoked
      spec_version
      type
      user_id
    }
  }
`;

export const SEARCH_USER_ACCOUNTS = gql`
  query SearchUserAccounts(
    $filters: SearchUrlUserAccountInput
    $page: Int = 1
    $pageSize: Int = 10
  ) {
    searchUserAccounts(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        account_created
        account_expires
        account_first_login
        account_last_login
        account_login
        account_type
        can_escalate_privs
        confidence
        created
        created_by_ref
        credential
        credential_last_changed
        defanged
        display_name
        enrichment
        extensions
        external_references {
          source_name
          url
          external_id
        }
        is_disabled
        is_privileged
        is_service_account
        labels
        lang
        modified
        object_marking_refs
        revoked
        spec_version
        type
        user_id
      }
    }
  }
`;

export const CREATE_USER_ACCOUNT = gql`
  mutation CreateUserAccount($input: CreateUserAccountInput!) {
    createUserAccount(input: $input) {
      id
      account_created
      account_expires
      account_first_login
      account_last_login
      account_login
      account_type
      can_escalate_privs
      confidence
      created
      created_by_ref
      credential
      credential_last_changed
      defanged
      display_name
      enrichment
      extensions
      external_references {
        source_name
        url
        external_id
      }
      is_disabled
      is_privileged
      is_service_account
      labels
      lang
      modified
      object_marking_refs
      revoked
      spec_version
      type
      user_id
    }
  }
`;

export const UPDATE_USER_ACCOUNT = gql`
  mutation UpdateUserAccount($id: String!, $input: UpdateUserAccountInput!) {
    updateUserAccount(id: $id, input: $input) {
      id
      account_created
      account_expires
      account_first_login
      account_last_login
      account_login
      account_type
      can_escalate_privs
      confidence
      created
      created_by_ref
      credential
      credential_last_changed
      defanged
      display_name
      enrichment
      extensions
      external_references {
        source_name
        url
        external_id
      }
      is_disabled
      is_privileged
      is_service_account
      labels
      lang
      modified
      object_marking_refs
      revoked
      spec_version
      type
      user_id
    }
  }
`;

export const DELETE_USER_ACCOUNT = gql`
  mutation DeleteUserAccount($id: String!) {
    deleteUserAccount(id: $id)
  }
`;
