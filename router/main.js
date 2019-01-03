const chalk = require('chalk');
const postgres = new require('../dataBase').getInstance();
postgres.setModels();
const mainController = require('../controllers/skyNetComandCenter');
const getStat = require('../controllers/statistic/lastRoomStat');

module.exports = async (req, res) => {
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

        const allRoomsStat = await getStat();
        socket.emit('rooms', allRoomsStat);

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
};