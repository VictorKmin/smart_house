const temperatureService = require('./temperature');
const co2Service = require('./co2');
const humidityService = require('./humidity');
const roomService = require('./room');
const movingService = require('./moving');
const constantService = require('./constant');

module.exports = {
    temperatureService,
    co2Service,
    humidityService,
    roomService,
    constantService,
    movingService
};
