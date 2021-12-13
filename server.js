const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

//Ce qui a lien avec le serveur, on met tout dedans, tout le contenu Express va dans App.js

console.log(process.env);
//SERVER

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
