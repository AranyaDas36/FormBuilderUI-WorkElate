require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

const corsOptions = {
  origin: ['http://localhost:5173', 'https://form-builder-ten-rosy.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/forms', formRoutes);

app.get('/', (req, res) => {
  res.send('Form Builder Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});