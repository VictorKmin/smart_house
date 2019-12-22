const chalk = require('chalk');

const mariaDB = require('../dataBase').getInstance();
const {DATES} = require('../constants');
const {roomService} = require('../service');
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

        console.log(chalk.magenta('Start to check modules....'));
        if (!RoomInfo) throw new Error(`Cant connect to data base. Code: 1`);

        const allRooms = await RoomInfo.findAll();

        if (!allRooms.length) {
            return
        }

        for (const {id, last_response} of allRooms) {
            console.log(chalk.cyan(
                `Last response in room ${id} was ${((currentTime - last_response) / 1000 / 60).toFixed(1)}m ago`
            ));

            if (currentTime - last_response > DATES.FIVE_MINUTES) {
                await roomService.updateRoomById(id, {is_alive: false});

                console.log(chalk.bgRed(`Module in room ${id} is dead ! Code: 2`));
            }
        }
    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }
}
