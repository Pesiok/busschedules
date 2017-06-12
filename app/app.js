const express = require('express');
requestController = require('./controllers/requestController')
port = process.env.PORT || 3000,
directory = 'docs';

const app = express();

app.use(express.static(__dirname + `/public/${directory}`));
requestController(app);

app.get('/*', (req, res) => {
  res.sendFile(__dirname + `/public/${directory}/index.html`);
});

app.listen(port);

console.log(`App is online on port ${port}`);