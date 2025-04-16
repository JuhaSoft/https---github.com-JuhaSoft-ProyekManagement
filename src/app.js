const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const authRoutes = require('../src/routes/authRoutes');
const userRoutes = require('../src/routes/userRoutes');
require('dotenv').config();

const app = express();

// Middlewares global
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());

// Routes untuk user
// app.js atau di bawah middleware global
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next(); // Melanjutkan ke handler berikutnya
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes)
// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Project Konstruktor API running 🚀' });
});

module.exports = app;
