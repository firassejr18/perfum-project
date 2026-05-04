import React from 'react';

function Navbar({ setView }) {
  return (
    <div className="navbar">
      <button onClick={() => setView('list')}>View all products</button>
      <button onClick={() => setView('add')}>Add a product</button>
    </div>
  );
}

export default Navbar;