const chalk = require('chalk');

const postgres = require('../../dataBase').getInstance();
const {co2Service} = require('../../service');

/**
 * This method takes last statistic by one room in database
 * @returns {Promise<{id: *, room_temp: *, heater_status: *, auto_mode: *, temp: *, deviceip: *, isalive: *, humidity: *}>}
 */
module.exports = async roomId => {
    try {
        const TemperatureStat = postgres.getModel('TemperatureStat');
        const HumidityInfo = postgres.getModel('HumidityInfo');
        const RoomsInfo = postgres.getModel('RoomInfo');

        const room = await RoomsInfo.findByPk(roomId);
        if (!room) throw new Error('Sorry. We have not rooms in database. Code: 5');

        const {roomid, temp, deviceip, isalive, auto_mode} = room.dataValues;
        const temperatureInfo = await TemperatureStat.findOne({
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

        const co2 = await co2Service.getCO2ByParams({roomid}, 'id', 'DESC');

        let {roomid: id, heater_status, room_temp, fulldate} = temperatureInfo.dataValues;
        let {humidity} = humidityInfo.dataValues;

        return {
            id,
            room_temp,
            heater_status,
            auto_mode,
            temp,
            deviceip,
            isalive,
            humidity,
            co2,
            fulldate
        };
    } catch (e) {
        console.log(chalk.bgRed(e.message));
    }
};
