import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/movieService';
import type { MoviesResponse } from '../types/movie';

export default function useMoviesQuery(query: string, page: number) {
  return useQuery<MoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData: any) => previousData,

  });
}