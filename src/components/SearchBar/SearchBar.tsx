import { type FormEvent, useState } from 'react';
import css from './SearchBar.module.css';

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.input}
        type="text"
        placeholder="Пошук фільмів..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className={css.button} type="submit">
        Пошук
      </button>
    </form>
  );
}

export default SearchBar;
