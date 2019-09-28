const router = require('express').Router();

const {moving} = require('../controllers');

router.post('/', moving.detectMoving);
router.post('/off', moving.turnOffDetector);
router.post('/on', moving.turnOnDetector);

module.exports = router;
