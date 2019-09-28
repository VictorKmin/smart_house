const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const chalk = require('chalk');

const {smoothingStat, statisticDateValidator} = require('../../helpers');
const postgres = require('../../dataBase').getInstance();


/**
 * This method find in DataBase within dates from dateValidator method
 * Then returns array of values to Angular
 * @returns {Promise<{success: boolean, message: {temperature: Array<Model>, humidity: Array<Model>, co2: Array<Model>}}>}
 * @param body
 */
module.exports = async body => {
    try {

        const RoomStatistics = postgres.getModel('RoomStatistics');
        const HumidityInfo = postgres.getModel('HumidityInfo');
        let {dayOfStartSearch, dayOfFinishSearch, roomId} = body;

        let {startingDate, finishDate} = statisticDateValidator(dayOfStartSearch, dayOfFinishSearch);

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

        // TODO think how to moving to service
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

        // TODO No magic strings
        temperatureStat = smoothingStat(temperatureStat, 'room_temp');
        humidityStat = smoothingStat(humidityStat, 'humidity');
        co2Stat = smoothingStat(co2Stat, 'co2');

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
