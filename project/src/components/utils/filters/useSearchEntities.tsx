import { BaseSyntheticEvent, Dispatch, useState } from 'react';
import { graphql } from 'react-relay';
import { fetchQuery } from '../../relay/environment';
import { OptionValue } from '@components/common/lists/FilterAutocomplete';
import { useTheme } from '@mui/styles';
import type { Theme } from '../../components/Theme';

// GraphQL queries
const filtersStixCoreObjectsSearchQuery = graphql`
  query useSearchEntitiesStixCoreObjectsSearchQuery(
    $search: String
    $types: [String]
    $count: Int
    $filters: FilterGroup
  ) {
    stixCoreObjects(
      search: $search
      types: $types
      first: $count
      filters: $filters
    ) {
      edges {
        node {
          id
          entity_type
          parent_types
          ... on BasicObject {
            name
            description
          }
          ... on StixCyberObservable {
            observable_value
          }
        }
      }
    }
  }
`;

const filtersSchemaSCOSearchQuery = graphql`
  query useSearchEntitiesSchemaSCOSearchQuery {
    schemaSCOs: subTypes(type: "Stix-Cyber-Observable") {
      edges {
        node {
          id
          label
        }
      }
    }
  }
`;

const workspacesQuery = graphql`
  query useSearchEntitiesDashboardsQuery($search: String, $filters: FilterGroup) {
    workspaces(search: $search, filters: $filters) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

export type EntityValue = OptionValue;

const useSearchEntities = ({
  availableEntityTypes,
  availableRelationshipTypes,
  searchContext,
  searchScope,
  setInputValues,
}: {
  availableEntityTypes?: string[];
  availableRelationshipTypes?: string[];
  searchContext: { entityTypes: string[] };
  searchScope: Record<string, string[]>;
  setInputValues: (value: { key: string; values: string[]; operator?: string }[]) => void;
}) => {
  const [entities, setEntities] = useState<Record<string, EntityValue[]>>({});
  const theme = useTheme() as Theme;

  // Helper to merge new entities while preventing duplicates
  const unionSetEntities = (key: string, newEntities: EntityValue[]) => {
    setEntities((current) => ({
      ...current,
      [key]: [...newEntities, ...(current[key] ?? [])].filter(
        (entity, index, arr) => 
          arr.findIndex((e) => e.value === entity.value && e.group === entity.group) === index
      ),
    }));
  };

  // Builder functions for different entity types
  const buildOptionsFromQuery = async <T extends { edges?: Array<{ node?: any }> | null }>(
    query: any,
    variables: any,
    mapper: (node: any) => EntityValue
  ) => {
    const data = await fetchQuery<T>(query, variables).toPromise();
    return (data?.edges ?? []).map(({ node }) => node ? mapper(node) : null).filter(Boolean);
  };

  const buildOptionsFromVocabulary = (key: string, categories: string[], searchTerm: string) => {
    return buildOptionsFromQuery(
      vocabularySearchQuery,
      {
        filters: { mode: 'or', filters: [{ key: 'category', values: categories }] },
        search: searchTerm,
        first: 10
      },
      (node) => ({ label: node.name, value: node.name, type: 'Vocabulary' })
    );
  };

  const buildOptionsFromLabels = (key: string, searchTerm: string) => {
    return buildOptionsFromQuery(
      labelsSearchQuery,
      { search: searchTerm, first: 10 },
      (node) => ({
        label: node.value,
        value: node.id,
        type: 'Label',
        color: node.color
      })
    ).then((labels) => {
      unionSetEntities(key, [
        { label: 'No label', value: '', type: 'Label', color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' },
        ...labels
      ]);
    });
  };

  const buildOptionsFromStixObjects = (key: string, types: string[], searchTerm: string) => {
    return buildOptionsFromQuery(
      filtersStixCoreObjectsSearchQuery,
      { types: searchScope[key] || types, search: searchTerm, count: 100 },
      (node) => ({
        label: node.name || node.observable_value || node.id,
        value: node.id,
        type: node.entity_type,
        parentTypes: node.parent_types || []
      })
    );
  };

  // Main search function
  const searchEntities = (
    filterKey: string,
    _: Record<string, any[]>,
    __: Dispatch<any>,
    event: BaseSyntheticEvent,
    isSubKey?: boolean
  ) => {
    if (!event?.target?.value) return;

    const searchTerm = event.target.value.toString();
    setInputValues([{ key: filterKey, values: [searchTerm], operator: 'eq' }]);

    // Handle special filter keys
    const specialHandlers: Record<string, () => Promise<void>> = {
      'objectAssignee': () => buildOptionsFromStixObjects(filterKey, ['Individual'], searchTerm),
      'objectParticipant': () => buildOptionsFromStixObjects(filterKey, ['User'], searchTerm),
      'contextCreatedBy': () => buildOptionsFromStixObjects(filterKey, ['Organization', 'Individual', 'System'], searchTerm),
      'contextObjectLabel': () => buildOptionsFromLabels(filterKey, searchTerm),
      'relationship_type': () => {
        const types = availableRelationshipTypes || ['stix-core-relationship', 'stix-sighting-relationship'];
        return Promise.resolve(unionSetEntities(filterKey, 
          types.map(type => ({
            label: type.replace(/-/g, ' '),
            value: type,
            type
          }))
        ));
      }
    };

    if (specialHandlers[filterKey]) {
      return specialHandlers[filterKey]();
    }

    // Default case based on filter type
    const filterDefinition = {}; // Simplified - would come from schema in real implementation
    switch (filterDefinition.type) {
      case 'vocabulary':
        return buildOptionsFromVocabulary(filterKey, ['category'], searchTerm);
      case 'boolean':
        return Promise.resolve(unionSetEntities(filterKey, [
          { label: 'True', value: 'true', type: 'Boolean' },
          { label: 'False', value: 'false', type: 'Boolean' }
        ]));
      case 'id':
        return buildOptionsFromStixObjects(filterKey, availableEntityTypes || ['Stix-Core-Object'], searchTerm);
      default:
        return buildOptionsFromStixObjects(filterKey, availableEntityTypes || [], searchTerm);
    }
  };

  return [entities, searchEntities] as const;
};

export default useSearchEntities;