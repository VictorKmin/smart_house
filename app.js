const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const {fork} = require('child_process');
const {resolve: resolvePath} = require('path');
// const cron = require('node-cron');
// const clearDatabase = require('./helpers/clearDatabase');

app.use(express.json());

const postgres = require('./dataBase/index').getInstance();
postgres.setModels()

const moduleRequest = require('./controllers/moduleRequest');
const getRooms = require('./controllers/statistic/lastRoomStat');
const getFullStat = require('./controllers/statistic/fullStatisticByDate');
const changeRoomTemp = require('./controllers/temperature/setTemperature');
const getOneRoomStat = require('./controllers/statistic/getOneRoomStat');
const getDaysCount = require('./helpers/getCountOfDays');
const statisticInserter = require('./controllers/dataBaseController');

let s;

io.on("connection", socket => {
    s = socket;
    socket.on('getRoom', async () => {
        socket.emit('rooms', await getRooms())
    });

    socket.on('buildChart', async body => {
        socket.emit('charts', await getFullStat(body));
        socket.emit('timeLine', await getDaysCount(body.roomId));
    });

    socket.on('changeTemp', async body => {
        changeRoomTemp(body.roomId, body.temp)
            .then(async value => {
                await statisticInserter(JSON.parse(value))
            })
            .then(() => {
                return getOneRoomStat(body.roomId)
            })
            .then(value => {
                socket.emit('lastRoomStat', value);
            })
    });
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    req.socket = s;
    next();
});

app.use('/', moduleRequest);

/**
 * Child-process to working with Modules
 * Sending request to check temperature in room;
 * Check is our module is alive
 */
(() => {
    const isModuleAlive = fork(resolvePath('./microservices/checkModules'));
    isModuleAlive.send('start');

    // const sendTempRequest = fork(resolvePath('./microservices/sendTempRequest'));
    // sendTempRequest.send('sendReq');

    console.log('Child process started !');
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