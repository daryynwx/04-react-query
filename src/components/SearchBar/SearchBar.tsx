import { type FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = input.trim();

    if (!query) {
      toast.error('Будь ласка, введіть пошуковий запит');
      return;
    }

    onSearch(query);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        name="query"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
