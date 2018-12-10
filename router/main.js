const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const mainController = require('../controllers/skyNetComandCenter');

//
// router.get('/', (req, res) => {
//     try {
//         console.log(req.body);
//
//         mainController(req.body);
//         res.json({
//             success: true,
//             statusCode: 200,
//             message: 'OK'
//         })
//     }
//     catch (e) {
//         console.log(chalk.bgRed(e.message));
//         res.json({
//             success: false,
//             message: e.message
//         })
//     }
// });

router.post('/', (req, res) => {
    try {
        console.log(chalk.green('Request from module'));
        console.log(req.body);

        mainController(req.body);
        res.json({
            success: true,
            statusCode: 200,
            message: 'OK'
        })
    } catch (e) {
        console.log(chalk.bgRed(e.message));
        res.json({
            success: false,
            message: e.message
        })
    }
});

module.exports = router;