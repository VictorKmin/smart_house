module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        let roomid = req.query.id;
        if (!roomid) throw new Error('Please set id in query');
        // SELECT * FROM statistics WHERE roomid = ${roomid} ORDER BY id ASC;
        const statisticByRoom = await RoomStatistics.findAll({
            order: [['id', 'ASC']],
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