const  {DB_TABLES} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const RoomStatistics = sequelize.define('RoomStatistics', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roomid: {
            type: DataTypes.INTEGER,
        },
        room_temp: {
            type: DataTypes.DOUBLE,
        },
        heater_status: {
            type: DataTypes.BOOLEAN
        },
        fulldate: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: DB_TABLES.TEMPERATURE,
        timestamps: false
    });
    return RoomStatistics
};
