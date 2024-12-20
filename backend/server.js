const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const householdRoutes = require('./routes/householdRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/households', householdRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
