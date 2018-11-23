module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        const RoomsInfo = postgres.getModel('RoomInfo');
        let roomid = req.query.id;
        if (!roomid) {

            // Achtung Achtung Achtung
            //
            let resp = [];
            const allRoomsIds = await RoomsInfo.findAll({});
            for (const allRoomsId of allRoomsIds) {
                const {roomid, temp, deviceip} = allRoomsId.dataValues;
                const statisticByRoom = await RoomStatistics.findOne({
                    order: [['time', 'DESC']],
                    where: {
                        roomid
                    },
                });
                let {roomid: id, room_temp, time, status} = statisticByRoom.dataValues;
                let respObj = {id, room_temp, time, status, temp, deviceip};
                resp.push(respObj)
            }
            res.json(resp)

            // TODO
            //     // SELECT t.roomid, s.temp, t.mT, s.id FROM (                            // Тут дістаю все, що мені буде потрібно для роботи
            //     //     SELECT roomid, MAX(time) AS mT FROM statistic GROUP BY roomid     // Тут формується нова таблиця, яку я назву t.
            //     // ) t JOIN statistic s ON s.roomid = t.roomid AND s.time = t.mT;            // Тут я джоінаю їх і кажу, що чому рівне
            //
            //     const statisticByRoom = postgres.query(
            //         `SELECT t.roomid, s.temp, t.mT, s.id FROM (SELECT roomid, MAX(time) AS mT FROM statistic GROUP BY roomid) t JOIN statistic s ON s.roomid = t.roomid AND s.time = t.mT;`,
            //         {raw: false, type: postgres.QueryTypes.SELECT});
            //     res.json(statisticByRoom)
        }


        // SELECT * FROM statistics WHERE roomid = ${roomid} ORDER BY time DESC LIMIT 1;
        const statisticByRoom = await RoomStatistics.findOne({
            order: [['time', 'DESC']],
            where: {
                roomid
            },
        });

        if (!statisticByRoom) res.json('STATISTIC IS EMPTY');
        res.json(statisticByRoom);

    } catch (e) {
        console.log(e)
        res.json({
            success: false,
            message: e.message
        })
    }
};