process.on('message', () => {
    setInterval(checkModules, 2000);
});
async function checkModules() {
    console.log('Check module');
    const postgres = new require('../dataBase').getInstance();
    postgres.setModels();
    const RoomInfo = postgres.getModel('RoomInfo');
    if (RoomInfo) {
        const allRooms = await RoomInfo.findAll({});
        for (const allRoom of allRooms) {
            let {roomid, lastresponse} = allRoom;
            let currentTime = Date.now();
            console.log(currentTime - lastresponse , roomid);
            if (currentTime - lastresponse > 300000) {
                throw new Error(`Module in room ${roomid} is dead !`)
            }
        }
    }
}
