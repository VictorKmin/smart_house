const express = require('express');
const app = express();
const {fork} = require('child_process');
const bodyParser = require('body-parser');
const {resolve: resolvePath} = require('path');
const mainController = require('./router/main');
const getStatistic = require('./router/statistics');
const postgres = new require('./dataBase').getInstance();
postgres.setModels();

app.set('postgres', postgres);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', mainController);
app.use('/stat', getStatistic);

/**
 * Child-process to working with Modules
 * Sending request to check temperature in room;
 * Check is our module is alive
 */
(() => {
    console.log('Start modules');
    const isModuleAlive = fork(resolvePath('./helpers/checkModules'));
    const sendTempRequest = fork(resolvePath('./helpers/sendTempRequest'));
    isModuleAlive.send('startCheck');
    sendTempRequest.send('sendReq');
})();


app.listen(5000, (ok, err) => {
    if (err) console.log(err);
    else console.log('Listen 5000');
});