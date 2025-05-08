import { gql } from '@apollo/client';

export const SEARCH_RELATIONSHIP = gql`
  query SearchRelationships(
    $filters: SearchRelationshipInput
    $page: Int = 1
    $pageSize: Int = 10
  ) {
    searchRelationships(filters: $filters, page: $page, pageSize: $pageSize) {
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
        confidence
        relationship_type
        description
        source_ref
        target_ref
        start_time
        stop_time
        created_by_ref
        labels
        lang
        revoked
        extensions
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
      }
    }
  }
`;

export const GET_RELATIONSHIP_OBJECT = gql`
  query GetObjectsByIDs($ids: [String!]!) {
    getObjectsByIDs(ids: $ids) {
      __typename
      ... on Artifact {
        id
        type
        spec_version
        created
        modified
        mime_type
        payload_bin
        url
        hashes {
          MD5
          SHA_1
          SHA_256
          SHA_512
        }
        encryption_algorithm
        decryption_key
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on AttackPattern {
        id
        type
        spec_version
        created
        modified
        #   name
        description
        aliases
        kill_chain_phases {
          id
          kill_chain_name
          phase_name
        }
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        version
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on AutonomousSystem {
        id
        type
        spec_version
        created
        modified
        #   name
        number
        rir
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on Campaign {
        id
        type
        spec_version
        created
        modified
        #   name
        description
        aliases
        #   first_seen
        #   last_seen
        objective
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on CourseOfAction {
        id
        type
        spec_version
        created
        modified
        #   name
        description
        action
        action_type
        action_reference
        action_bin
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Directory {
        id
        type
        spec_version
        created
        modified
        path
        path_enc
        atime
        ctime
        mtime
        contains_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on DomainName {
        id
        type
        spec_version
        created
        modified
        value
        #   resolves_to_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on EmailAddress {
        id
        type
        spec_version
        created
        modified
        value
        display_name
        #   belongs_to_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on EmailMessage {
        id
        type
        spec_version
        created
        modified
        subject
        date
        content_type
        from_ref
        sender_ref
        to_refs
        cc_refs
        bcc_refs
        message_id
        body
        body_multipart
        received_lines
        raw_email_ref
        is_multipart
        additional_header_fields
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on File {
        id
        type
        spec_version
        created
        modified
        #   name
        name_enc
        mime_type
        magic_number_hex
        size
        atime
        ctime
        mtime
        hashes {
          MD5
          SHA_1
          SHA_256
          SHA_512
        }
        content_ref
        contains_refs
        parent_directory_ref
        ntfs_ext {
          # alternate_data_streams {
          #   name
          #   size
          #   hashes {
          #     MD5
          #     SHA_1
          #     SHA_256
          #     SHA_512
          #   }
          # }
          sid
        }
        pdf_ext {
          document_info_dict
          is_optimized
          # pdf_version
          pdfid0
          pdfid1
          version
        }
        raster_image_ext {
          bits_per_pixel
          # exif_data
          # image_compression_algorithm
          image_height
          image_width
        }
        unix_ext {
          group_id
          mode
          user_id
        }
        windows_pe_binary_ext {
          imphash
          pe_type
          optional_header
          # sections {
          #   name
          #   size
          #   entropy
          #   hashes {
          #     MD5
          #     SHA_1
          #     SHA_256
          #     SHA_512
          #   }
          # }
        }
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on Grouping {
        id
        type
        spec_version
        created
        modified
        name
        description
        context
        object_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on IPv4Address {
        id
        type
        spec_version
        created
        modified
        value
        resolves_to_refs
        belongs_to_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on IPv6Address {
        id
        type
        spec_version
        created
        modified
        value
        resolves_to_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on Identity {
        id
        type
        spec_version
        created
        modified
        name
        description
        roles
        identity_class
        sectors
        contact_information
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Incident {
        id
        type
        spec_version
        created
        modified
        name
        description
        aliases
        #   first_seen
        #   last_seen
        incident_types
        severity
        source
        status
        affected_assets
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Indicator {
        id
        type
        spec_version
        created
        modified
        name
        description
        indicator_types
        pattern
        pattern_type
        pattern_version
        valid_from
        valid_until
        kill_chain_phases {
          id
          kill_chain_name
          phase_name
        }
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Infrastructure {
        id
        type
        spec_version
        created
        modified
        name
        description
        aliases
        infrastructure_types
        #   first_seen
        #   last_seen
        kill_chain_phases {
          id
          kill_chain_name
          phase_name
        }
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on IntrusionSet {
        id
        type
        spec_version
        created
        modified
        name
        description
        aliases
        #   first_seen
        #   last_seen
        goals
        resource_level
        primary_motivation
        secondary_motivations
        kill_chain_phases {
          id
          kill_chain_name
          phase_name
        }
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Location {
        id
        type
        spec_version
        created
        modified
        name
        description
        latitude
        longitude
        precision
        region
        country
        administrative_area
        city
        street_address
        postal_code
        default
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on MACAddress {
        id
        type
        spec_version
        created
        modified
        value
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on Malware {
        id
        type
        spec_version
        created
        modified
        name
        description
        malware_types
        is_family
        aliases
        kill_chain_phases {
          id
          kill_chain_name
          phase_name
        }
        architecture_execution_envs
        implementation_languages
        capabilities
        #   first_seen
        #   last_seen
        operating_system_refs
        sample_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on MalwareAnalysis {
        id
        type
        spec_version
        created
        modified
        product
        version
        configuration_version
        modules
        analysis_engine_version
        analysis_definition_version
        submitted
        analysis_started
        analysis_ended
        result
        analysis_sco_refs
        sample_ref
        host_vm_ref
        operating_system_ref
        installed_software_ref
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Mutex {
        id
        type
        spec_version
        created
        modified
        name
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on NetworkTraffic {
        id
        type
        spec_version
        created
        modified
        start
        end
        is_active
        src_ref
        dst_ref
        src_port
        dst_port
        protocols
        src_byte_count
        dst_byte_count
        src_packets
        dst_packets
        ipfix
        src_payload_ref
        dst_payload_ref
        encapsulates_refs
        encapsulated_by_ref
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on Note {
        id
        type
        spec_version
        created
        modified
        abstract
        content
        content_type
        authors
        object_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on ObservedData {
        id
        type
        spec_version
        created
        modified
        first_observed
        last_observed
        number_observed
        object_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Opinion {
        id
        type
        spec_version
        created
        modified
        explanation
        authors
        opinion
        object_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Process {
        id
        type
        spec_version
        created
        modified
        pid
        created_time
        cwd
        command_line
        environment_variables
        arguments
        is_hidden
        image_ref
        parent_ref
        child_refs
        #   creator_user_ref
        opened_connection_refs
        service_dll_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on Report {
        id
        type
        spec_version
        created
        modified
        name
        description
        report_types
        authors
        published
        object_refs
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Sighting {
        id
        type
        spec_version
        created
        modified
        #   first_seen
        #   last_seen
        count
        sighting_of_ref
        observed_data_refs
        where_sighted_refs
        summary
        detected
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
      }
      ... on Software {
        id
        type
        spec_version
        created
        modified
        name
        cpe
        swid
        languages
        vendor
        version
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on ThreatActor {
        id
        type
        spec_version
        created
        modified
        name
        description
        aliases
        threat_actor_types
        roles
        goals
        sophistication
        resource_level
        primary_motivation
        secondary_motivations
        personal_motivations
        first_seen
        last_seen
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Tool {
        id
        type
        spec_version
        created
        modified
        name
        description
        aliases
        tool_types
        tool_version
        kill_chain_phases {
          id
          kill_chain_name
          phase_name
        }
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on Url {
        id
        type
        spec_version
        created
        modified
        value
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on UserAccount {
        id
        type
        spec_version
        created
        modified
        user_id
        account_login
        account_type
        display_name
        is_service_account
        is_privileged
        can_escalate_privs
        is_disabled
        account_created
        account_expires
        credential
        credential_last_changed
        account_first_login
        account_last_login
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on Vulnerability {
        id
        type
        spec_version
        created
        modified
        name
        description
        cve_id
        cvss_v3_score
        cvss_v3_vector
        published_date
        last_modified_date
        vulnerability_status
        affected_products
        references
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        relationship {
          id
          type
          spec_version
          created
          modified
          relationship_type
          source_ref
          target_ref
          start_time
          stop_time
          created_by_ref
          revoked
          labels
          confidence
          lang
          external_references {
            id
            source_name
            description
            url
            external_id
          }
          object_marking_refs
          extensions
        }
      }
      ... on WindowsRegistryKey {
        id
        type
        spec_version
        created
        modified
        key
        values {
          name
          data
          data_type
        }
        modified_time
        number_of_subkeys
        creator_user_ref
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
      ... on X509Certificate {
        id
        type
        spec_version
        created
        modified
        is_self_signed
        hashes {
          MD5
          SHA_1
          SHA_256
          SHA_512
        }
        version
        serial_number
        signature_algorithm
        issuer
        validity_not_before
        validity_not_after
        subject
        subject_public_key_algorithm
        subject_public_key_modulus
        subject_public_key_exponent
        x509_v3_extensions
        created_by_ref
        revoked
        labels
        confidence
        lang
        external_references {
          id
          source_name
          description
          url
          external_id
        }
        object_marking_refs
        extensions
        defanged
      }
    }
  }
`;