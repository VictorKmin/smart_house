const chalk = require('chalk');
/**
 * This method takes last statistic by all rooms in database
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        const HumidityInfo = postgres.getModel('HumidityInfo');
        const RoomsInfo = postgres.getModel('RoomInfo');
        // Achtung Achtung Achtung
        //
        let resp = [];
        const allRoomsIds = await RoomsInfo.findAll({});
        if (!allRoomsIds.length) throw new Error('Sorry. We have not rooms in database. Code: 5');
        for (const allRoomsId of allRoomsIds) {
            const {roomid, temp, deviceip, isalive} = allRoomsId.dataValues;
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

            // if (!statisticByRoom) throw new Error(`Statistic by room ${roomid} is empty. Code 3`);
            let {roomid: id, status, room_temp} = temperatureInfo.dataValues;
            let {humidity} = humidityInfo.dataValues;
            let respObj = {id, room_temp, status, temp, deviceip, isalive, humidity};
            resp.push(respObj)
        }
        res.json({
            success: true,
            message: resp
        })

    } catch (e) {
        console.log(chalk.bgRed(e.message));
        res.json({
            success: false,
            message: e.message,
        })
    }
};