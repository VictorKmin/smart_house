const chalk = require('chalk');
const postgres = new require('../dataBase').getInstance();
postgres.setModels();

module.exports = async (body) => {

    const RoomInfo = postgres.getModel('RoomInfo');
    const RoomStatistics = postgres.getModel('RoomStatistics');

    if (!RoomInfo || !RoomStatistics) throw new Error(chalk.bgRed(`Cant connect to data base. Code: 1`));

    const {ip: deviceip, room_id: roomid, room_temp, error_code} = body;
    const {room_heater: status, sensor_temp: temp} = body.interface;

    if (!deviceip || !roomid || error_code || !temp) throw new Error(chalk.bgRed(`BAD RESPONSE FROM MODULE. Code: 4`));

    console.log(chalk.bgGreen.black(`Response form ${deviceip} is good`));

    /**
     * Check is room present in DataBase.
     * If we have not room - we insert it into DataBase
     * If room is already present, we just update parameters of room
     * @type {Model}
     */
    let isRoomInDB = await RoomInfo.findByPk(roomid);
//If we have not room - create it
    if (!isRoomInDB) {
        await RoomInfo.create({
            roomid,
            deviceip,
            lastresponse: Date.now(),
            room_temp,
            isalive: true
        });
        console.log(chalk.blue(`Room ${roomid} is created`));
    }
// If room is present - update ip address and last response time
    await RoomInfo.update({
        deviceip,
        isalive: true,
        lastresponse: Date.now()
    }, {
        where: {
            roomid
        }
    });
    console.log(chalk.blue(`Room ${roomid} is updated`));

    /**
     * This method minimize records in DataBase
     * Get current date and time. Adding 0 if month and day is less than 10
     * Check is previous and before the previous one records in DataBase have temperature like current value from temperature module
     * If its equals we delete previous record.
     */
    let date = new Date().toLocaleDateString();
    let time = new Date().toLocaleTimeString();
    let [year, month, day] = date.split('-');
    (+month < 10) ? month = '0' + month : month;
    (+day < 10) ? day = '0' + day : day;
    date = `${year}-${month}-${day}`;
    // Find newest room in DataBase
    let [newRoom, oldRoom] = await RoomStatistics.findAll({
        order: [['id', 'DESC']],
        limit: 2,
        where: {roomid}
    });
    const {room_temp: previpuosTemp} = oldRoom.dataValues;
    const {id: lastId, room_temp: lastTemp} = newRoom.dataValues;
    // If temperatures of current value and last value is equals - just update time
    if (previpuosTemp === temp.toFixed(1) && lastTemp === temp.toFixed(1)) {
        await RoomStatistics.destroy({
            where: {
                id: lastId
            }
        });
        console.log(chalk.blue(`DELETE PREVIOUS ROOM`));
    }
    // If they are not equals - create new record
    await RoomStatistics.create({
        roomid,
        room_temp: temp.toFixed(1),
        status: !!status,
        fulldate: `${date} ${time}`
    });
    console.log(chalk.blue(`Info by room ${roomid} insert into statistic`));
};