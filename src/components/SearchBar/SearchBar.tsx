import { type FormEvent } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  action: (formData: FormData) => void;
}

function SearchBar({ action }: SearchBarProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const query = formData.get('query')?.toString().trim();

    if (!query) {
      toast.error('Будь ласка, введіть пошуковий запит');
      return;
    }

    action(formData);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
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
