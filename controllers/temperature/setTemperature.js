const sendReq = require('../../helpers/sendRequest');

module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomInfo = postgres.getModel('RoomInfo');
        const {id, temp} = req.query;

        //Update room
        await RoomInfo.update({
            temp
        }, {
            where: {
                roomid:id
            }
        });

       const {deviceip} = await RoomInfo.findByPk(id);

        sendReq(deviceip, temp);

        res.json({
            success: true,
            statusCode: 200,
            message: 'OK'
        })
    } catch (e) {
        throw new Error(e.message)
    }

};