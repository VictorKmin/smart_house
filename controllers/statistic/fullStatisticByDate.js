const dateValidator = require('../../helpers/statisticDateValidator');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = async (req, res) => {
    const postgres = req.app.get('postgres');
    const RoomStatistics = postgres.getModel('RoomStatistics');
    const {from, to, roomId} = req.body;
    let {fromDate, toDate} = dateValidator(from, to);

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
    // console.log(fromDate, toDate);
    // roomStat.forEach( value => {
    //     console.log(value.dataValues);
    // });

    res.json(roomStat)
};
