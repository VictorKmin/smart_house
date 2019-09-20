const chalk = require('chalk');

const postgres = require('../dataBase').getInstance();
const mainController = require('./dataBase/dataBaseController');
const {getOneRoomStat, lastRoomStat} = require('./statistic');

module.exports = async (req, res) => {
    try {
        const socket = req.socket;
        const RoomInfo = postgres.getModel('RoomInfo');
        const {room_id} = req.body;

        console.log(chalk.green('Request from module'));
        console.log(req.body);

        await mainController(req.body);
        const {temp} = await RoomInfo.findByPk(room_id);

        const oneRoomStat = await getOneRoomStat(room_id);

        await socket.emit('updateChart', oneRoomStat);

        socket.emit('rooms', await lastRoomStat());

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
