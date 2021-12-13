const express = require('express');

//Que fait-on ici? On importe toutes les fonctions qu'on a dans notre controlleur. 
const tourController = require('./../controllers/tourController')



const router = express.Router();

router.param('id', tourController.checkID);

//L'implementer dans nos routes.
router.route('/').get(tourController.getAllTours).post(tourController.checkBody ,tourController.createTour);

router.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.deleteTour);

module.exports = router;
