import axios from 'axios';

const API_URL = 'http://localhost:4000/graphql'; // Replace with your backend URL

export class ArtifactService {
  static async fetchArtifacts(filters = {}, from = 0, size = 10, search = '') {
    const query = `
      query ($filters: SearchArtifactInput, $from: Int, $size: Int, $search: String) {
        searchArtifacts(filters: $filters, from: $from, size: $size, search: $search) {
          page
          pageSize
          total
          totalPages
          results {
            id
            type
            spec_version
            created
            modified
            mime_type
            url
            confidence
            labels
          }
        }
      }
    `;
    const variables = { filters, from, size, search };
    const response = await axios.post(API_URL, { query, variables });
    return response.data.data.searchArtifacts;
  }
}
