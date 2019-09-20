const db = require('../../dataBase').getInstance();
const RoomModel = db.getModel('RoomInfo');

module.exports = {
    create: async roomObject => {
        return RoomModel.create(roomObject)
    },

    findRoomById: async roomId => {
        const room = await RoomModel.findByPk(roomId);

        return room && room.dataValues
    },

    updateRoomById: async (roomid, patchObject) => {
        return RoomModel.update(patchObject, {where: {roomid}})
    }

};
