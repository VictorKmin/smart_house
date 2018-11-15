let express = require('express');
let app = express();
let mainController = require('./controllers/mainController');
let getStatistic = require('./controllers/getStatistic');
const postgres = new require('./dataBase').getInstance();
postgres.setModels();
app.set('postgres', postgres);

app.use('/', mainController);
app.use('/stat', getStatistic);
// app.get('/stat', (req,res) => res.end('FGSD'));

app.listen(5000, (ok, err) => {
    if (err) console.log(err);
    else console.log('Listen 5000');
});