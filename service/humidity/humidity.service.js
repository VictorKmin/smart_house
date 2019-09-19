const db = require('../../dataBase').getInstance();
const Humidity = db.getModel('HumidityInfo');

module.exports = {
    create: async humidityObject => {
        return Humidity.create(humidityObject)
    },

    destroyByParams:  async destroyObject => {
        return Humidity.destroy({
            where: destroyObject
        })
    },

    getAllInfoByParams: async (paramObject = {}, sort = 'id', order, limit = '', offset = '') => {
        order = order === 'DESC' ? 'DESC' : 'ASC';

        const humidity =  await Humidity.findAll({
            where: paramObject,
            order: [sort, order],
            limit,
            offset
        });

        return humidity && humidity.dataValues
    },
}
