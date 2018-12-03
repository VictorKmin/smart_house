const dateValidator = require('../../helpers/statisticDateValidator');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const chalk = require('chalk');

module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        const {from, to, roomId} = req.body;
        let {fromDate, toDate} = dateValidator(from, to);

        /**
         * Show stats within certain dates.
         * Date: "YYYY-MM-DD HH"
         * @type {Array<Model>}
         */
        // SELECT * FROM statistic WHERE fulldate >= fromDate AND fulldate < toDate  AND roomid = roomId ORDER BY id ASC;
        const roomStat = await RoomStatistics.findAll({
            order: [['id', 'ASC']],
            where: {
                [Op.and]: [
                    {
                        [Op.and]: [
                            {fulldate: {[Op.gte]: fromDate}},
                            {fulldate: {[Op.lte]: toDate}}
                        ]
                    },
                    {roomid: roomId}
                ]
            }
        });
        if (!roomStat.length) throw new Error(`STATISTIC ON ROOM ${roomId} IS EMPTY`);
        res.json(roomStat)
    } catch (e) {
        console.log(chalk.bgRed(e.message));
    }

};
