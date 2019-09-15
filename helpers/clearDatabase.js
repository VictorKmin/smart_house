const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const chalk = require('chalk');

const {DATES} = require('../constants');
/**
 * @param postgres - data base
 * @returns {Promise<void>}
 */
module.exports = async postgres => {
    try {
        const RoomStatistics = postgres.getModel('RoomStatistics');

        if (!RoomStatistics) {
            throw new Error(`Cant connect to data base. Code: 1`);
        }
        let olderThanOneMonth = Date.now() - DATES.ONE_MONTH;

        await RoomStatistics.destroy({
            where: {
                time: {
                    [Op.lte]: olderThanOneMonth
                }
            }
        });
        console.log(chalk.bgMagenta('-----ALL OLD RECORDS IS DELETED-----'));
    } catch (e) {
        console.log(chalk.bgRed(e.message))

    }
};
