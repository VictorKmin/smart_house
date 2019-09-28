const  {DB_TABLES} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Constants = sequelize.define(DB_TABLES.CONSTANTS, {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        label: {
            type: DataTypes.STRING,
        },
        value: {
            type: DataTypes.STRING
        },
    }, {
        tableName: DB_TABLES.CONSTANTS,
        timestamps: false
    });
    return Constants
};
