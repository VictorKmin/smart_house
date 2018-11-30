const express = require('express');
const router = express.Router();
const lastStatistic = require('../controllers/statistic/lastStatistic');
const fullStatisticForAllTime = require('../controllers/statistic/fullStatistic');
const fullStatisticByDate = require('../controllers/statistic/fullStatisticByDate');

router.get('/', lastStatistic);
router.get('/full', fullStatisticForAllTime);
router.post('/full', fullStatisticByDate);
module.exports = router;