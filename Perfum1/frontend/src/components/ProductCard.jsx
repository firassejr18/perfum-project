import React from 'react';
import fragranticaLinks from '../data/fragranticaLinks';

function ProductCard({ product, activeFilter }) {
  let category = '';

  const isUnisex = product.for_male === 1 && product.for_female === 1;

  if (isUnisex) {
    if (activeFilter === 'Male') {
      category = 'Male';
    } else if (activeFilter === 'Female') {
      category = 'Female';
    } else {
      category = 'Male & Female';
    }
  } else if (product.for_male === 1) {
    category = 'Male';
  } else if (product.for_female === 1) {
    category = 'Female';
  }

  const normalizeName = (name) => {
    return String(name || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  };

  const normalizedFragranticaLinks = Object.fromEntries(
  Object.entries(fragranticaLinks).map(([name, url]) => [
    normalizeName(name),
    url
  ])
);

  const handleFragrantica = (e) => {
    e.stopPropagation(); // prevents the card click from firing too
    const key = normalizeName(product.name);
    const exactUrl = normalizedFragranticaLinks[key];

    if (exactUrl) {
      window.open(exactUrl, '_blank');
    } else {
      const query = encodeURIComponent(product.name);
      window.open(`https://www.fragrantica.fr/search/?query=${query}`, '_blank');
    }
  };

  const handleOrder = () => {
    const FORM_BASE = "https://docs.google.com/forms/d/e/1FAIpQLSdCroTj72j6g2m1jkFCc_o9zMeE1wuGOjlt0xNYZoU-yN7GCw/viewform";
    const PERFUME_FIELD = "entry.1511781997"; 
    const url = `${FORM_BASE}?usp=pp_url&${PERFUME_FIELD}=${encodeURIComponent(product.name)}`;
    window.open(url, "_blank");
  };
  

  return (
    <div className="perfume-card" style={{ cursor: "pointer" }}>
      <div className="perfume-image-box">
        <img
          src={`${import.meta.env.VITE_API_URL}${product.image}`}
          alt={product.name}
          className="perfume-image"
          loading="lazy"
        />
        <span className="perfume-badge">{category}</span>
      </div>

      <div className="perfume-card-content">
        <h3 className="perfume-title">{product.name}</h3>
        <p className="perfume-description">{product.description}</p>

        <div className="perfume-card-footer">
          <span className="perfume-price">{product.price} DA</span>
          <span className="perfume-link-text" onClick={handleFragrantica}>View details</span>
        </div>
      </div>

      <button className="order-btn" onClick={handleOrder}>🛒 Order Now</button>
    </div>
  );
}

export default ProductCard;