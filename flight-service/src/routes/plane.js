const express = require('express');
const router = express.Router();

const planeController = require('../controllers/plane');

router.post('/', planeController.createPlane);
router.get('/', planeController.getAllPlanes);
router.get('/:id', planeController.getPlaneById);
router.put('/:id', planeController.updatePlane);
router.delete('/:id', planeController.deletePlane);

module.exports = router;
