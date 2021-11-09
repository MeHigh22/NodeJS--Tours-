const app = require('./app');

//Ce qui a lien avec le serveur, on met tout dedans, tout le contenu Express va dans App.js

//SERVER
const port = 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

