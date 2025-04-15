import { gql } from '@apollo/client';

export const ARTIFACT_FIELDS = gql`
  fragment ArtifactFields on Artifact {
    id
    name
    mime_type
    created
    modified
    labels
  }
`;