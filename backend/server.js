const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

const projectRoutes = require('./routes/project');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/projects', projectRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
