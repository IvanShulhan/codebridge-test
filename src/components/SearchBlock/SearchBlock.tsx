import { useState, useEffect, useCallback } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { TextField, Box, InputAdornment } from '@mui/material';
import styles from './SearchBlock.module.scss';
import { Search } from '../icons/Search';

export const SearchBlock = () => {
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(search);

  const appliedQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(searchParams.get('query') || '');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyQuery = useCallback(
    debounce((newQuery: string) => {
      if (newQuery) {
        searchParams.set('query', newQuery);
      } else {
        searchParams.delete('query');
      }

      setSearchParams(searchParams);
    }, 500),
    [searchParams],
  );

  const clearQueryHandler = useCallback(() => {
    searchParams.delete('query');
    setQuery('');
    applyQuery('');
  }, [setQuery, applyQuery, searchParams]);

  useEffect(() => {
    if (search.includes('query')) {
      setQuery(appliedQuery);
      applyQuery(appliedQuery);
    } else {
      clearQueryHandler();
    }
  }, [appliedQuery, applyQuery, clearQueryHandler, search]);

  const changeQueryHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  return (
  <Box className={styles.form}>
    <label 
      htmlFor="text-field" 
      className={styles.label}
    >
      Filter by keywords
    </label>
    <TextField 
      id="text-field"
      onChange={changeQueryHandler}
      className={styles.input}
      value={query}
      placeholder="Key words..." 
      variant="outlined"
      InputProps={{
        classes: {
          root: styles.input,
          focused: styles.focus
        },
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  </Box>
)};