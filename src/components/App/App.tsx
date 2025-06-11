import { useState } from 'react';
import useMoviesQuery from '../../hooks/useMoviesQuery';
import Pagination from '../Pagination/Pagination';
import type { Movie } from '../../types/movie';
import css from './App.module.css';

function App() {
  const [query, setQuery] = useState('matrix');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isSuccess } = useMoviesQuery(query, page);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('query') as HTMLInputElement;
    const trimmed = input.value.trim();

    if (!trimmed) return alert('Please enter a movie title.');

    setQuery(trimmed);
    setPage(1);
  };

  return (
    <div className={css.container}>
      <h1>Movie Search</h1>

      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          placeholder="Enter movie title..."
          className={css.input}
          defaultValue={query}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && data.results.length === 0 && <p>No results found for "{query}"</p>}

      {isSuccess && data.results.length > 0 && (
        <>
          <ul className={css.grid}>
            {data.results.map((movie: Movie) => (
              <li key={movie.id} className={css.card}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className={css.image}
                />
                <h3>{movie.title}</h3>
              </li>
            ))}
          </ul>

          {data.total_pages > 1 && (
            <Pagination
              totalPages={data.total_pages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;