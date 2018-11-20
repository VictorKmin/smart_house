module.exports = async (body) => {
    const postgres = new require('../dataBase').getInstance();
    postgres.setModels();
    const RoomInfo = postgres.getModel('RoomInfo');
    const RoomStatistics = postgres.getModel('RoomStatistics');
    body = JSON.parse(body);
    const deviceip = body.ip;
    const roomid = body.room_id;
    const room_temp = body.room_temp;
    const { room_heater: status, sensor_temp: temp} = body.interface;
    console.log(`${roomid}    ROOM ID`);
    console.log(`${deviceip}   DEVICE IP`);
    console.log(`${temp}   TEMPERATURE`);
    console.log(`${status}   ROOM HEATER`);
//find room by ID
    let isRoomInDB = await RoomInfo.findOne({
        where: {
            roomid
        }
    });
//If we have not room - create it
    if (!isRoomInDB) {
        await RoomInfo.create({
            roomid,
            deviceip,
            lastresponse: Date.now()
        });
        console.log('NEW ROOM IS CREATED');
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
    console.log('ROOM IS UPDATED');

    await RoomStatistics.create({
        roomid,
        temp,
        time: Date.now(),
        status: !!status
    });
    console.log('DATA INSERT INTO STATISTICS');
};