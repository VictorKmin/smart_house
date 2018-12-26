const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const mainController = require('../controllers/skyNetComandCenter');
const postgres = new require('../dataBase').getInstance();
postgres.setModels();


const getStat = require('../helpers/stat');

// router.get('/', (req, res) => {
// try {
//     console.log(req.body);
//
//     mainController(req.body);
//     res.json({
//         success: true,
//         statusCode: 200,
//         message: 'OK'
//     })
// }
// catch (e) {
//     console.log(chalk.bgRed(e.message));
//     res.json({
//         success: false,
//         message: e.message
//     })
// }
// });

router.post('/', async (req, res) => {
    try {
        const socket = req.socket;
        const RoomInfo = postgres.getModel('RoomInfo');
        if (!RoomInfo) throw new Error('Cant connect to DataBase. Code: 1');
        console.log(chalk.green('Request from module'));
        console.log(req.body);
        const {room_id} = req.body;
        if (!room_id) throw new Error(" Bad response from module. Code: 4");
        await mainController(req.body);
        const {temp} = await RoomInfo.findByPk(room_id);

        const rooms = await getStat();
        socket.emit('rooms', rooms);

        res.json({
            success: true,
            statusCode: 200,
            message: temp
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