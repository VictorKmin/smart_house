const chalk = require('chalk');

module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        const RoomsInfo = postgres.getModel('RoomInfo');
        // Achtung Achtung Achtung
        //
        let resp = [];
        const allRoomsIds = await RoomsInfo.findAll({});
        if (!allRoomsIds.length) throw new Error('Sorry. We have not rooms in database');
        for (const allRoomsId of allRoomsIds) {
            const {roomid, temp, deviceip} = allRoomsId.dataValues;
            const statisticByRoom = await RoomStatistics.findOne({
                order: [['id', 'DESC']],
                where: {
                    roomid
                },
            });

            if (!statisticByRoom.dataValues) throw new Error(`Statistic by room ${roomid} is empty`);

            let {roomid: id, status, room_temp} = statisticByRoom.dataValues;
            let respObj = {id, room_temp, status, temp, deviceip};
            resp.push(respObj)
        }
        res.json({
            success: true,
            message: resp
        })

    } catch (e) {
        console.log(chalk.bgRed(e.message));
        res.json({
            success:false,
            message: e.message,
        })
    }
};