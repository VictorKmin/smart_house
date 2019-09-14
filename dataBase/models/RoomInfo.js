const  {DB_TABLES} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const RoomInfo = sequelize.define('RoomInfo', {
        roomid: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        deviceip: {
            type: DataTypes.STRING,
        },
        lastresponse: {
            type: DataTypes.STRING
        },
        temp: {
            type: DataTypes.DOUBLE
        },
        isalive: {
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
