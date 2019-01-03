const chalk = require('chalk');
const postgres = require('../../dataBase/index').getInstance();

/**
 * This method takes last statistic by one room in database
 * @returns {Promise<{id: *, room_temp: *, heater_status: *, auto_mode: *, temp: *, deviceip: *, isalive: *, humidity: *}>}
 */
module.exports = async (roomId) => {
    try {
        console.log(chalk.bgRed('ONE ROOM START'))
        const RoomStatistics = postgres.getModel('RoomStatistics');
        const HumidityInfo = postgres.getModel('HumidityInfo');
        const RoomsInfo = postgres.getModel('RoomInfo');
        const room = await RoomsInfo.findByPk(roomId);
        if (!room) throw new Error('Sorry. We have not rooms in database. Code: 5');
        const {roomid, temp, deviceip, isalive, auto_mode} = room.dataValues;
        const temperatureInfo = await RoomStatistics.findOne({
            order: [['id', 'DESC']],
            where: {
                roomid
            },
        });
        const humidityInfo = await HumidityInfo.findOne({
            order: [['id', 'DESC']],
            where: {
                roomid
            },
        });

        let {roomid: id, heater_status, room_temp} = temperatureInfo.dataValues;
        let {humidity} = humidityInfo.dataValues;

        console.log(chalk.bgRed('ONE ROOM END'));
        return {id, room_temp, heater_status, auto_mode, temp, deviceip, isalive, humidity};
    } catch (e) {
        console.log(chalk.bgRed(e.message));
    }
};