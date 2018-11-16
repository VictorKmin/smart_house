
process.on('message', () => {
    setInterval(sendReqToModules, 2001);
});

// TODO REQUEST !
async function sendReqToModules() {
    const postgres = new require('../dataBase').getInstance();
    postgres.setModels();
    const RoomInfo = postgres.getModel('RoomInfo');

}
