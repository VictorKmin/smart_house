'use strict';
const { DB_TABLES } = require('../constants');

module.exports = {
    up: async (queryInterface, dataTypes) => {
        try {

            const constants = {
                id: {
                    type: dataTypes.INTEGER,
                    primaryKey: true
                },
                label: {
                    type: dataTypes.STRING,
                },
                value: {
                    type: dataTypes.STRING
                }
            }

            await queryInterface.createTable(DB_TABLES.CONSTANTS, constants);

            const room_info = {
                id: {
                    type: dataTypes.INTEGER,
                    primaryKey: true
                },
                device_ip: {
                    type: dataTypes.STRING,
                },
                last_response: {
                    type: dataTypes.STRING
                },
                temp: {
                    type: dataTypes.DOUBLE
                },
                is_alive: {
                    type: dataTypes.BOOLEAN
                },
                auto_mode: {
                    type: dataTypes.BOOLEAN
                }
            };

            await queryInterface.createTable(DB_TABLES.ROOM, room_info);

            const co2info = {
                id: {
                    type: dataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                room_id: {
                    type: dataTypes.INTEGER,
                    references: {
                        model: DB_TABLES.ROOM,
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                co2: {
                    type: dataTypes.DOUBLE,
                },
                full_date: {
                    type: dataTypes.STRING,
                }
            };

            await queryInterface.createTable(DB_TABLES.CO2, co2info);

            const humidity_info = {
                id: {
                    type: dataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                room_id: {
                    type: dataTypes.INTEGER,
                    references: {
                        model: DB_TABLES.ROOM,
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                humidity: {
                    type: dataTypes.DOUBLE,
                },
                full_date: {
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
                room_id: {
                    type: dataTypes.INTEGER,
                    references: {
                        model: DB_TABLES.ROOM,
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE"
                },
                room_temp: {
                    type: dataTypes.DOUBLE,
                },
                heater_status: {
                    type: dataTypes.BOOLEAN
                },
                full_date: {
                    type: dataTypes.STRING,
                }
            };

            await queryInterface.createTable(DB_TABLES.TEMPERATURE, temperature_info);

            const moving = {
                id: {
                    type: dataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                room_id: {
                    type: dataTypes.INTEGER,
                    references: {
                        model: DB_TABLES.ROOM,
                        key: 'id'
                    },
                    onUpdate: "CASCADE",
                    onDelete: "CASCADE",
                    allowNull: true
                },
                full_date: {
                    type: dataTypes.STRING,
                }
            };

            await queryInterface.createTable(DB_TABLES.MOVING, moving);

        } catch (e) {
            console.log(e);
        }


    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.dropTable(DB_TABLES.TEMPERATURE);
            await queryInterface.dropTable(DB_TABLES.CO2);
            await queryInterface.dropTable(DB_TABLES.HUMIDITY);
            await queryInterface.dropTable(DB_TABLES.MOVING);
            await queryInterface.dropTable(DB_TABLES.ROOM);
            await queryInterface.dropTable(DB_TABLES.CONSTANTS);
            return Promise.resolve();

        } catch (e) {
            console.log(e);
        }
    }
}
