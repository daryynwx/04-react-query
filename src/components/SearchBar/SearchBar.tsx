import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  action: (formData: FormData) => void;
}

function SearchBar({ action }: SearchBarProps) {
  return (
    <form
      className={css.form}
      action={(formData) => {
        const query = formData.get('query')?.toString().trim();

        if (!query) {
          toast.error('Будь ласка, введіть пошуковий запит');
          return;
        }

        action(formData);
      }}
    >
      <input
        className={css.input}
        type="text"
        name="query"
        placeholder="Пошук фільмів..."
        autoComplete="off"
      />
      <button className={css.button} type="submit">
        Пошук
      </button>
    </form>
  );
}

export default SearchBar;
