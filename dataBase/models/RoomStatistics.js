
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
        temp: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'statics',
        timestamps: false
    });
    return RoomStatistics
};