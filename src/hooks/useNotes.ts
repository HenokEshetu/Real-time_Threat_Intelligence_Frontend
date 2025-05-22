import { useQuery, useMutation } from '@apollo/client';
import { GET_NOTE, SEARCH_NOTES } from '../graphql/note/queries';
import {
  CREATE_NOTE,
  UPDATE_NOTE,
  DELETE_NOTE
} from '../graphql/note/mutations';
import { Note, NoteSearchResult } from '../types/note';

// Fetch a single note by ID
export function useNote(id: string) {
  const { data, loading, error } = useQuery<{ note: Note }>(GET_NOTE, {
    variables: { id },
    skip: !id,
  });
  return {
    note: data?.note,
    loading,
    error,
  };
}

// Fetch notes with filters, pagination, and fetchMore
export const useNotes = ({
  filters = {},
  page = 1,
  pageSize = 10,
}: {
  filters?: Record<string, any>;
  page?: number;
  pageSize?: number;
}) => {
  const { data, loading, error, fetchMore } = useQuery<{ searchNotes: NoteSearchResult }>(
    SEARCH_NOTES,
    {
      variables: { filters, page, pageSize },
      notifyOnNetworkStatusChange: true,
    }
  );

  const notes = data?.searchNotes?.results || [];
  const total = data?.searchNotes?.total || 0;

  const loadMore = () => {
    fetchMore({
      variables: { filters, page: page + 1, pageSize },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          searchNotes: {
            ...fetchMoreResult.searchNotes,
            results: [
              ...(prev?.searchNotes?.results || []),
              ...(fetchMoreResult.searchNotes?.results || []),
            ],
          },
        };
      },
    });
  };

  return {
    notes,
    loading,
    error,
    loadMore,
    total,
    hasMore: notes.length === pageSize,
  };
};

// Mutation hooks for notes
export const useCreateNote = () => useMutation(CREATE_NOTE);
export const useUpdateNote = () => useMutation(UPDATE_NOTE);
export const useDeleteNote = () => useMutation(DELETE_NOTE);
