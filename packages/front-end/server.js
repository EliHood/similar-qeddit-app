const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3002;
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3002',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: 'X-Requested-With, Content-Type, Authorization',
    methods: 'GET, POST, PATCH, PUT, POST, DELETE, OPTIONS',
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  })
);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  console.log('this works');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(port, '127.0.0.1');
