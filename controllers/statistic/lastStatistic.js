module.exports = async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        const RoomsInfo = postgres.getModel('RoomInfo');
            // Achtung Achtung Achtung
            //
            let resp = [];
            const allRoomsIds = await RoomsInfo.findAll({});
            for (const allRoomsId of allRoomsIds) {
                const {roomid, temp, deviceip} = allRoomsId.dataValues;
                const statisticByRoom = await RoomStatistics.findOne({
                    order: [['id', 'DESC']],
                    where: {
                        roomid
                    },
                });
                let {roomid: id, status, fulldate} = statisticByRoom.dataValues;
                let respObj = {id, room_temp, status, temp, deviceip, fulldate};
                resp.push(respObj)
            }
            res.json(resp)

    } catch (e) {
        res.json({
            success: false,
            message: e.message
        })
    }
};