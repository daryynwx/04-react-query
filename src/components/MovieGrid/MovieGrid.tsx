import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

export interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li
          key={movie.id}
          className={css.card}
          onClick={() => onSelect(movie)}
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className={css.noImage}>No Image</div>
          )}
          <h3>{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
}

export default MovieGrid;
