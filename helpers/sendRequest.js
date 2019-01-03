// const request = require('request');
// const chalk = require('chalk');
// const mainController = require('../controllers/dataBaseController');
//
// /**
//  * Send a request to the module with the order to keep the temperature
//  * @param deviceip - ip of device, where we send order
//  * @param temp - temperature to keeping
//  */
// module.exports = (deviceip, temp) => {
//    request.get(
//         `http://${deviceip}/?room_temp=${temp}`,async (error, response, body) => {
//             if (!error && response.statusCode === 200) {
//                 await mainController(JSON.parse(body))
//             }
//             else console.log(chalk.bgRed(error.message));
//         }
//     )
// };