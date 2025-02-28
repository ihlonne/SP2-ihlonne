import { useEffect, useState } from 'react';
import { FavoritesContext } from './FavoritesContext';
import PropTypes from 'prop-types';

// Ensure that favorites is stored properly
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (listingId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(listingId)) {
        return prevFavorites.filter((id) => id !== listingId);
      } else {
        return [...prevFavorites, listingId];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
