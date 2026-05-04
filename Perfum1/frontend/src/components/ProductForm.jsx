import React, { useRef, useState } from 'react';

function ProductForm({ onProductAdded }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
    forMale: false,
    forFemale: false
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const maleRef = useRef(null);
  const femaleRef = useRef(null);
  const imageRef = useRef(null);
  const submitRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === 'file') {
      setForm({ ...form, image: files[0] });
    } else if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (nextRef?.current) nextRef.current.focus();
    }
  };

  const handleTextareaKeyDown = (e, nextRef) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (nextRef?.current) nextRef.current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.description || !form.price || !form.image) {
      setError('All fields are required');
      return;
    }

    if (!form.forMale && !form.forFemale) {
      setError('Select Male or Female or both');
      return;
    }

    if (form.name.trim().length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }

    if (Number(form.price) <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('image', form.image);
    formData.append('forMale', form.forMale);
    formData.append('forFemale', form.forFemale);

    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/products', {
        method: 'POST',
        body: formData
      });

      let data = {};
      try {
        data = await response.json();
      } catch (error) {
        data = {};
      }

      if (!response.ok) {
        setError(data.message || 'Upload failed');
        return;
      }

      setSuccess('Product added successfully');
      setForm({
        name: '',
        description: '',
        price: '',
        image: null,
        forMale: false,
        forFemale: false
      });

      if (imageRef.current) imageRef.current.value = '';
      if (nameRef.current) nameRef.current.focus();

      onProductAdded?.();
    } catch (error) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        ref={nameRef}
        type="text"
        name="name"
        placeholder="Perfume name"
        value={form.name}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, descriptionRef)}
      />

      <textarea
        ref={descriptionRef}
        name="description"
        placeholder="Write a short perfume description"
        value={form.description}
        onChange={handleChange}
        onKeyDown={(e) => handleTextareaKeyDown(e, priceRef)}
      />

      <input
        ref={priceRef}
        type="number"
        name="price"
        placeholder="Price in DA"
        value={form.price}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, maleRef)}
      />

      <div className="gender-box">
        <label className="checkbox-item">
          <input
            ref={maleRef}
            type="checkbox"
            name="forMale"
            checked={form.forMale}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, femaleRef)}
          />
          Male
        </label>

        <label className="checkbox-item">
          <input
            ref={femaleRef}
            type="checkbox"
            name="forFemale"
            checked={form.forFemale}
            onChange={handleChange}
            onKeyDown={(e) => handleKeyDown(e, imageRef)}
          />
          Female
        </label>
      </div>
      
      <input
        ref={imageRef}
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, submitRef)}
      />

      <p className="upload-note">
  Please upload a high-quality perfume image. For a better result, use a photo with a clean or already removed background.
</p>

      <button ref={submitRef} type="submit">
        Add Product
      </button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
}

export default ProductForm;