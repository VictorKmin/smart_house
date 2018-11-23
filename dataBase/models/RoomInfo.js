
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
        }
    }, {
        tableName: 'roomsinfo',
        timestamps: false
    });
    return RoomInfo
};