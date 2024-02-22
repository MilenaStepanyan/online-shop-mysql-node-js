const express = require('express');
const app = express();
const port = 5001;


app.get('/api', (req, res) => {
  res.send('Hello from Express API!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});