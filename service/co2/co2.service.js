const db = require('../../dataBase').getInstance();

module.exports = {

    getCO2ByParams: (paramObject = {}, sort = 'id', order) => {
        const CO2 = db.getModel('CO2Info');

        order = order === 'DESC' ? 'DESC' : 'ASC';

        return CO2.findOne({
            where: paramObject,
            order: [[sort, order]],
            raw: true
        });
    },

    getAllInfoByParams: (paramObject = {}, sort = 'id', order, limit = 0, offset = 0) => {
        const CO2 = db.getModel('CO2Info');

        order = order === 'DESC' ? 'DESC' : 'ASC';

        return CO2.findAll({
            where: paramObject,
            order: [[sort, order]],
            limit,
            offset,
            raw: true
        });
    },


    getRoomsLastTwoValues(room_id) {
        const CO2 = db.getModel('CO2Info');

        return CO2.findAll({
            order: [['id', 'DESC']],
            limit: 2,
            where: {room_id}
        })
    },

    createCO2: co2Object => {
        const CO2 = db.getModel('CO2Info');

        return CO2.create(co2Object)
    },

    destroyCO2: destroyObject => {
        const CO2 = db.getModel('CO2Info');

        return CO2.destroy({where: destroyObject})
    },

    destroyCO2ByID: id => {
        const CO2 = db.getModel('CO2Info');

        return CO2.destroy({where: {id}})
    }
};
