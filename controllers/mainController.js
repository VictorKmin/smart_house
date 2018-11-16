const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const postgres = req.app.get('postgres');
        const RoomInfo = postgres.getModel('RoomInfo');
        const RoomStatistics = postgres.getModel('RoomStatistics');
        const {id: roomid, ip: deviceIp, temp} = req.query;
        console.log(`${roomid}    ROOM ID`);
        console.log(`${deviceIp}   DEVICE IP`);
        console.log(`${temp}   TEMPERATURE`);
        // // current date to UTC+2
        // let currentDate = new Date();
        // currentDate.setHours(currentDate.getHours()+2);

        // let time  = new Date().toLocaleTimeString();
        // let day = new Date().toLocaleDateString();
        // let date = (`${day} ${time}`);
        // console.log(date);

        //find room by ID
        let isRoomInDB = await RoomInfo.findOne({
            where: {
                roomid
            }
        });
        //If we have not room - create it
        if (!isRoomInDB) {
            await RoomInfo.create({
                roomid,
                deviceip: deviceIp,
                lastresponse: Date.now()
            });
            console.log('NEW ROOM IS CREATED');
        }
        // If room is present - update ip address and last response time
        await RoomInfo.update({
            deviceip: deviceIp,
            lastresponse: Date.now()
        }, {
            where: {
                roomid
            }
        });
        console.log('ROOM IS UPDATED');

        await RoomStatistics.create({
            roomid,
            temp,
            time: Date.now()
        });
        console.log('DATA INSERT INTO STATISTICS');

        res.json('OK')
    }
    catch (e) {
        res.json({
            success: false,
            message: e
        })
    }
});

module.exports = router;