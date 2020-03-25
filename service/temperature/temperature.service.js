const mariaDB = require('../../dataBase').getInstance();

module.exports = {
    create: (temperatureObject) => {
        const TemperatureModule = mariaDB.getModel('TemperatureStat');

        return TemperatureModule.create(temperatureObject)
    },

    findAll(filterObject) {
        const TemperatureModule = mariaDB.getModel('TemperatureStat');

        return TemperatureModule.findAll(filterObject)
    }
};
