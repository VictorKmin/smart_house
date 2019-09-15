const chalk = require('chalk');

const postgres = require('../dataBase').getInstance();
const {DATES}  = require('../constants');
postgres.setModels();

process.on('message', () => {
    setInterval(checkModules, DATES.PING_MODULE_TIMEOUT);
});

/**
 * Child process to checking time response from module
 * If module not response more than 5 minutes we change status in DataBase to dead
 * @returns {Promise<void>}
 */
async function checkModules() {
    try {
        const currentTime = Date.now();

        console.log(chalk.magenta('Start to check modules....'));
        const RoomInfo = postgres.getModel('RoomInfo');
        if (!RoomInfo) throw new Error(`Cant connect to data base. Code: 1`);

        const allRooms = await RoomInfo.findAll({});

        for (const {roomid, lastresponse} of allRooms) {
            console.log(chalk.cyan(`Last response in room ${roomid} was ${currentTime - lastresponse}ms ago`));

            if (currentTime - lastresponse > 300000) {
              RoomInfo.update({
                  isalive: false,
              },{
                    where: {
                        roomid
                    }
                });

               console.log(chalk.bgRed(`Module in room ${roomid} is dead ! Code: 2`));
            }
        }
    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }

}
