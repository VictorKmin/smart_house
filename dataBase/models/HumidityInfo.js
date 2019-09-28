const  {DB_TABLES} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const HumidityInfo = sequelize.define('HumidityInfo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_id: {
            type: DataTypes.INTEGER,
        },
        humidity: {
            type: DataTypes.DOUBLE,
        },
        full_date: {
            type: DataTypes.STRING,
            defaultValue: sequelize.fn('now')
        }
    }, {
        tableName: DB_TABLES.HUMIDITY,
        timestamps: false
    });
    return HumidityInfo
};
