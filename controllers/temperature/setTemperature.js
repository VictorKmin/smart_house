const sendReq = require('../../helpers/sendRequest');
const chalk = require('chalk');

module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomInfo = postgres.getModel('RoomInfo');
        if (!RoomInfo) throw new Error('Cant connect to DataBase. Code: 1');
        const {id, temp} = req.query;
        if (!id || !temp) throw new Error('Something wrong with request. Code: 1');

        //Update room
        await RoomInfo.update({
            temp
        }, {
            where: {
                roomid: id
            }
        });

        const {deviceip} = await RoomInfo.findByPk(id);
        if (!deviceip) throw new Error('We have not this room in database. Code 5');

        sendReq(deviceip, temp);

        res.json({
            success: true,
            statusCode: 200,
            message: 'OK'
        })
    } catch (e) {
        console.log(chalk.bgRed(e.message))
    }
};