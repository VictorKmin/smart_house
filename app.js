const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const {fork} = require('child_process');
const {resolve: resolvePath} = require('path');
// const cron = require('node-cron');

// const clearDatabase = require('./helpers/clearDatabase')
const {moduleRequest, dbController, statistic, temperature} = require('./controllers');
const {movingRouter} = require('./routes');
const {getCountOfDays} = require('./helpers');
const postgres = require('./dataBase').getInstance();

app.use(express.json());

postgres.setModels();

let s;

io.on("connection", socket => {
    s = socket;
    socket.on('getRoom', async () => {
        socket.emit('rooms', await statistic.lastRoomStat())
    });

    socket.on('buildChart', async body => {
        socket.emit('charts', await statistic.fullStatisticByDate(body));
        socket.emit('timeLine', await getCountOfDays(body.roomId));
    });

    socket.on('changeTemp', async body => {
        temperature.setTemperature(body.roomId, body.temp)
            .then(async value => {
                await dbController.dbController(JSON.parse(value))
            })
            .then(() => {
                return statistic.getOneRoomStat(body.roomId)
            })
            .then(value => {
                socket.emit('lastRoomStat', value);
            })
            .catch(reason => {
                console.error(reason)
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

app.use('/moving', movingRouter);
app.use('/', moduleRequest);

/**
 * Child-process to working with Modules
 * Sending request to check temperature in room;
 * Check is our module is alive
 */
(() => {
    const isModuleAlive = fork(resolvePath('./microservices/checkModules'));
    isModuleAlive.send('start');

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

http.listen(5000, err => {
    if (err) console.log(err);
    else {
        console.log('Listen 5000');
        console.log(`██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗    ████████╗ ██████╗     ███████╗███╗   ███╗ █████╗ ██████╗ ████████╗    ██╗  ██╗ ██████╗ ██╗   ██╗███████╗███████╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝    ╚══██╔══╝██╔═══██╗    ██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝    ██║  ██║██╔═══██╗██║   ██║██╔════╝██╔════╝
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗         ██║   ██║   ██║    ███████╗██╔████╔██║███████║██████╔╝   ██║       ███████║██║   ██║██║   ██║███████╗█████╗  
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝         ██║   ██║   ██║    ╚════██║██║╚██╔╝██║██╔══██║██╔══██╗   ██║       ██╔══██║██║   ██║██║   ██║╚════██║██╔══╝  
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗       ██║   ╚██████╔╝    ███████║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║       ██║  ██║╚██████╔╝╚██████╔╝███████║███████╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝       ╚═╝    ╚═════╝     ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚══════╝╚══════╝`);
    }
});
