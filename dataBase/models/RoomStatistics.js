const  {DB_TABLES} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const RoomStatistics = sequelize.define('RoomStatistics', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_id: {
            type: DataTypes.INTEGER,
        },
        room_temp: {
            type: DataTypes.DOUBLE,
        },
        heater_status: {
            type: DataTypes.BOOLEAN
        },
        full_date: {
            type: DataTypes.STRING,
            defaultValue: sequelize.fn('now')
        }
    }, {
        tableName: DB_TABLES.TEMPERATURE,
        timestamps: false
    });
    return RoomStatistics
};
