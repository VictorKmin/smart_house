const express = require('express');
const app = express();
const {fork} = require('child_process');
const {resolve: resolvePath} = require('path');


const mainController = require('./controllers/mainController');
const getStatistic = require('./router/statistics');
const postgres = new require('./dataBase').getInstance();
postgres.setModels();
app.set('postgres', postgres);

app.use('/', mainController);
app.use('/stat', getStatistic);

(() => {
    console.log('Start modules');
    const isModuleAlive = fork(resolvePath('./helpers/checkModules'));
    const sendTempRequest = fork(resolvePath('./helpers/sendTempRequest'));
    isModuleAlive.send('startCheck');
    sendTempRequest.send('sendReq')
})();


app.listen(5000, (ok, err) => {
    if (err) console.log(err);
    else console.log('Listen 5000');
});