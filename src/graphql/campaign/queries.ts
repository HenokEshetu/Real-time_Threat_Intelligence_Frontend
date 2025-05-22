import gql from 'graphql-tag';


export const GET_CAMPAIGN =gql`
query GetCampaign($id: String!) {
  campaign(id: $id) {
    id
    created
    modified
    type
    name
    description
    aliases
    first_seen
    last_seen
    objective
    relationship {
      id
      source_ref
      target_ref
      type
    }
    external_references {
      source_name
      url
      description
    }
  }
}
`;





export const SEARCH_COMPAIGNS = gql`

query SearchCampaigns($filters: SearchCampaignInput, $page: Int, $pageSize: Int) {
    searchCampaigns(filters: $filters, page: $page, pageSize: $pageSize) {
      page
      pageSize
      total
      totalPages
      results {
        id
        created
        modified
        type
        name
        description
        aliases
        first_seen
        last_seen
        objective
        relationship {
          id
          source_ref
          target_ref
          type
        }
      }
    }
  }
`;
