const chalk = require('chalk');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = async (req, res) => {
    try {
       let date = new Date(Date.now() - 259200000);
        let dateNow = new Date(Date.now());

        let threeDaysAgo = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        let currDate = `${dateNow.toLocaleDateString()} ${dateNow.toLocaleTimeString()}`;
        console.log(threeDaysAgo);
        console.log(currDate);

        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        let roomid = req.query.id;
        if (!roomid) throw new Error('Please set id in query');
        // SELECT * FROM statistics WHERE roomid = ${roomid} ORDER BY id ASC;
        const roomStat = await RoomStatistics.findAll({
            order: [['id', 'ASC']],
            where: {
                [Op.and]: [
                    {
                        [Op.and]: [
                            {fulldate: {[Op.gte]: threeDaysAgo}},
                            {fulldate: {[Op.lte]: currDate}}
                        ]
                    },
                    {roomid}
                ]
            }
        });
        if (!roomStat.length) throw new Error(`STATISTIC ON ROOM ${roomid} IS EMPTY`);
        res.json(roomStat)

    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }
};