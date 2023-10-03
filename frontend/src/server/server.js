const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const winstonLogger = require('./winstonLogger');

const PORT = 3020

app.use(morgan('combined', { stream: winstonLogger.stream }))

app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT);