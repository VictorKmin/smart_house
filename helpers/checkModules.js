const chalk = require('chalk');
const postgres = require('../dataBase').getInstance();
postgres.setModels();

process.on('message', () => {
    setInterval(checkModules, 50000);
});

async function checkModules() {
    try {
        console.log(chalk.magenta('Start to check modules....'));
        const RoomInfo = postgres.getModel('RoomInfo');
        if (!RoomInfo) throw new Error(chalk.bgRed(`Cant connect to data base`));

        const allRooms = await RoomInfo.findAll({});
        for (const {roomid, lastresponse} of allRooms) {
            let currentTime = Date.now();
            console.log(chalk.cyan(`Last response in room ${roomid} was ${currentTime - lastresponse}ms ago`));
            if (currentTime - lastresponse > 300000) throw new Error(chalk.bgRed(`Module in room ${roomid} is dead !`));
        }
    } catch (e) {
        console.log(e.message)
    }

}
