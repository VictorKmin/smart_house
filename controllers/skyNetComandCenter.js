const chalk = require('chalk');
const postgres = new require('../dataBase').getInstance();
postgres.setModels();

module.exports = async (body) => {

    const RoomInfo = postgres.getModel('RoomInfo');
    const RoomStatistics = postgres.getModel('RoomStatistics');

    if (!RoomInfo || !RoomStatistics) throw new Error(chalk.bgRed(`Cant connect to data base`));

    const { ip:deviceip, room_id:roomid,room_temp, error_code} = body;
    const {room_heater: status, sensor_temp: temp} = body.interface;

    if (!deviceip || !roomid || error_code || !temp) throw new Error(chalk.bgRed(`BAD RESPONSE FROM MODULE`));

    console.log(chalk.bgGreen.black(`Response form ${deviceip} is good`));
//find room by ID
    let isRoomInDB = await RoomInfo.findByPk(roomid);
//If we have not room - create it
    if (!isRoomInDB) {
        await RoomInfo.create({
            roomid,
            deviceip,
            lastresponse: Date.now()
        });
        console.log(chalk.blue(`Room ${roomid} is created`));
    }
// If room is present - update ip address and last response time
    await RoomInfo.update({
        deviceip,
        lastresponse: Date.now()
    }, {
        where: {
            roomid
        }
    });
    console.log(chalk.blue(`Room ${roomid} is updated`));

    await RoomStatistics.create({
        roomid,
        temp,
        time: Date.now(),
        status: !!status
    });
    console.log(chalk.blue(`Info by room ${roomid} insert into statistic`));
};