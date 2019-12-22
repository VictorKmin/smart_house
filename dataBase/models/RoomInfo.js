const  {DB_TABLES} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const RoomInfo = sequelize.define('RoomInfo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        device_ip: {
            type: DataTypes.STRING,
        },
        last_response: {
            type: DataTypes.STRING
        },
        temp: {
            type: DataTypes.DOUBLE
        },
        is_alive: {
            type: DataTypes.BOOLEAN
        },
        auto_mode: {
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: DB_TABLES.ROOM,
        timestamps: false
    });
    return RoomInfo
};
