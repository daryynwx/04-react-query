import axios from 'axios';
import type { MoviesResponse } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

export const fetchMovies = async (query: string, page: number): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(API_URL, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  return response.data;
};
