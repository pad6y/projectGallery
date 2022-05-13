const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/admin', userRoutes);
app.use('/api/projects', projectRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
