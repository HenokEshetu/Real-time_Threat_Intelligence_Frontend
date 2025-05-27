import gql from 'graphql-tag';

export const CREATE_CAMPAIGN = gql`
  mutation CreateCampaign($input: CreateCampaignInput!) {
    createCampaign(input: $input) {
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
`;

export const UPDATE_CAMPAIGN = gql`
  mutation UpdateCampaign($id: String!, $input: UpdateCampaignInput!) {
    updateCampaign(id: $id, input: $input) {
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
      x_mitre_domains
    }
  }
`;

export const DELETE_CAMPAIGN = gql`
  mutation DeleteCampaign($id: String!) {
    deleteCampaign(id: $id)
  }
`;

export const CAMPAIGN_CREATED_SUBSCRIPTION = gql`
  subscription CampaignCreated {
    campaignCreated {
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
      x_mitre_domains
    }
  }
`;

export const CAMPAIGN_UPDATED_SUBSCRIPTION = gql`
  subscription CampaignUpdated {
    campaignUpdated {
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
      x_mitre_domains
    }
  }
`;

export const CAMPAIGN_DELETED_SUBSCRIPTION = gql`
  subscription CampaignDeleted {
    campaignDeleted
  }
`;
