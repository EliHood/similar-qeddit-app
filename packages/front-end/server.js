const express = require('express');
const path = require('path');

const port = process.env.PORT || 3002;
const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  console.log('this works');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(port, '127.0.0.1');
