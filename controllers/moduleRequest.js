const chalk = require('chalk');

const mariadb = require('../dataBase').getInstance();
const mainController = require('./dataBase/dataBaseController');
const {getOneRoomStat, lastRoomStat} = require('./statistic');

module.exports = async (req, res) => {
    try {
        const socket = req.socket;
        const RoomInfo = mariadb.getModel('RoomInfo');
        const {room_id} = req.body;

        console.log(chalk.green('Request from module'));

        await mainController(req.body);
        const {temp} = await RoomInfo.findByPk(room_id);


        if (socket) {
            const oneRoomStat = await getOneRoomStat(room_id);

            await socket.emit('updateChart', oneRoomStat);

            socket.emit('rooms', await lastRoomStat());
        }


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
