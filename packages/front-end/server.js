const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3002;
const app = express();
app.use(
  cors({
    origin: '*',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: 'X-Requested-With, Content-Type, Authorization',
    methods: 'GET, POST, PATCH, PUT, POST, DELETE, OPTIONS',
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  })
);
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/health', (_, res) => {
    const statusInfo = {
        status: 'ready',
        buildBranch: process.env.BUILD_BRANCH || 'unknown',
        buildRev: process.env.BUILD_REV || 'unknown',
        buildTime: process.env.BUILD_TIME || 'unknown',
        systemTime: new Date().toISOString(),
    }

    return res.status(200).send(JSON.stringify(statusInfo, null, 4))
});
app.get('/*', (req, res) => {
  console.log('Running server');
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(port);
