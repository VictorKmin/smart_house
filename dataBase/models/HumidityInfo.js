const  {DB_TABLES} = require('../../constants');

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
        tableName: DB_TABLES.HUMIDITY,
        timestamps: false
    });
    return HumidityInfo
};
