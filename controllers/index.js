const botController = require('./bot');
const dbController = require('./dataBase');
const moduleRequest = require('./moduleRequest'); // TODO think how to simplify
const temperature = require('./temperature');
const statistic = require('./statistic');
const moving = require('./moving');

module.exports = {
    botController,
    dbController,
    moduleRequest,
    temperature,
    statistic,
    moving
};
