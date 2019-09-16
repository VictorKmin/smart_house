const temperatureService = require('./temperature');
const co2Service = require('./co2');
const humidityService = require('./humidity');
const roomService = require('./room');

module.exports = {
    temperatureService,
    co2Service,
    humidityService,
    roomService
};
