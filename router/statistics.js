const express = require('express');
const router = express.Router();
const lastStatistic = require('../controllers/statistic/lastStatistic');
const fullStatisticByDate = require('../controllers/statistic/fullStatisticByDate');

router.get('/', lastStatistic);
router.post('/full', fullStatisticByDate);
module.exports = router;