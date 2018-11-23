const express = require('express');
const router = express.Router();
const setTemperature = require('../../controllers/temperature/setTemperature');

router.get('/settemp', setTemperature);
module.exports = router;