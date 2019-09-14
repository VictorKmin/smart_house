const chalk = require('chalk');

const postgres = require('../dataBase').getInstance();
const mainController = require('./dataBaseController');
const getOneRoomStat = require('./statistic/getOneRoomStat');
const getRooms = require('./statistic/lastRoomStat');

module.exports = async (req, res) => {
    try {
        const socket = req.socket;
        const RoomInfo = postgres.getModel('RoomInfo');
        if (!RoomInfo) throw new Error('Cant connect to DataBase. Code: 1');
        console.log(chalk.green('Request from module'));
        console.log(req.body);
        const {room_id} = req.body;

        await mainController(req.body);
        const {temp} = await RoomInfo.findByPk(room_id);

        const oneRoomStat = await getOneRoomStat(room_id);
        await socket.emit('updateChart', oneRoomStat);
        socket.emit('rooms', await getRooms());

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