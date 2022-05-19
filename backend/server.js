const path = require('path');
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
//deployment config setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.use('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use('/api/admin', userRoutes);
app.use('/api/projects', projectRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
