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
        if (!RoomInfo) throw new Error(`Cant connect to data base. Code: 1`);
        const allRooms = await RoomInfo.findAll({});
        if (allRooms.length === 0) throw new Error(`No rooms in DataBase. Code: 5`);

        for (const oneRoom of allRooms) {
            const {deviceip, temp} = oneRoom.dataValues;
            console.log(chalk.cyan(`Send request to ${deviceip}`));
            sendReq(deviceip, temp)
        }
    } catch (e) {
        console.log(e.message);
    }
}