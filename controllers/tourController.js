const fs = require('fs');
//La méthode JSON.parse() analyse une chaîne de caractères JSON et construit la valeur JavaScript ou l'objet décrit par cette chaîne.
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//A quoi vont nous servir les middleware param? Ne pas repeter du code. dans ce cas-ci, vérifier si l'id existe ou pas et sinon retourner 404.
exports.checkID = (req, res, next, val) => {
  console.log(`Your Id IS : ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  next();
}

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    //Pourquoi Tours : Tours? Le premier parce que c'est le endpoint api/v1/tours <- Et le deuxième tours est pour la data
    data: {
      tours,
    },
  });
};

//On va créer un nouveau ID et un nouveau Tour.
//La méthode Object.assign() est utilisée afin de copier les valeurs de toutes les propriétés directes (non héritées) d'un objet qui sont énumérables sur un autre objet cible. Cette méthode renvoie l'objet cible.
//Status 201 est pour la création
//On va écrire dans le fichier de façon assync pour ne pas bloquer l'eventLoop.
//On peut introduire la data directement dans notre "databse" tel quel, donc on doit utiliser JSON.stringify, on va faire un callback de err dans lequel on envoie une reponse 201, qui elle va envoyer avec json le status de succes, et notre data vers la fichier précisé et notre nouvelle entrée qui est newTour.

//Ouverture du serveur

//PUT and PATCH. Update la data. Ici vu qu'on utilise un fichier json dans un fichier, on ne peut pas update la data, mais si on essaie avec postman, cela fonctionne et le log se fait.

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//Pourquoi des : devant id? Pour sélectionner la variable,( ça peut être n'importe quoi (var, x)) Req.Params va nous permettre d'assigner la valeur à notre variable qu'on définit (On peut en ajouter plusieurs séparés par un / (Par exemple /:x ou /:y)) Pour le rendre optionnel, ajouter un ? à la fin.
//Que fait la méthode find?
//La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument. Sinon, la valeur undefined est renvoyée.

//Quand on multiplie un string par un number dans JS, par un autre nombre, va convertir notre id en nombre.

//On va faire une condition qui elle va nous permettre de renvoyer une page 404 si l'id est plus grand que la longueur du array JSON
//   if (id > tours.length)

//On peut aussi utiliser !tour pour checker si la const existe.

//Va retourner un array si la conditon est true. Va looper dans les req.params et chercher un match à l'élement

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    //Pourquoi Tours : Tours? Le premier parce que c'est le endpoint api/v1/tours <- Et le deuxième tours est pour la data
    data: {
      tour,
    },
  });
};

exports.updateTour = (req, res) => {
  
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here.>' } });
};

exports.deleteTour = (req, res) => {
  
  res
    //204 C'est la suppression comme statut
    .status(204)
    .json({ status: 'success', data: null });
};
