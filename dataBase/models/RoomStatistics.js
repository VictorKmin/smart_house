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
        tableName: 'temp_info',
        timestamps: false
    });
    return RoomStatistics
};