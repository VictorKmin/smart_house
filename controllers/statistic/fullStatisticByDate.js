const dateValidator = require('../../helpers/statisticDateValidator');
const smoother = require('../../helpers/smoothingStat');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const chalk = require('chalk');
/**
 * This method find in DataBase within dates from dateValidator method
 * Then returns array of values to Angular
 * @returns {Promise<{success: boolean, message: {temperature: Array<Model>, humidity: Array<Model>, co2: Array<Model>}}>}
 * @param body
 */
module.exports = async (body) => {
    try {
        const postgres = require('../../dataBase/index').getInstance();

        const RoomStatistics = postgres.getModel('RoomStatistics');
        const HumidityInfo = postgres.getModel('HumidityInfo');
        const CO2Info = postgres.getModel('CO2Info');
        let {dayOfStartSearch, dayOfFinishSearch, roomId} = body;

        let {startingDate, finishDate} = dateValidator(dayOfStartSearch, dayOfFinishSearch);

        /**
         * Show stats within certain dates.
         * Date: "YYYY-MM-DD"
         * @type {Array<Model>}
         */
            // SELECT * FROM temp_info WHERE fulldate >= fromDate AND fulldate < toDate  AND roomid = roomId ORDER BY id ASC;
        let temperatureStat = await RoomStatistics.findAll({
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
        let humidityStat = await HumidityInfo.findAll({
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

        // SELECT * FROM co2_info WHERE fulldate >= fromDate AND fulldate < toDate  AND roomid = roomId ORDER BY id ASC;
        let co2Stat = await CO2Info.findAll({
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

        temperatureStat = smoother(temperatureStat, 'room_temp');
        humidityStat = smoother(humidityStat, 'humidity');
        co2Stat = smoother(co2Stat, 'co2');

        return {
            success: true,
            message: {
                temperature: temperatureStat,
                humidity: humidityStat,
                co2: co2Stat
            }
        }
    } catch (e) {
        console.log(chalk.bgRed(e.message));
        return {
            success: false,
            message: e.message,
        }
    }
};
