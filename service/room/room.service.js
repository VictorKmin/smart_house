const db = require('../../dataBase').getInstance();
const RoomModel = db.getModel('RoomInfo');

module.exports = {
    create: async roomObject => {
        return RoomModel.create(roomObject)
    },

    findRoomById: async room_id => {
        const room = await RoomModel.findByPk(room_id);

        return room && room.dataValues
    },

    updateRoomById: async (room_id, patchObject) => {
        return RoomModel.update(patchObject, {where: {room_id}})
    }

};
