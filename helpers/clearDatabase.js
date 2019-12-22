const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const chalk = require('chalk');

const {DATES} = require('../constants');
/**
 * @returns {Promise<void>}
 * @param mariaDB
 */
module.exports = async mariaDB => {
    try {
        const TemperatureStat = mariaDB.getModel('TemperatureStat');

        if (!TemperatureStat) {
            throw new Error(`Cant connect to data base. Code: 1`);
        }
        const olderThanOneMonth = Date.now() - DATES.ONE_MONTH;

        await TemperatureStat.destroy({
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
