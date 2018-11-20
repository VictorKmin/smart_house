const request = require('request');
const chalk = require('chalk');
const maincontroller = require('../controllers/skyNetComandCenter');

process.on('message', () => {
    setInterval(sendReqToModules, 30000);
});

async function sendReqToModules() {
    const postgres = new require('../dataBase').getInstance();
    postgres.setModels();
    const RoomInfo = postgres.getModel('RoomInfo');
    const allRooms = await RoomInfo.findAll({});

    for (const oneRoom of allRooms) {
        const {roomid, deviceip} = oneRoom.dataValues;
        console.log(roomid, deviceip);
        request.get(
            `http://${deviceip}/?room_temp=25`, (error, response, body) => {
            // `http://${deviceip}:3001/`, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    maincontroller(body);
                } else {
                    console.log(chalk.bgRed(error))
                }
            }
        );
    }




}
