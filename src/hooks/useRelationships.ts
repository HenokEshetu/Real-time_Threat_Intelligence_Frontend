import { useQuery } from '@apollo/client';
import {
  GET_RELATIONSHIP_OBJECT,
  SEARCH_RELATIONSHIP,
} from '@/graphql/relationship';
import { StixRelationship } from '@/types/relationship';

import * as React from 'react';

export const useRelationships = ({
  filter,
  page,
  pageSize,
}: {
  filter?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const {
    data: relData,
    loading: relLoading,
    error: relError,
    fetchMore,
  } = useQuery(SEARCH_RELATIONSHIP, {
    variables: { filers: filter, page: page, pageSize: pageSize },
    notifyOnNetworkStatusChange: true,
  });

  const ids = React.useMemo(() => {
    if (!relData) return [];
    return relData.searchRelationships.results
      .flatMap((r: StixRelationship) => [r.source_ref, r.target_ref])
      .filter((id: string, i: number, arr: string[]) => arr.indexOf(id) === i);
  }, [relData]);

  const {
    data: objData,
    loading: objLoading,
    error: objError,
  } = useQuery(GET_RELATIONSHIP_OBJECT, {
    variables: { ids: ids },
    skip: ids.length === 0,             // don’t fire until we have IDs
    notifyOnNetworkStatusChange: true,
  });

  const objectsById = React.useMemo(() => {
    if (!objData) return {};
    return objData.getObjectsByIDs.reduce(
      (map: Record<string, any>, obj: any) => {
        map[obj.id] = obj;
        return map;
      },
      {}
    );
  }, [objData]);

  const relationshipsWithNames = React.useMemo(() => {
    if (!relData || !objData) return [];
    return relData.searchRelationships.results.map((r: StixRelationship) => ({
      ...r,
      source: objectsById[r.source_ref],
      target: objectsById[r.target_ref],
    }));
  }, [relData, objectsById]);

  const total = relData?.searchRelationships?.total;

  return {
    relationships: relationshipsWithNames,
    total: total,
    loading: relLoading || objLoading,
    error: relError || objError,
    loadMore: () =>
      fetchMore({
        variables: { filter, page: page! + 1, pageSize },
      }),
  };
};

export const useRelationshipObjects = (ids: string[]) => {
  const { data, loading, error } = useQuery(GET_RELATIONSHIP_OBJECT, {
    variables: {
      ids: ids,
    },
  });

  const objects = data?.getObjectsByIDs || [];

  console.log('objects', objects);

  return {
    objects,
    loading,
    error,
  };
};
