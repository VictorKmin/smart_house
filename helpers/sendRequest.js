const request = require('request-promise');
const chalk = require('chalk');
const mainController = require('../controllers/skyNetComandCenter');

module.exports = (deviceip, temp) => {
    request.get(
        `http://${deviceip}/?room_temp=${temp}`, (error, response, body) => {
            if (!error && response.statusCode === 200) mainController(JSON.parse(body));
            else console.log(chalk.bgRed(error.message));
        }
    )
};