const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // let r = 0;
        // let num = 5123;
        // while (num) {
        //     console.log(`${r}  ПРЕША ТОЧКА`);
        //     console.log(`${num}  ПЕРША ТОЧКА NUM`);
        //     console.log(`________________________`);
        //     r = r * 10;
        //     console.log(`${r}  ДРУГА ТОЧКА`);
        //     console.log(`${num}  ДРУГА ТОЧКА NUM`);
        //     console.log(`________________________`);
        //
        //     r = r + num % 10;
        //     console.log(`${r}  ТРЕТЯ ТОЧКА R`);
        //     console.log(`${num}  ТРЕТЯ ТОЧКА NUM`);
        //     console.log(`________________________`);
        //
        //     num = Math.floor(num / 10);
        //     console.log(`${r}  ЧЕТВЕРТА ТОЧКА R`);
        //     console.log(`${num}  ЧЕТВЕРТА ТОЧКА NUM`);
        //     console.log(`________________________`);
        // }
        // console.log(r);
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
        console.log('DATA INSERT INTO STATISTICS')

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