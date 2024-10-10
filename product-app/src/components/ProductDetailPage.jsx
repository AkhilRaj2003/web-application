import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css'; // Import the CSS for styling

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  const isFavorite = favorites.some(favorite => favorite.id === parseInt(id));

  const toggleFavorite = () => {
    let updatedFavorites;
    if (isFavorite) {
      updatedFavorites = favorites.filter(fav => fav.id !== parseInt(id));
    } else {
      updatedFavorites = [...favorites, product];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleGoToFavorites = () => {
    navigate('/favorites');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">Back to Search</Link>
      <h1 className="product-title">{product.title}</h1>
      <div className="product-info">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-details">
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: <strong>${product.price}</strong></p>

          {/* Toggle between Add/Remove Favorite or Go to Favorites */}
          {isFavorite ? (
            <button onClick={handleGoToFavorites} className="favorite-button">
              Go to favorites
            </button>
          ) : (
            <button onClick={toggleFavorite} className="favorite-button">
              Add to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
