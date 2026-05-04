const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const productRoutes = require('./routes/products');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Perfume Catalog API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});