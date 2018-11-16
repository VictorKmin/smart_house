const express = require('express');
const router = express.Router();
const lastStatistic = require('../controllers/statistic/lastStatistic');
const fullStatistic = require('../controllers/statistic/fullStatistic');

router.get('/', lastStatistic);
router.get('/full', fullStatistic);
module.exports = router;