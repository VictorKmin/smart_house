const sendReq = require('../../helpers/sendRequest');
const chalk = require('chalk');

module.exports = async (req, res) => {
    try {
        const io = req.io;
        const postgres = req.app.get('postgres');
        const RoomInfo = postgres.getModel('RoomInfo');
        if (!RoomInfo) throw new Error('Cant connect to DataBase. Code: 1');
        const {id, temp} = req.query;
        if (!id || !temp) throw new Error('Something wrong with request. Code: 1');

        if (temp == 0) {
            await RoomInfo.update({
                auto_mode: false
            }, {
                where: {
                    roomid: id
                }
            });
        } else {
            //Update room
            await RoomInfo.update({
                temp,
                auto_mode: true
            }, {
                where: {
                    roomid: id
                }
            });
        }


        const {deviceip} = await RoomInfo.findByPk(id);
        if (!deviceip) throw new Error('We have not this room in database. Code 5');

        sendReq(deviceip, temp, io);

        res.json({
            success: true,
            statusCode: 200,
            message: 'OK'
        })
    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }
};