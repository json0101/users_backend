const express = require('express');
const app = express();
app.use(require('./users/user'));

module.exports = app;