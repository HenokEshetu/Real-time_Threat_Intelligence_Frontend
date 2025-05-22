export interface File {

  _meta?: {
   
  };
  atime?: string;
  confidence?: number;
  contains_refs?: string[];
  content_ref?: string;
  created: string;
  created_by_ref?: string;
  ctime?: string;
  defanged?: boolean;
  enrichment?: Enrichment;
  extensions?: Record<string, any>;
  external_references?: ExternalReference[];
  hashes?: Hashes;
  id: string;
  labels?: string[];
  lang?: string;
  magic_number_hex?: string;
  mime_type?: string;
  modified: string;
  mtime?: string;
  name?: string;
  name_enc?: string;
  ntfs_ext?: NTFSFileExtension;
  object_marking_refs?: string[];
  parent_directory_ref?: string[];
  pdf_ext?: PDFFileExtension;
  raster_image_ext?: RasterImageFileExtension;
  revoked?: boolean;
  size?: number;
  spec_version: string;
  type: string;
  unix_ext?: UnixFileExtension;
  windows_pe_binary_ext?: WindowsPEBinaryFileExtension;
}

export interface Enrichment {
  abuseipdb?: any;
  asn?: any;
  dns?: any;
  geo?: any;
  hybrid?: any;
  misp?: any;
  shodan?: any;
  ssl?: any;
  threatcrowd?: any;
  threatfox?: any;
  virustotal?: any;
  whois?: any;
}

export interface ExternalReference {
  description?: string;
  external_id?: string;
  id: string;
  source_name: string;
  url?: string;
}

export interface Hashes {
  MD5?: string;
  SHA_1?: string;
  SHA_256?: string;
  SHA_512?: string;
}

export interface NTFSFileExtension {
  alternate_data_streams?: any;
  sid?: any;
}

export interface PDFFileExtension {
  version?: string;
  document_info_dict?: any;
}

export interface RasterImageFileExtension {
  bits_per_pixel?: number;
}

export interface UnixFileExtension {
  group_id?: string;
  mode?: number;
  user_id?: string;
}

export interface WindowsPEBinaryFileExtension {
  imphash?: string;
  optional_header?: any;
  pe_type?: string;
  sections?: any[];
}
