const  {DB_TABLES} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Moving = sequelize.define("Moving", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        room_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        full_date: {
            type: DataTypes.STRING,
            defaultValue: sequelize.fn('now')
        }
    }, {
        tableName: DB_TABLES.MOVING,
        timestamps: false
    });
    return Moving
};
