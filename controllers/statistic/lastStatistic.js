module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        let roomid = req.query.id;
        if (!roomid) {
            // SELECT * FROM statistics ORDER BY time DESC LIMIT 1;
            const statisticByRoom = await RoomStatistics.findAll({
                // Треба витягнути останню годину та температуру по кожінй кімнаті.
                // Зробити це в циклі? НОУ НОУ НОУ
                order: [['roomid', 'DESC'], ['time', 'DESC']],
            });
            res.json(statisticByRoom)
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
        res.json({
            success: false,
            message: e.message
        })
    }
};