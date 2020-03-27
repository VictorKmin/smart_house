const mariaDB = require('../../dataBase').getInstance();

module.exports = {
    create: (temperatureObject) => {
        const TemperatureModule = mariaDB.getModel('TemperatureStat');

        return TemperatureModule.create(temperatureObject)
    },

    deleteByParams(deleteObject) {
        const TemperatureModule = mariaDB.getModel('TemperatureStat');

        return TemperatureModule.destroy(deleteObject)
    },

    getRoomsLastTwoValues(room_id) {
        const TemperatureModule = mariaDB.getModel('TemperatureStat');

        return TemperatureModule.findAll({
            order: [['id', 'DESC']],
            limit: 2,
            where: {room_id}
        })
    },

    deleteById(id) {
        const TemperatureModule = mariaDB.getModel('TemperatureStat');

        return TemperatureModule.destroy({where: {id}})
    },

    findAll(filterObject) {
        const TemperatureModule = mariaDB.getModel('TemperatureStat');

        return TemperatureModule.findAll({...filterObject, raw: true})
    }
};
