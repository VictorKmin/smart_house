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
        const HumidityInfo = postgres.getModel('HumidityInfo');
        let {from, to, roomId} = req.body;

        const {startingDate, finishDate} = dateValidator(from, to);

        /**
         * Show stats within certain dates.
         * Date: "YYYY-MM-DD"
         * @type {Array<Model>}
         */
            // SELECT * FROM temp_info WHERE fulldate >= fromDate AND fulldate < toDate  AND roomid = roomId ORDER BY id ASC;
        const temperatureStat = await RoomStatistics.findAll({
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
        // SELECT * FROM humidity_info WHERE fulldate >= fromDate AND fulldate < toDate  AND roomid = roomId ORDER BY id ASC;

        const humidityStat = await HumidityInfo.findAll({
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
        if (!temperatureStat.length) throw new Error(`TEMPERATURE STATISTIC ON ROOM ${roomId} IS EMPTY. Code 3`);
        if (!humidityStat.length) throw new Error(`HUMIDITY STATISTIC ON ROOM ${roomId} IS EMPTY. Code 3`);
        res.json({
            success: true,
            message: {
                temperature: temperatureStat,
                humidity: humidityStat
            }
        })
    } catch (e) {
        console.log(chalk.bgRed(e.message));
        res.json({
            success:false,
            message: e.message,
        })
    }

};
