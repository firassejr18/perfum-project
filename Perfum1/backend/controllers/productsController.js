const db = require('../db');

const getProducts = (req, res) => {
  const { search } = req.query;

  let sql = 'SELECT * FROM products ORDER BY id DESC';
  let params = [];

  if (search && search.trim() !== '') {
    const searchText = search.trim();

    sql = `
      SELECT * FROM products
      WHERE name LIKE ?
      ORDER BY
        CASE WHEN name LIKE ? THEN 0 ELSE 1 END,
        name ASC
    `;
    params = [`%${searchText}%`, `${searchText}%`];
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Fetch products error:', err.message);
      return res.status(500).json({ message: 'Error fetching products' });
    }

    res.status(200).json(results);
  });
};

const addProduct = (req, res) => {
  const { name, description, price, forMale, forFemale } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({
      message: 'Name, description, and price are required'
    });
  }

  if (name.trim().length < 2) {
    return res.status(400).json({ message: 'Name must be at least 2 characters' });
  }

  if (Number(price) <= 0) {
    return res.status(400).json({ message: 'Price must be greater than 0' });
  }

  const maleValue = forMale === 'true' || forMale === true ? 1 : 0;
  const femaleValue = forFemale === 'true' || forFemale === true ? 1 : 0;

  if (maleValue === 0 && femaleValue === 0) {
    return res.status(400).json({
      message: 'Select at least one option: Male or Female'
    });
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const imagePath = `/uploads/${req.file.filename}`;

  const sql = `
    INSERT INTO products (name, description, price, image, for_male, for_female)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name.trim(), description.trim(), price, imagePath, maleValue, femaleValue],
    (err, result) => {
      if (err) {
        console.error('Add product error:', err.message);
        return res.status(500).json({ message: 'Error adding product' });
      }

      res.status(201).json({
        message: 'Product added successfully',
        id: result.insertId
      });
    }
  );
};

module.exports = {
  getProducts,
  addProduct
};