import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
headers: {
Authorization: `Bearer ${API_KEY}`,
},
  params: {
    language: 'en-US',
  },
});

export const searchMovies = async (query: string) => {
  const response = await tmdb.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};