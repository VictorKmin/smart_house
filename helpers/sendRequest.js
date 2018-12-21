const request = require('request');
const chalk = require('chalk');
const mainController = require('../controllers/skyNetComandCenter');

//JUST THROW ERROR
/**
 * Send a request to the module with the order to keep the temperature
 * @param deviceip - ip of device, where we send order
 * @param temp - temperature to keeping
 */
module.exports = (deviceip, temp) => {
    request.get(
        `http://${deviceip}/?room_temp=${temp}`, (error, response, body) => {
            if (!error && response.statusCode === 200) mainController(JSON.parse(body))
            else console.log(chalk.bgRed(error.message));
        }
    )
};