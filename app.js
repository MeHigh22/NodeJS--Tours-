//Have all your configuration in an app.js file
//On va aller chercher le module express et fs
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require("./routes/tourRoutes")
const userRouter = require("./routes/userRoutes")

//Creates an express application
const app = express();

//MIDDLWARE

//It stand between the request and the response. The data from the body is added to the request object.
app.use(express.json());
//Middleware externe installé avec NPM
app.use(morgan('dev'));

//Troisieme argument pour le middleware(On peut l'appeler comme on veut) S'applique sur chaque requete. On peut avoir un nombre infini de middleware
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

//Que fait-on ici? On va créer un autre middleware pour nous spécifier la date de maintenant. on va le déclarer comme  req.requestTime et on va utiliser new Date().toISOString() pour avoir la date dans un string lisible.

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});



//On va utiliser les Routers après la  définition des routes. Mounting des routes ici.

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//SERVER
const port = 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
