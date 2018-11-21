const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const mainController = require('../controllers/skyNetComandCenter');

router.get('/', async (req, res) => {
    try {
        let body = JSON.parse(req.body);
        console.log('__________________________');
        console.log(body);
        console.log('__________________________');
        mainController(body);

        res.json({
            success: true,
            statusCode: 200,
            message: 'OK'
        })
    }
    catch (e) {
        res.json({
            success: false,
            message: chalk.bgRed(e.message)
        })
    }
});

router.post('/', function (req, res) {
    try {
        console.log(chalk.bgGreen('POST'));
        console.log(chalk.bgGreen('POST'));
        mainController(req.body);
        res.json({message: 'OK'})
    } catch (e) {
        console.log(chalk.red(e.message));
        res.json(e.message)
    }

});

module.exports = router;