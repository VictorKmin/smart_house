const {roomService} = require('../../service');

class BotController {
  getRoomsInfo = async (req, res) => {
    const rooms = await roomService.getAllRooms();

    res.json(rooms)
  }
}

module.exports = new BotController();
