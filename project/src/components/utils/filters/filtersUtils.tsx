import * as R from 'ramda';
import { v4 as uuid } from 'uuid';
import { OptionValue } from '@components/common/lists/FilterAutocomplete';
import React from 'react';
import { subDays } from 'date-fns';
import type { FilterGroup as GqlFilterGroup } from './__generated__/useSearchEntitiesStixCoreObjectsSearchQuery.graphql';
import { capitalizeFirstLetter } from '../String';
import { FilterRepresentative } from '../../components/filters/FiltersModel';
import { generateUniqueItemsArray, isEmptyField } from '../utils';
import { Filter, FilterGroup, FilterValue, handleFilterHelpers } from './filtersHelpers-types';

// Type declarations for modules that might not have types
declare module 'uuid' {
  export function v4(): string;
}

declare module '@components/common/lists/FilterAutocomplete' {
  export interface OptionValue {
    value: string;
    type: string;
    parentTypes: string[];
    group: string;
    label: string;
    color?: string;
  }
}

declare module '../../../components/filters/FiltersModel' {
  export interface FilterRepresentative {
    value: string;
    entity_type?: string;
    color?: string;
  }
}

//----------------------------------------------------------------------------------------------------------------------

export type { FilterGroup as GqlFilterGroup };

export interface FilterSearchContext {
  entityTypes: string[];
  elementId?: string[];
}

export type FiltersRestrictions = {
  preventLocalModeSwitchingFor?: string[];
  preventRemoveFor?: string[];
  preventFilterValuesEditionFor?: Map<string, string[]>;
};

export const emptyFilterGroup: FilterGroup = {
  mode: 'and',
  filters: [],
  filterGroups: [],
};

//----------------------------------------------------------------------------------------------------------------------

export const SELF_ID = 'SELF_ID';
export const SELF_ID_VALUE = 'CURRENT ENTITY';

export const FiltersVariant = {
  list: 'list',
  dialog: 'dialog',
} as const;

export const entityTypesFilters = [
  'entity_type',
  'fromTypes',
  'toTypes',
  'relationship_type',
  'contextEntityType',
  'elementWithTargetTypes',
  'type',
  'x_opencti_main_observable_type',
  'main_entity_type',
  'exclusion_list_entity_types',
];

export const contextFilters = [
  'contextCreator',
  'contextCreatedBy',
  'contextEntityId',
  'contextEntityType',
  'contextObjectLabel',
  'contextObjectMarking',
];

export const stixFilters = [
  'entity_type',
  'workflow_id',
  'objectAssignee',
  'objects',
  'objectMarking',
  'objectLabel',
  'creator_id',
  'createdBy',
  'priority',
  'severity',
  'x_opencti_score',
  'x_opencti_detection',
  'revoked',
  'confidence',
  'indicator_types',
  'pattern_type',
  'x_opencti_main_observable_type',
  'fromId',
  'toId',
  'fromTypes',
  'toTypes',
  'representative',
  'x_opencti_cisa_kev',
  'x_opencti_epss_score',
  'x_opencti_epss_percentile',
  'x_opencti_cvss_base_score',
  'x_opencti_cvss_base_severity',
  'report_types',
];

//----------------------------------------------------------------------------------------------------------------------
// utilities

export const isFilterGroupNotEmpty = (filterGroup?: FilterGroup | null): boolean => {
  return !!(
    filterGroup
    && (filterGroup.filters?.length > 0 || filterGroup.filterGroups?.length > 0)
  );
};

export const isFilterFormatCorrect = (stringFilters: string): boolean => {
  try {
    const filters = JSON.parse(stringFilters) as FilterGroup;
    return !!filters.mode && !!filters.filters && !!filters.filterGroups;
  } catch (e) {
    return false;
  }
};

export const isUniqFilter = (key: string, filterKeysSchema: Map<string, Map<string, FilterDefinition>>): boolean => {
  const filterDefinition = filterKeysSchema.get('Stix-Core-Object')?.get(key);
  return !!(filterDefinition && ['boolean', 'date', 'integer', 'float'].includes(filterDefinition.type));
};

export const isBasicTextFilter = (
  filterDefinition: FilterDefinition | undefined,
): boolean => {
  return !!filterDefinition
    && (filterDefinition.type === 'string' || filterDefinition.type === 'text')
    && !entityTypesFilters.includes(filterDefinition.filterKey);
};

export const isNumericFilter = (
  filterType?: string,
): boolean => {
  return filterType === 'integer' || filterType === 'float';
};

export const findFilterFromKey = (
  filters: Filter[],
  key: string,
  operator = 'eq',
): Filter | null => {
  for (const filter of filters) {
    if (filter.key === key) {
      if (filter.operator === operator) {
        return filter;
      }
    }
  }
  return null;
};

export const findFiltersFromKeys = (
  filters: Filter[],
  keys: string[],
  operator = 'eq',
): Filter[] => {
  const result: Filter[] = [];
  for (const filter of filters) {
    if (keys.includes(filter.key)) {
      if (!filter.operator || filter.operator === operator) {
        result.push(filter);
      }
    }
  }
  return result;
};

export const findFilterIndexFromKey = (
  filters: Filter[],
  key: string,
  operator?: string,
): number | null => {
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    if (filter.key === key) {
      if (operator && filter.operator === operator) {
        return i;
      }
      if (!operator) {
        return i;
      }
    }
  }
  return null;
};

export const addFilter = (
  filters: FilterGroup | undefined,
  key: string,
  value: string | string[],
  operator = 'eq',
  mode = 'or',
): FilterGroup | undefined => {
  const filterFromParameters: Filter = {
    id: uuid(),
    key,
    values: Array.isArray(value) ? value : [value],
    operator,
    mode,
  };
  return {
    mode: 'and',
    filters: [filterFromParameters],
    filterGroups: filters ? [filters] : [],
  };
};

export const removeEntityTypeAllFromFilterGroup = (inputFilters?: FilterGroup): FilterGroup | undefined => {
  if (inputFilters && isFilterGroupNotEmpty(inputFilters)) {
    const { filters, filterGroups } = inputFilters;
    const newFilters = filters.filter((f) => !(f.key === 'entity_type' && f.values.includes('all')));
    const newFilterGroups = filterGroups.map((group) => removeEntityTypeAllFromFilterGroup(group)) as FilterGroup[];
    return {
      ...inputFilters,
      filters: newFilters,
      filterGroups: newFilterGroups,
    };
  }
  return inputFilters;
};

export const getEntityTypeTwoFirstLevelsFilterValues = (
  filters?: FilterGroup,
  observableTypes?: string[],
  domainObjectTypes?: string[],
): string[] => {
  if (!filters) {
    return [];
  }
  let firstLevelValues = findFiltersFromKeys(filters.filters, ['entity_type'], 'eq')
    .map(({ values }) => values)
    .flat();
  if (filters.filterGroups.length > 0) {
    const subFiltersSeparatedWithAnd = filters.filterGroups
      .filter((fg) => fg.mode === 'and' || (fg.mode === 'or' && fg.filters.length === 1))
      .map((fg) => fg.filters)
      .flat();
    if (subFiltersSeparatedWithAnd.length > 0) {
      const secondLevelValues = findFiltersFromKeys(subFiltersSeparatedWithAnd, ['entity_type'], 'eq')
        .map(({ values }) => values)
        .flat();
      if (secondLevelValues.length > 0) {
        if (filters.mode === 'and') {
          if (secondLevelValues.every((type) => observableTypes?.includes(type))) {
            firstLevelValues = firstLevelValues.filter((type) => type !== 'Stix-Cyber-Observable');
          }
          if (secondLevelValues.every((type) => domainObjectTypes?.includes(type))) {
            firstLevelValues = firstLevelValues.filter((type) => type !== 'Stix-Domain-Object');
          }
        }
        return [...firstLevelValues, ...secondLevelValues];
      }
    }
    if (filters.mode === 'or') {
      return [];
    }
  }
  return firstLevelValues;
};

export const buildFiltersAndOptionsForWidgets = (
  inputFilters: FilterGroup | undefined,
  opts: { removeTypeAll?: boolean; startDate?: string; endDate?: string; dateAttribute?: string } = {},
): { filters: FilterGroup | undefined } => {
  const { removeTypeAll = false, startDate = null, endDate = null, dateAttribute = 'created_at' } = opts;
  let filters = inputFilters;
  if (removeTypeAll) {
    filters = removeEntityTypeAllFromFilterGroup(filters);
  }
  const dateFiltersContent: Filter[] = [];
  if (startDate) {
    dateFiltersContent.push({
      id: uuid(),
      key: dateAttribute,
      values: [startDate],
      operator: 'gt',
      mode: 'or',
    });
  }
  if (endDate) {
    dateFiltersContent.push({
      id: uuid(),
      key: dateAttribute,
      values: [endDate],
      operator: 'lt',
      mode: 'or',
    });
  }
  if (dateFiltersContent.length > 0) {
    filters = {
      mode: 'and',
      filters: dateFiltersContent,
      filterGroups: filters && isFilterGroupNotEmpty(filters) ? [filters] : [],
    };
  }
  return {
    filters,
  };
};

export const filterValue = (
  filterKey: string, 
  value?: string | null, 
  filterType?: string, 
  filterOperator?: string
): string | undefined => {
  if (filterKey === 'regardingOf') {
    return JSON.stringify(value);
  }
  if (filterKey === 'x_opencti_negative') {
    return value === 'true' ? 'False positive' : 'True positive';
  }
  if (value && entityTypesFilters.includes(filterKey)) {
    return value === 'all' ? 'All' : value.toString();
  }
  if (filterType === 'date') {
    if (filterOperator && value && ['lte', 'gt'].includes(filterOperator)) {
      return subDays(new Date(value), 1).toISOString();
    }
    return value ?? undefined;
  }
  if (filterKey === 'relationship_type' || filterKey === 'type') {
    return value ?? undefined;
  }
  return value ?? undefined;
};

export const isFilterEditable = (
  filtersRestrictions: FiltersRestrictions | undefined, 
  filterKey: string, 
  filterValues: string[]
): boolean => {
  return !(filtersRestrictions?.preventFilterValuesEditionFor
    && Array.from(filtersRestrictions.preventFilterValuesEditionFor.keys() ?? []).includes(filterKey)
    && filtersRestrictions.preventFilterValuesEditionFor.get(filterKey)?.some((v) => filterValues.includes(v)));
};

//----------------------------------------------------------------------------------------------------------------------
// Serialization

const sanitizeFilterGroupKeysForBackend = (
  filterGroup: FilterGroup,
): GqlFilterGroup => {
  return {
    ...filterGroup,
    filters: filterGroup?.filters?.filter((f) => f.values.length > 0 || ['nil', 'not_nil'].includes(f.operator ?? 'eq'))
      .map((f) => {
        const transformFilter = {
          ...f,
          key: Array.isArray(f.key) ? f.key : [f.key],
        };
        delete transformFilter.id;
        return transformFilter;
      }),
    filterGroups: filterGroup?.filterGroups?.map((fg) => sanitizeFilterGroupKeysForBackend(fg)),
  } as GqlFilterGroup;
};

const sanitizeFilterGroupKeysForFrontend = (
  filterGroup: GqlFilterGroup,
): FilterGroup => {
  return {
    ...filterGroup,
    filters: filterGroup?.filters?.map((f) => ({
      ...f,
      id: uuid(),
      key: Array.isArray(f.key) ? f.key[0] : f.key,
      values: f.values.map((v) => v || ''),
    })),
    filterGroups: filterGroup?.filterGroups?.map((fg) => sanitizeFilterGroupKeysForFrontend(fg)),
  } as FilterGroup;
};

export const serializeFilterGroupForBackend = (
  filterGroup?: FilterGroup | null,
): string => {
  if (!filterGroup) {
    return JSON.stringify(emptyFilterGroup);
  }
  return JSON.stringify(sanitizeFilterGroupKeysForBackend(filterGroup));
};

export const deserializeFilterGroupForFrontend = (
  filterGroup?: GqlFilterGroup | string | null,
): FilterGroup | null => {
  if (!filterGroup) {
    return null;
  }
  let filters: GqlFilterGroup;
  if (typeof filterGroup === 'string') {
    filters = JSON.parse(filterGroup) as GqlFilterGroup;
  } else {
    filters = filterGroup;
  }
  return sanitizeFilterGroupKeysForFrontend(filters);
};

//----------------------------------------------------------------------------------------------------------------------

export const constructHandleAddFilter = (
  filters: FilterGroup | undefined | null,
  k: string,
  id: string | null,
  filterKeysSchema: Map<string, Map<string, FilterDefinition>>,
  op = 'eq',
): FilterGroup => {
  if (filters && findFilterFromKey(filters.filters, k, op)) {
    const filter = findFilterFromKey(filters.filters, k, op);
    let newValues: FilterValue[] = [];
    if (id !== null) {
      newValues = isUniqFilter(k, filterKeysSchema)
        ? [id]
        : R.uniq([...(filter?.values ?? []), id]);
    }
    const newFilterElement: Filter = {
      key: k,
      values: newValues,
      operator: op,
      mode: 'or',
    };
    return {
      ...filters,
      filters: [
        ...filters.filters.filter((f) => f.key !== k || f.operator !== op),
        newFilterElement,
      ],
    };
  }
  const newFilterElement: Filter = {
    key: k,
    values: id !== null ? [id] : [],
    operator: op ?? 'eq',
    mode: 'or',
  };
  return filters
    ? {
      ...filters,
      filters: [...filters.filters, newFilterElement],
    }
    : {
      mode: 'and',
      filterGroups: [],
      filters: [newFilterElement],
    };
};

export const constructHandleRemoveFilter = (
  filters: FilterGroup | undefined | null, 
  k: string, 
  op = 'eq'
): FilterGroup | undefined => {
  if (filters) {
    const newBaseFilters = {
      ...filters,
      filters: filters.filters.filter((f) => f.key !== k || f.operator !== op),
    };
    return isFilterGroupNotEmpty(newBaseFilters) ? newBaseFilters : emptyFilterGroup;
  }
  return undefined;
};

export const filtersAfterSwitchLocalMode = (
  filters: FilterGroup | undefined | null, 
  localFilter: Filter
): FilterGroup | undefined => {
  if (filters) {
    const filterIndex = findFilterIndexFromKey(
      filters.filters,
      localFilter.key,
      localFilter.operator,
    );
    if (filterIndex !== null) {
      const newFiltersContent = [...filters.filters];
      newFiltersContent[filterIndex] = {
        ...localFilter,
        mode: localFilter.mode === 'and' ? 'or' : 'and',
      };
      return {
        ...filters,
        filters: newFiltersContent,
      };
    }
  }
  return undefined;
};

export const getDefaultOperatorFilter = (
  filterDefinition?: FilterDefinition,
): string => {
  if (!filterDefinition) {
    return 'eq';
  }
  const { type } = filterDefinition;
  if (type === 'date') {
    return 'gte';
  }
  if (isNumericFilter(type)) {
    return 'gt';
  }
  if (type === 'boolean') {
    return 'eq';
  }
  if (isBasicTextFilter(filterDefinition)) {
    if (filterDefinition.type === 'string') {
      return 'starts_with';
    }
    if (filterDefinition.type === 'text') {
      return 'search';
    }
    throw Error(`A basic text filter is of type string or text, not ${filterDefinition.type}`);
  }
  return 'eq';
};

export const getAvailableOperatorForFilterSubKey = (filterKey: string, subKey: string): string[] => {
  if (filterKey === 'regardingOf') {
    if (subKey === 'id' || subKey === 'relationship_type') {
      return ['eq'];
    }
  }
  return ['eq', 'not_eq', 'nil', 'not_nil'];
};

export const getAvailableOperatorForFilterKey = (
  filterDefinition: FilterDefinition | undefined,
): string[] => {
  if (!filterDefinition) {
    return ['eq'];
  }
  if (filterDefinition.filterKey === 'connectedToId') {
    return ['eq'];
  }
  const { type: filterType } = filterDefinition;
  if (filterType === 'date') {
    return ['gt', 'gte', 'lt', 'lte', 'nil', 'not_nil'];
  }
  if (isNumericFilter(filterType)) {
    return ['gt', 'gte', 'lt', 'lte'];
  }
  if (filterType === 'boolean') {
    return ['eq', 'not_eq'];
  }
  if (isBasicTextFilter(filterDefinition)) {
    if (filterDefinition.type === 'string') {
      return ['eq', 'not_eq', 'nil', 'not_nil', 'contains', 'not_contains',
        'starts_with', 'not_starts_with', 'ends_with', 'not_ends_with', 'search'];
    }
    if (filterDefinition.type === 'text') {
      return ['search', 'nil', 'not_nil'];
    }
    throw Error(`A basic text filter is of type string or text, not ${filterDefinition.type}`);
  }
  return ['eq', 'not_eq', 'nil', 'not_nil'];
};

export const getAvailableOperatorForFilter = (
  filterDefinition: FilterDefinition | undefined,
  subKey?: string,
): string[] => {
  if (filterDefinition && subKey) return getAvailableOperatorForFilterSubKey(filterDefinition.filterKey, subKey);
  return getAvailableOperatorForFilterKey(filterDefinition);
};

export const isStixObjectTypes = [
  'fromOrToId',
  'fromId',
  'toId',
  'objects',
  'targets',
  'indicates',
  'contextEntityId',
  'id',
];

export const getSelectedOptions = (
  entitiesOptions: OptionValue[],
  filterValues: string[],
  filtersRepresentativesMap: Map<string, FilterRepresentative>,
): OptionValue[] => {
  const mapFilterValues: OptionValue[] = [];
  filterValues.forEach((value: string) => {
    const mapRepresentative = entitiesOptions.find((f) => f.value === value);
    if (mapRepresentative) {
      mapFilterValues.push({
        ...mapRepresentative,
        group: 'Selected',
      });
    } else if (value === SELF_ID) {
      mapFilterValues.push({
        value,
        type: 'instance',
        parentTypes: [],
        group: 'Selected',
        label: SELF_ID_VALUE,
      });
    } else {
      const filterRepresentative = filtersRepresentativesMap.get(value);
      if (filterRepresentative) {
        mapFilterValues.push({
          value,
          type: filterRepresentative?.entity_type || 'deleted',
          parentTypes: [],
          group: 'Selected',
          label: filterRepresentative?.value ?? 'deleted',
          color: filterRepresentative?.color ?? undefined,
        });
      }
    }
  });
  return mapFilterValues.sort((a, b) => a.label.localeCompare(b.label));
};

export const filterOperatorsWithIcon = [
  'lt',
  'lte',
  'gt',
  'gte',
  'nil',
  'not_nil',
  'eq',
  'not_eq',
];

export const convertOperatorToIcon = (operator: string): React.ReactNode => {
  switch (operator) {
    case 'lt':
      return <>&nbsp;&#60;</>;
    case 'lte':
      return <>&nbsp;&#8804;</>;
    case 'gt':
      return <>&nbsp;&#62;</>;
    case 'gte':
      return <>&nbsp;&#8805;</>;
    case 'eq':
      return <>&nbsp;=</>;
    case 'not_eq':
      return <>&nbsp;&#8800;</>;
    default:
      return null;
  }
};

export const extractAllFilters = (filters: FilterGroup): Filter[] => {
  const allFilters: Filter[] = [];
  allFilters.push(...filters.filters);
  filters.filterGroups.forEach((filterGroup) => {
    allFilters.push(...extractAllFilters(filterGroup));
  });
  return allFilters;
};

export const isRegardingOfFilterWarning = (
  filter: Filter,
  observablesTypes: string[],
  filtersRepresentativesMap: Map<string, FilterRepresentative>,
): boolean => {
  if (filter.key === 'regardingOf') {
    const relationshipTypes: string[] = filter.values
      .filter((v) => v.key === 'relationship_type')
      .map((f) => f.values)
      .flat();
    const entitiesIds: string[] = filter.values
      .filter((v) => v.key === 'id')
      .map((f) => f.values)
      .flat();
    const entityTypes = entitiesIds
      .map((id) => filtersRepresentativesMap.get(id)?.entity_type)
      .filter((t) => !!t) as string[];
    
    if (relationshipTypes.includes('targets')
      && entityTypes.some((type) => ['Attack-Pattern', 'Campaign', 'Incident', 'Intrusion-Set', 'Malware', 'Threat-Actor-Individual', 'Threat-Actor-Group'].includes(type))) {
      return true;
    }
    if (relationshipTypes.includes('located-at')
      && entityTypes.some((type) => ['City', 'IPv4-Addr', 'IPv6-Addr'].includes(type))) {
      return true;
    }
    if (relationshipTypes.includes('related-to')
      && entityTypes.some((type) => [...observablesTypes, 'Stix-Cyber-Observable'].includes(type))) {
      return true;
    }
    if (relationshipTypes.includes('indicates')
      && entityTypes.some((type) => ['Indicator'].includes(type))) {
      return true;
    }
  }
  return false;
};

// Simplified filter schema management
export interface FilterDefinition {
  filterKey: string;
  type: string;
  label: string;
  multiple?: boolean;
  subEntityTypes?: string[];
  elementsForFilterValuesSearch?: any[];
  subFilters?: FilterDefinition[];
}

export const useBuildFilterKeysMapFromEntityType = (entityTypes = ['Stix-Core-Object']): Map<string, FilterDefinition> => {
  // In a real implementation, you would get this from your application state
  const filterKeysSchema = new Map<string, Map<string, FilterDefinition>>();
  
  // Return empty map for now - replace with actual implementation
  return new Map();
};

export const useAvailableFilterKeysForEntityTypes = (entityTypes: string[]): string[] => {
  const filterKeysMap = useBuildFilterKeysMapFromEntityType(entityTypes);
  return generateUniqueItemsArray(Array.from(filterKeysMap.keys()));
};

export const removeIdFromFilterGroupObject = (filters?: FilterGroup | null): FilterGroup | undefined => {
  if (!filters) {
    return undefined;
  }
  return {
    mode: filters.mode,
    filters: filters.filters
      .filter((f) => ['nil', 'not_nil'].includes(f.operator ?? 'eq') || f.values.length > 0)
      .map((f) => {
        const newFilter = { ...f };
        delete newFilter.id;
        return newFilter;
      }),
    filterGroups: filters.filterGroups.map((group) => removeIdFromFilterGroupObject(group)) as FilterGroup[],
  };
};

export const removeIdAndIncorrectKeysFromFilterGroupObject = (
  filters: FilterGroup | null | undefined, 
  availableFilterKeys: string[]
): FilterGroup | undefined => {
  if (!filters) {
    return undefined;
  }
  return {
    mode: filters.mode,
    filters: filters.filters
      .filter((f) => availableFilterKeys.includes(f.key))
      .filter((f) => ['nil', 'not_nil'].includes(f.operator ?? 'eq') || f.values.length > 0)
      .map((f) => {
        const newFilter = { ...f };
        delete newFilter.id;
        return newFilter;
      }),
    filterGroups: filters.filterGroups.map((group) => 
      removeIdAndIncorrectKeysFromFilterGroupObject(group, availableFilterKeys)
    ) as FilterGroup[],
  };
};

export const getDefaultFilterObject = (
  filterKey: string,
  filterDefinition?: FilterDefinition,
  values?: FilterValue[],
  mode?: string,
): Filter => {
  return {
    id: uuid(),
    key: filterKey,
    operator: getDefaultOperatorFilter(filterDefinition),
    values: values ?? [],
    mode: mode ?? 'or',
  };
};