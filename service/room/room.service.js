const mariaDB = require('../../dataBase').getInstance();

module.exports = {
    create: (roomObject) => {
        const RoomInfo = mariaDB.getModel('RoomInfo');

        return RoomInfo.create(roomObject)
    },

    findRoomById: async (id) => {
        const RoomInfo = mariaDB.getModel('RoomInfo');

        const room = await RoomInfo.findByPk(id);

        return room && room.dataValues
    },

    updateRoomById: (id, patchObject) => {
        const RoomInfo = mariaDB.getModel('RoomInfo');

        return RoomInfo.update(patchObject, {where: {id}})
    },

    getAllRooms: () => {
        const RoomInfo = mariaDB.getModel('RoomInfo');

        return RoomInfo.findAll();
    }
};
