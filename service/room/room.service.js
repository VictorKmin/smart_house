const db = require('../../dataBase').getInstance();
const RoomModel = db.getModel('RoomInfo');

class RoomService {
    async create(roomObject){
        return RoomModel.create(roomObject)
    }

    async findRoomById(room_id) {
        const room = await RoomModel.findByPk(room_id);

        return room && room.dataValues
    }

    async updateRoomById (room_id, patchObject) {
        return RoomModel.update(patchObject, {where: {room_id}})
    }

    getAllRooms() {
        return RoomModel.findAll();
    }

}

module.exports = new RoomService();
