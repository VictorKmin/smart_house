
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
        time: {
            type: DataTypes.STRING
        },
        status: {
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: 'statistic',
        timestamps: false
    });
    return RoomStatistics
};