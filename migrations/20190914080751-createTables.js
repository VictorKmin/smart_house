'use strict';
const {DB_TABLES} = require('../constants');

module.exports = {
    up: async (queryInterface, dataTypes) => {
        try {
            const co2info = {
                id: {
                    type: dataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                roomid: {
                    type: dataTypes.INTEGER
                },
                co2: {
                    type: dataTypes.DOUBLE,
                },
                fulldate: {
                    type: dataTypes.STRING,
                }
            };

            await queryInterface.createTable(DB_TABLES.CO2, co2info);

            const room_info = {
                roomid: {
                    type: dataTypes.INTEGER,
                    primaryKey: true
                },
                deviceip: {
                    type: dataTypes.STRING,
                },
                lastresponse: {
                    type: dataTypes.STRING
                },
                temp: {
                    type: dataTypes.DOUBLE
                },
                isalive: {
                    type: dataTypes.BOOLEAN
                },
                auto_mode: {
                    type: dataTypes.BOOLEAN
                }
            };

            await queryInterface.createTable(DB_TABLES.ROOM, room_info);

            const humidity_info = {
                id: {
                    type: dataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                roomid: {
                    type: dataTypes.INTEGER,
                },
                humidity: {
                    type: dataTypes.DOUBLE,
                },
                fulldate: {
                    type: dataTypes.STRING,
                }
            };

            await queryInterface.createTable(DB_TABLES.HUMIDITY, humidity_info);


            const temperature_info = {
                id: {
                    type: dataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                roomid: {
                    type: dataTypes.INTEGER,
                },
                room_temp: {
                    type: dataTypes.DOUBLE,
                },
                heater_status: {
                    type: dataTypes.BOOLEAN
                },
                fulldate: {
                    type: dataTypes.STRING,
                }
            };

            await queryInterface.createTable(DB_TABLES.TEMPERATURE, temperature_info);
        } catch (e) {
            console.log(e);
        }


    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.dropTable(DB_TABLES.TEMPERATURE);
            await queryInterface.dropTable(DB_TABLES.CO2);
            await queryInterface.dropTable(DB_TABLES.HUMIDITY);
            await queryInterface.dropTable(DB_TABLES.ROOM);
            return Promise.resolve();

        } catch (e) {
            console.log(e);
        }
    }
}
