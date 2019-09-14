const Sequelize = require("sequelize");

const dataBase = require('../dataBase').getInstance();

module.exports = async id => {
    let Info = dataBase.getModel('RoomStatistics');

    if (!id) return [];

    // select to_date(fulldate, 'YYYY-MM-DD') AS date from temp_info WHERE roomid = 'id' GROUP BY date ORDER BY date;
    let dates = await Info.findAll({
        attributes: [[Sequelize.fn('to_date', Sequelize.col('fulldate'), 'YYYY-MM-DD'), 'date']],
        where: {
            roomid: id
        },
        group: Sequelize.col('date'),
        order: Sequelize.col('date')
    });

    return dates;
};
