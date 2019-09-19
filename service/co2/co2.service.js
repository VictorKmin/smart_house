const db = require('../../dataBase').getInstance();
const CO2 = db.getModel('CO2Info');

module.exports = {

    getCO2ByParams: async (paramObject = {}, sort = 'id', order) => {
        order = order === 'DESC' ? 'DESC' : 'ASC';

        const co2 =  await CO2.findOne({
            where: paramObject,
            order: [sort, order]
        });

        return co2 && co2.dataValues
    },

    getAllInfoByParams: async (paramObject = {}, sort = 'id', order, limit = '', offset = '') => {
        order = order === 'DESC' ? 'DESC' : 'ASC';

        const co2 =  await CO2.findAll({
            where: paramObject,
            order: [sort, order],
            limit,
            offset
        });

        return co2 && co2.dataValues
    },

    createCO2: async co2Object => {
        return CO2.create(co2Object)
    },

    destroyCO2: async destroyObject => {
        return CO2.destroy({where: destroyObject})
    }

};
