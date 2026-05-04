import React, { useState } from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, search, setSearch }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const getCategory = (product) => {
    if (product.for_male === 1 && product.for_female === 1) return 'Both';
    if (product.for_male === 1) return 'Male';
    if (product.for_female === 1) return 'Female';
    return '';
  };

  const filteredProducts = [...products]
    .filter((product) => {
      if (activeFilter === 'All') return true;

      if (activeFilter === 'Male') {
        return product.for_male === 1;
      }

      if (activeFilter === 'Female') {
        return product.for_female === 1;
      }

      if (activeFilter === 'Both') {
        return product.for_male === 1 && product.for_female === 1;
      }

      return true;
    })
    .sort((a, b) => {
      const categoryOrder = {
        Male: 1,
        Female: 2,
        Both: 3
      };

      if (activeFilter === 'All') {
        return categoryOrder[getCategory(a)] - categoryOrder[getCategory(b)];
      }

      return 0;
    });

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search by product name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-buttons">
        <button
          className={activeFilter === 'All' ? 'active-filter' : ''}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>

        <button
          className={activeFilter === 'Male' ? 'active-filter' : ''}
          onClick={() => setActiveFilter('Male')}
        >
          Male
        </button>

        <button
          className={activeFilter === 'Female' ? 'active-filter' : ''}
          onClick={() => setActiveFilter('Female')}
        >
          Female
        </button>

        <button
          className={activeFilter === 'Both' ? 'active-filter' : ''}
          onClick={() => setActiveFilter('Both')}
        >
          Male & Female
        </button>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              activeFilter={activeFilter}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;