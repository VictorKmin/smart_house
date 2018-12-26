const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

app.set('postgres', postgres);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
let s ;
io.on("connection", socket => {
    s = socket;
    socket.on('getRoom', function (msg) {
        console.log('___________________');
        console.log(msg);
        console.log('___________________');
    });
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

app.use((req, res, next) => {
    req.socket = s;
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

http.listen(5000, (err) => {
    if (err) console.log(err);
    else {
        console.log('Listen 5000');
        console.log(` _ _ _ ___ _   __ _  _   _ ___   ___ _    __ _   _  _  ___ ___    _  ___ ___ _  __ ___ 
| | | | __| | / _/ \\| \\_/ | __| |_ _/ \\  / _| \\_/ |/ \\| o |_ _|  / \\| __| __| |/ _| __|
| V V | _|| |( (( o | \\_/ | _|   | ( o ) \\_ | \\_/ | o |   /| |  ( o | _|| _|| ( (_| _| 
 \\_n_/|___|___\\__\\_/|_| |_|___|  |_|\\_/  |__|_| |_|_n_|_|\\\\|_|   \\_/|_| |_| |_|\\__|___|
                                                                                       `);
    }
});