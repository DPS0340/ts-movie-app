import React, { useCallback } from 'react';
import './App.css';
import Header from './components/Header';
import Movie from './components/Movie';
import Search from './components/Search';
import { IMovie } from './types/movie';
import useFetch from './hooks/useFetch';
import { defaultUrl, generateSearchUrl } from './api/urls';

const App = (): JSX.Element => {
  const { setRequest, response, loading, errorMessage } = useFetch<IMovie[]>(
    defaultUrl,
  );

  const search = useCallback(
    (searchValue: string) => setRequest(generateSearchUrl(searchValue)),
    [setRequest],
  );

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          response?.map((movie: IMovie, index: number) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
