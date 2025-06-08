import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { fetchMovies } from '../../services/movieService';
import type { Movie, MoviesResponse } from '../../types/movie';
import css from './App.module.css';

function App() {
  const [query, setQuery] = useState('matrix');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery<MoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    staleTime: 1000 * 60 * 5, // 5 хвилин кешу
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('query') as HTMLInputElement;
    setQuery(input.value.trim());
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className={css.container}>
      <h1>Movie Search</h1>

      <form onSubmit={handleSubmit} className={css.form}>
        <input type="text" name="query" placeholder="Enter movie title..." className={css.input} />
        <button type="submit" className={css.button}>Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading movies. Try again later.</p>}

      {isSuccess && data.results.length === 0 && <p>No movies found for "{query}".</p>}

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
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
