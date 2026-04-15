import { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('ugc_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  const save = (list) => {
    setWatchlist(list);
    localStorage.setItem('ugc_watchlist', JSON.stringify(list));
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      save([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (movieId) => {
    save(watchlist.filter((m) => m.id !== movieId));
  };

  const isInWatchlist = (movieId) => watchlist.some((m) => m.id === movieId);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);
