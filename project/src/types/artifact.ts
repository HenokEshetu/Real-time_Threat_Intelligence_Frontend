export interface Artifact {
    id: string;
    name: string;
    mime_type: string;
    payload_bin?: string;
    url?: string;
    hashes?: {
      MD5?: string;
      SHA1?: string;
      SHA256?: string;
    };
    created: string;
    modified: string;
    labels?: string[];
    description?: string;
  }
  
  export interface ArtifactEdge {
    node: Artifact;
    cursor: string;
  }
  
  export interface ArtifactConnection {
    edges: ArtifactEdge[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor?: string;
    };
  }
  
  export interface CreateArtifactInput {
    name?: string;
    mime_type: string;
    payload_bin?: string;
    url?: string;
    labels?: string[];
    description?: string;
  }
  
  export interface UpdateArtifactInput {
    name?: string;
    mime_type?: string;
    payload_bin?: string;
    url?: string;
    labels?: string[];
    description?: string;
  }
  
  export interface DeleteArtifactResponse {
    id: string;
    success: boolean;
  }
  
  export interface UpdateArtifactInput extends Partial<CreateArtifactInput> {
    id: string;
  }