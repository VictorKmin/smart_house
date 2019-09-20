const request = require('request-promise');
const chalk = require('chalk');

const {roomService} = require('../../service');

module.exports = async (roomId, temp) => {
    try {
        if (!roomId || temp === undefined) throw new Error('Something wrong with request. Code: 1');

        +temp === 0 ?
            await roomService.updateRoomById(roomId, {auto_mode: false}) :
            await roomService.updateRoomById(roomId, {temp, auto_mode: true});


        const {deviceip} = await roomService.findRoomById(roomId);

        if (!deviceip) throw new Error('We have not this room in database. Code 5');

        return request(`http://${deviceip}/?room_temp=${temp}`)

    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }
};
