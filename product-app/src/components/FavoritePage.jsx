import React from 'react';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const [favorites, setFavorites] = React.useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Favorite Products</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((product) => (
            <li key={product.id}>
              <Link to={`/product/${product.id}`}>{product.title}</Link>
              <button onClick={() => removeFavorite(product.id)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite products added.</p>
      )}
    </div>
  );
}

export default FavoritesPage;

