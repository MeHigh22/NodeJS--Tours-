const express = require('express');

//Que fait-on ici? On importe toutes les fonctions qu'on a dans notre controlleur. 
const tourController = require('./../controllers/tourController')



const router = express.Router();

//L'implementer dans nos routes.
router.route('/').get(tourController.getAllTours).post(tourController.createTour);
router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;