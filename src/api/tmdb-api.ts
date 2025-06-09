import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`, 
  },
  params: {
    language: 'en-US',
  },
});
