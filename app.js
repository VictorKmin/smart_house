const express = require('express');
const {fork} = require('child_process');
const bodyParser = require('body-parser');
const {resolve: resolvePath} = require('path');
const mainController = require('./router/main');
// const cron = require('node-cron');
// const clearDatabase = require('./helpers/clearDatabase');
const getStatistic = require('./router/statistics');
const apiRouter = require('./router/api/setTemp');
const postgres = new require('./dataBase').getInstance();
postgres.setModels();
const app = express();

app.set('postgres', postgres);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use('/', mainController);
app.use('/stat', getStatistic);
app.use('/api', apiRouter);

/**
 * Child-process to working with Modules
 * Sending request to check temperature in room;
 * Check is our module is alive
 */
(() => {
    console.log('Start modules');
    const isModuleAlive = fork(resolvePath('./microservices/checkModules'));
    // const sendTempRequest = fork(resolvePath('./microservices/sendTempRequest'));
    isModuleAlive.send('startCheck');
    // sendTempRequest.send('sendReq');
})();

/**
 * This method clear old records in statistics table
 * Method running once time
 * "Old records" is records who older than 1 month
 */
// cron.schedule('0 0 1 * *', () => {
//     clearDatabase(postgres)
// });

app.listen(5000, (ok, err) => {
    if (err) console.log(err);
    else console.log('Listen 5000');
});