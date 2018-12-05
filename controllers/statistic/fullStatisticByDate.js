const dateValidator = require('../../helpers/statisticDateValidator');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const chalk = require('chalk');

module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        let {from, to, roomId} = req.body;

        const {startingDate, finishDate} = dateValidator(from, to);

        console.log('_____________');
        console.log(startingDate);
        console.log(finishDate);
        console.log('_____________');
        /**
         * Show stats within certain dates.
         * Date: "YYYY-MM-DD"
         * @type {Array<Model>}
         */
            // SELECT * FROM statistic WHERE fulldate >= fromDate AND fulldate < toDate  AND roomid = roomId ORDER BY id ASC;
        const roomStat = await RoomStatistics.findAll({
                order: [['id', 'ASC']],
                where: {
                    [Op.and]: [
                        {
                            [Op.and]: [
                                {fulldate: {[Op.gte]: startingDate}},
                                {fulldate: {[Op.lte]: finishDate}}
                            ]
                        },
                        {roomid: roomId}
                    ]
                }
            });
        if (!roomStat.length) throw new Error(`STATISTIC ON ROOM ${roomId} IS EMPTY. Code 3`);
        res.json({
            success: true,
            message: roomStat
        })
    } catch (e) {
        console.log(chalk.bgRed(e.message));
        res.json({
            success:false,
            message: e.message,
        })
    }

};
