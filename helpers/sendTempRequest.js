const request = require('request');
const chalk = require('chalk');
const mainController = require('../controllers/skyNetComandCenter');
const postgres = new require('../dataBase').getInstance();
postgres.setModels();

process.on('message', () => {
    setInterval(sendReqToModules, 30000);
});

async function sendReqToModules() {
    const RoomInfo = postgres.getModel('RoomInfo');
    const allRooms = await RoomInfo.findAll({});

    for (const oneRoom of allRooms) {
        const {deviceip, temp} = oneRoom.dataValues;
        console.log(chalk.cyan(`Send request to ${deviceip}`));
       request.get(
            `http://${deviceip}/?room_temp=${temp}`, (error, response, body) => {
                if (!error && response.statusCode === 200) mainController(JSON.parse(body));
                else console.log(chalk.bgRed(error.message));
            }
        );
    }
}
