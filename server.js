const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const app = express();
require('dotenv').config();

connectDB();


app.use(express.json());
app.use('/uploads', express.static('uploads'));  


app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);


app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
