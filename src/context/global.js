import React, { createContext, useState, useEffect } from "react";
import { getDiscoveryMovies } from "../actions/movies";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [loadingDiscoverMovies, setLoadingDiscoverMovies] = useState(true);
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [discoverMoviesError, setDiscoverMoviesError] = useState(null);

  useEffect(() => {
    loadDiscoverMovies();
  }, []);

  const loadDiscoverMovies = async () => {
    try {
      const { results } = await getDiscoveryMovies();
      setDiscoverMovies(results);
    } catch (err) {
      setDiscoverMoviesError(err);
    }

    setLoadingDiscoverMovies(false);
  };

  return (
    <GlobalContext.Provider
      value={{ loadingDiscoverMovies, discoverMovies, discoverMoviesError }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalConsumer = GlobalContext.Consumer;

export default GlobalContext;
