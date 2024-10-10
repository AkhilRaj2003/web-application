// components/SearchPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SearchPage.css'; // Import the CSS file for the search page styling

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-pagel">
      <h1>Product Search</h1>

      {/* Link to the Favorites Page */}
      <Link to="/favorites">
        <button className="favorites-buttonl">
          Go to Favorites
        </button>
      </Link>

      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-inputl"
      />

      <div className="product-listl">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-cardl">
            <Link to={`/product/${product.id}`} className="product-linkl">
              <img src={product.image} alt={product.title} className="product-imagel" />
              <h2 className="product-titlel">{product.title}</h2>
              <p className="product-pricel">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}