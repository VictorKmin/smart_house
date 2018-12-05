const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const chalk = require('chalk');
/**
 * @param postgres - data base
 * @returns {Promise<void>}
 */
module.exports = async (postgres) => {
    try {
        const RoomStatistics = postgres.getModel('RoomStatistics');
        if (!RoomStatistics) throw new Error(`Cant connect to data base. Code: 1`);
                                            //31 days
        let olderThanOneMonth = Date.now() - 2678400000;
        // DELETE * FORM statistics WHERE time <= olderThanOneMonth;
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