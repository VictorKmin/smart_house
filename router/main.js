const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const mainController = require('../controllers/skyNetComandCenter');

router.get('/', async (req, res) => {
    try {
        mainController(req.body);

        res.json({
            success: true,
            statusCode: 200,
            message: 'OK'
        })
    }
    catch
        (e) {
        res.json({
            success: false,
            message: chalk.bgRed(e.message)
        })
    }
});

module.exports = router;