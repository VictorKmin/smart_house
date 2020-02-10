const router = require('express').Router();

const {botController} = require('../controllers');

router.get('/rooms', botController.getRoomsInfo);

module.exports = router;
