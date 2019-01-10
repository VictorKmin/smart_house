const chalk = require('chalk');
const postgres = require('../../dataBase/index').getInstance();

/**
 * This method takes last statistic by all rooms in database
 * @returns {Promise<Array>}
 */
module.exports = async () => {
    try {
        const RoomStatistics = postgres.getModel('RoomStatistics');
        const HumidityInfo = postgres.getModel('HumidityInfo');
        const RoomsInfo = postgres.getModel('RoomInfo');
        // Achtung Achtung Achtung
        //

        //  SELECT t.roomid, s.room_temp, t.mT, s.id FROM (
        //          SELECT roomid, MAX(time) AS mT FROM statistic GROUP BY roomid
        //      ) t JOIN statistic s ON s.roomid = t.roomid AND s.time = t.mT;
        //  SELECT * FROM statistic WHERE fulldate >= '2018-11-25 11' AND fulldate < '2018-11-25 12'  AND roomid = 1;

        let resp = [];
        const allRooms = await RoomsInfo.findAll({});
        if (!allRooms.length) throw new Error('Sorry. We have not rooms in database. Code: 5');
        for (const room of allRooms) {
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
            let respObj = {id, room_temp, heater_status, auto_mode, temp, deviceip, isalive, humidity};
            resp.push(respObj);

            resp.sort((first, second) => {
                return first.id - second.id
            })
        }
        return resp;

    } catch (e) {
        console.log(chalk.bgRed(e.message));
    }
};