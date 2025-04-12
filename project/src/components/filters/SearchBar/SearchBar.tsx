import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  delay?: number;
  className?: string;
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = 'Search...', 
  delay = 300,
  className = ''
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  return (
    <div className={`${styles.container} ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.input}
      />
      {searchTerm && (
        <button 
          onClick={() => setSearchTerm('')} 
          className={styles.clearButton}
          aria-label="Clear search"
        >
          &times;
        </button>
      )}
    </div>
  );
};