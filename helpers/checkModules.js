const chalk = require('chalk');

process.on('message', () => {
    setInterval(checkModules, 10000);
});

async function checkModules() {
    console.log(chalk.green('Start to check modules'));
    const postgres = require('../dataBase').getInstance();
    postgres.setModels();
    const RoomInfo = postgres.getModel('RoomInfo');
    if (!RoomInfo) throw new Error(chalk.bgRed(`Cant connect to data base`));
    const allRooms = await RoomInfo.findAll({});
    for (const {roomid, lastresponse} of allRooms) {
        console.log(roomid, lastresponse);
        let currentTime = Date.now();
        console.log(currentTime - lastresponse, roomid);
        if (currentTime - lastresponse > 300000) {
            throw new Error(chalk.bgRed(`Module in room ${roomid} is dead !`));
        }
    }

}
