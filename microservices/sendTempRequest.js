const chalk = require('chalk');
const postgres = new require('../dataBase').getInstance();
postgres.setModels();

const sendReq = require('../helpers/sendRequest');

process.on('message', () => {
    setInterval(sendReqToModules, 120000);
});

async function sendReqToModules() {
    try {
        const RoomInfo = postgres.getModel('RoomInfo');
        const allRooms = await RoomInfo.findAll({});

        for (const oneRoom of allRooms) {
            const {deviceip, temp} = oneRoom.dataValues;
            console.log(chalk.cyan(`Send request to ${deviceip}`));
            sendReq(deviceip, temp)
        }
    } catch (e) {
        console.log(e.message)
    }

}
