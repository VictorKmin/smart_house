const chalk = require('chalk');
const postgres = require('../dataBase/index').getInstance();
postgres.setModels();

process.on('message', () => {
    setInterval(checkModules, 100000);
});

async function checkModules() {
    try {
        console.log(chalk.magenta('Start to check modules....'));
        const RoomInfo = postgres.getModel('RoomInfo');
        if (!RoomInfo) throw new Error(`Cant connect to data base. Code: 1`);

        const allRooms = await RoomInfo.findAll({});
        for (const {roomid, lastresponse} of allRooms) {
            let currentTime = Date.now();
            console.log(chalk.cyan(`Last response in room ${roomid} was ${currentTime - lastresponse}ms ago`));
            if (currentTime - lastresponse > 300000) throw new Error(`Module in room ${roomid} is dead ! Code: 2`);
        }
    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }

}
