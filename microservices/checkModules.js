const chalk = require('chalk');

const mariaDB = require('../dataBase').getInstance();
const {DATES}  = require('../constants');
mariaDB.setModels();

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
        const RoomInfo = mariaDB.getModel('RoomInfo');
        console.log(RoomInfo);

        console.log(chalk.magenta('Start to check modules....'));
        if (!RoomInfo) throw new Error(`Cant connect to data base. Code: 1`);

        const allRooms = await RoomInfo.findAll();

        if (allRooms.length) {
            for (const {room_id, last_response} of allRooms) {
                console.log(chalk.cyan(`Last response in room ${room_id} was ${currentTime - last_response}ms ago`));

                if (currentTime - last_response > 300000) {
                    RoomInfo.update({
                        is_alive: false,
                    },{
                        where: {
                            room_id
                        }
                    });

                    console.log(chalk.bgRed(`Module in room ${room_id} is dead ! Code: 2`));
                }
            }
        }

    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }

}
