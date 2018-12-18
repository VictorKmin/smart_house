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
        tableName: 'co2_info',
        timestamps: false
    });
    return CO2Info
};