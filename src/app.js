const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const authRoutes = require('../src/routes/authRoutes');
const userRoutes = require('../src/routes/userRoutes');
const projectRoutes = require('../src/routes/projectRoutes');
const projectMemberRoutes = require('../src/routes/projectMemberRoutes');
const budgetRoutes = require('../src/routes/budgetRoutes');
const expenseRoutes = require('../src/routes/expenseRoutes')
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
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes)
app.use('/api', projectMemberRoutes);
app.use('/api', budgetRoutes);
app.use('/api', expenseRoutes)
// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Project Konstruktor API running 🚀' });
});

module.exports = app;
