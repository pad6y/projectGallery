const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
