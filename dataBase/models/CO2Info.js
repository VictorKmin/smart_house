const  {DB_TABLES} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const CO2Info = sequelize.define('CO2Info', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roomid: {
            type: DataTypes.INTEGER,
        },
        co2: {
            type: DataTypes.DOUBLE,
        },
        fulldate: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: DB_TABLES.CO2,
        timestamps: false
    });
    return CO2Info
};
