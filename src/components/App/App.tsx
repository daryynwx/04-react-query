import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { type MoviesResponse } from '../../services/movieService';
import type { Movie } from '../../types/movie';

import css from './App.module.css';

const fetchMovies = async (query: string, page: number) => {
  const response = await axios.get<MoviesResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query,
        page,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data;
};

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, error, isSuccess } = useQuery<MoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    placeholderData: (prevData) => prevData,
  });

  const handleSearch = (formData: FormData) => {
    const newQuery = formData.get('query')?.toString().trim() || '';

    if (!newQuery) {
      toast.error('Будь ласка, введіть пошуковий запит');
      return;
    }

    if (newQuery === query) return;

    setQuery(newQuery);
    setPage(1);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.container}>
      <Toaster />
      <h1 className={css.title}>Movie Search</h1>

      <SearchBar action={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error.message} />}

      {isSuccess && data.results.length === 0 && (
        toast.error(`Фільми за запитом "${query}" не знайдено`)
      )}

      {isSuccess && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={handleMovieSelect} />
          {data.total_pages > 1 && (
            <Pagination
              totalPages={data.total_pages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
