import { toast } from 'react-hot-toast';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const formAction = (formData: FormData) => {
    const query = formData.get('query')?.toString().trim();

    if (!query) {
      toast.error('Будь ласка, введіть пошуковий запит');
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={formAction}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Пошук фільмів..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Пошук
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
