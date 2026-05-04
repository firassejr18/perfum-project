import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [view, setView] = useState('list');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchProducts = async (query = '') => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products?search=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if (view === 'list') {
      fetchProducts(search);
    }
  }, [view, search]);

  return (
  <div className="container">
    <header>
      <div className="brand-header">
      <img src={`${import.meta.env.VITE_API_URL}/uploads/zf_perfume_logo.svg`} alt="Z&F Logo" className="site-logo"   />
      <div className="brand-text">
        <h2 className="brand-name">Z&F Perfume</h2>
        <p className="brand-subtitle">- Collection -</p>
      </div>
    </div>
      <Navbar setView={setView} />
    </header>
    

      {view === 'add' ? (
        <ProductForm
          onProductAdded={() => {
            setView('list');
            fetchProducts();
          }}
        />
      ) : (
        <ProductList
          products={products}
          search={search}
          setSearch={setSearch}
        />
      )}
    </div>
  );
}

export default App;