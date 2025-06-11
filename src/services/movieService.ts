import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  page: number;
  total_results: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MoviesResponse> => {
  const response = await axios.get<MoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        query,
        page,
      },
    }
  );
  return response.data;
};
