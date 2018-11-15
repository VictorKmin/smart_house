const express = require('express');
const router = express.Router();

router.get('/', async (req,res)=> {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        let roomid = req.query.id;
        if (!roomid) {
            // ПРИДУМАТИ ЯК ГАРНО ВИВЕСТИ ВСЮ САТИСТИКУ
            // ПО ЧЕРЗІ ДЛЯ КОЖНОЇ КІМНАТИ
            res.json('Тут гарна статистика всіх кімнат ... буде')
        }

        const statisticByRoom = await RoomStatistics.findAll({
            where: {
                roomid
            }
        });

        if (!statisticByRoom.length) res.json('STATISTIC IS EMPTY');
        res.json(statisticByRoom);

    } catch (e) {
        res.json({
            success:false,
            message: e
        })
    }
});

module.exports = router;