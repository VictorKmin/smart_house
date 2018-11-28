module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        let roomid = req.query.id;
        if (!roomid) {
            // SELECT * FROM statistics ORDER BY roomid DESC, time DESC;
            const statisticByRoom = await RoomStatistics.findAll({
                order: [['roomid', 'DESC'], ['time', 'DESC']]
            });
            res.json(statisticByRoom)
        }
        // SELECT * FROM statistics WHERE roomid = ${roomid} ORDER BY time DESC;
        const statisticByRoom = await RoomStatistics.findAll({
            order:[['time', 'ASC']],
            where: {
                roomid
            }
        });

        if (!statisticByRoom.length) res.json('STATISTIC IS EMPTY');
        res.json(statisticByRoom);

    } catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
};