const express = require('express');
const app = express();
const requestController = require('./controllers/requestController');

const port = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public/app'));

requestController(app);
app.listen(port);