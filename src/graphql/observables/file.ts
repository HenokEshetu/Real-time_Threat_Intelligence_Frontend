import { gql } from '@apollo/client';

export const SEARCH_FILE_OBSERVABLES = gql`
  query searchFiles($filter: SearchFileInput!, $from: Int!, $size: Int!) {
    searchFiles(filters: $filter, from: $from, size: $size) {
      page
      pageSize
      total
      totalPages
      results {
        atime
        confidence
        contains_refs
        content_ref
        created
        created_by_ref
        ctime
        defanged
        extensions
        external_references {
          description
          external_id
          id
          source_name
          url
        }
        hashes {
          MD5
          SHA_1
          SHA_256
          SHA_512
        }
        id
        labels
        lang
        magic_number_hex
        mime_type
        modified
        mtime
        name
        name_enc
        ntfs_ext {
          alternate_data_streams
          sid
        }
        object_marking_refs
        parent_directory_ref
        pdf_ext {
          version
          document_info_dict
        }
        raster_image_ext {
          bits_per_pixel
        }
        revoked
        size
        spec_version
        type
        unix_ext {
          group_id
          mode
          user_id
        }
        windows_pe_binary_ext {
          imphash
          optional_header
          pe_type
          sections
        }
      }
    }
  }
`;

export const FIND_FILE_OBSERVABLE = gql`
  query GetFileByID($id: String!) {
    file(id: $id) {
      content_ref
      created
      created_by_ref
      ctime
      defanged
      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      hashes {
        MD5
        SHA_1
        SHA_256
        SHA_512
      }
      id
      labels
      lang
      magic_number_hex
      mime_type
      modified
      mtime
      name
      name_enc
      ntfs_ext {
        alternate_data_streams
        sid
      }
      object_marking_refs
      parent_directory_ref
      pdf_ext {
        version
        document_info_dict
      }
      raster_image_ext {
        bits_per_pixel
      }
      revoked
      size
      spec_version
      type
      unix_ext {
        group_id
        mode
        user_id
      }
      windows_pe_binary_ext {
        imphash
        optional_header
        pe_type
        sections
      }
    }
  }
`;

export const FILE_CREATED_SUBSCRIPTION = gql`
  subscription FileCreated {
    fileCreated {
      atime
      confidence
      contains_refs
      content_ref
      created
      created_by_ref
      ctime
      defanged
      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      hashes {
        MD5
        SHA_1
        SHA_256
        SHA_512
      }
      id
      labels
      lang
      magic_number_hex
      mime_type
      modified
      mtime
      name
      name_enc
      ntfs_ext {
        alternate_data_streams
        sid
      }
      object_marking_refs
      parent_directory_ref
      pdf_ext {
        version
        document_info_dict
      }
      raster_image_ext {
        bits_per_pixel
      }
      revoked
      size
      spec_version
      type
      unix_ext {
        group_id
        mode
        user_id
      }
      windows_pe_binary_ext {
        imphash
        optional_header
        pe_type
        sections
      }
    }
  }
`;

export const FILE_UPDATED_SUBSCRIPTION = gql`
  subscription FileUpdated {
    fileUpdated {
      atime
      confidence
      contains_refs
      content_ref
      created
      created_by_ref
      ctime
      defanged
      extensions
      external_references {
        description
        external_id
        id
        source_name
        url
      }
      hashes {
        MD5
        SHA_1
        SHA_256
        SHA_512
      }
      id
      labels
      lang
      magic_number_hex
      mime_type
      modified
      mtime
      name
      name_enc
      ntfs_ext {
        alternate_data_streams
        sid
      }
      object_marking_refs
      parent_directory_ref
      pdf_ext {
        version
        document_info_dict
      }
      raster_image_ext {
        bits_per_pixel
      }
      revoked
      size
      spec_version
      type
      unix_ext {
        group_id
        mode
        user_id
      }
      windows_pe_binary_ext {
        imphash
        optional_header
        pe_type
        sections
      }
    }
  }
`;

export const FILE_DELETED_SUBSCRIPTION = gql`
  subscription FileDeleted {
    fileDeleted
  }
`;
