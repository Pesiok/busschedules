const express = require('express');
const compression = require('compression');
const requestController = require('./controllers/requestController');

// config
const PORT = process.env.PORT || 3000;
const PATH_DEV = '/private/app';
const PATH_BUILD = '/public';

// set true to change env to build
// in build env files are served from public folder
const DEV = false;

const app = express();

app.use(compression());

app.use(express.static(__dirname + `${DEV ? PATH_DEV : PATH_BUILD}`));
requestController(app);

app.get('/*', (req, res) => {
  res.sendFile(__dirname + `${DEV ? PATH_DEV : PATH_BUILD}/index.html`);
});

app.listen(PORT);

console.log(`App is online on port ${PORT}. Running on ${DEV ? 'development' : 'build'} environment`);