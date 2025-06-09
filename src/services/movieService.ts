import { tmdb } from '../api/tmdb-api';
import type { MoviesResponse } from '../types/movie';

export const fetchMovies = async (query: string, page: number): Promise<MoviesResponse> => {
  const response = await tmdb.get<MoviesResponse>('/search/movie', {
    params: {
      query,
      page,
    },
  });

  return response.data;
};
