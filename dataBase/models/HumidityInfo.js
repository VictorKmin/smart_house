module.exports = (sequelize, DataTypes) => {
    const HumidityInfo = sequelize.define('HumidityInfo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roomid: {
            type: DataTypes.INTEGER,
        },
        humidity: {
            type: DataTypes.DOUBLE,
        },
        fulldate: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'humidity_info',
        timestamps: false
    });
    return HumidityInfo
};