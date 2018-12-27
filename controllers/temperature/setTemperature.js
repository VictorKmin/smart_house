const sendReq = require('../../helpers/sendRequest');
const chalk = require('chalk');
const postgres = new require('../../dataBase').getInstance();

module.exports = async (roomId, temp) => {
    try {
        const RoomInfo = postgres.getModel('RoomInfo');
        if (!RoomInfo) throw new Error('Cant connect to DataBase. Code: 1');
        if (!roomId || temp === undefined) throw new Error('Something wrong with request. Code: 1');

        if (+temp === 0) {
            await RoomInfo.update({
                auto_mode: false
            }, {
                where: {
                    roomid: roomId
                }
            });
        } else {
            //Update room
            await RoomInfo.update({
                temp,
                auto_mode: true
            }, {
                where: {
                    roomid: roomId
                }
            });
        }


        const {deviceip} = await RoomInfo.findByPk(roomId);
        if (!deviceip) throw new Error('We have not this room in database. Code 5');

        sendReq(deviceip, temp);

        return {
            success: true,
            statusCode: 200,
            message: 'OK'
        }
    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }
};