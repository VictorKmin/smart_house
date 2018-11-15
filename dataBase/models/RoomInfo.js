
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
        }
    }, {
        tableName: 'roomsinfo',
        timestamps: false
    });
    return RoomInfo
};