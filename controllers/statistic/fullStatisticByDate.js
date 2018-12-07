const dateValidator = require('../../helpers/statisticDateValidator');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const chalk = require('chalk');
/**
 * This method find in DataBase within dates from dateValidator method
 * Then returns array of values to Angular
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        let {from, to, roomId} = req.body;

        const {startingDate, finishDate} = dateValidator(from, to);

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
