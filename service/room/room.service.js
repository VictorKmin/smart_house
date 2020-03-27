const mariaDB = require('../../dataBase').getInstance();

module.exports = {
    create: (roomObject) => {
        const RoomInfo = mariaDB.getModel('RoomInfo');

        return RoomInfo.create(roomObject)
    },

    findRoomById: id => {
        const RoomInfo = mariaDB.getModel('RoomInfo');

        return  RoomInfo.findByPk(id, {raw: true});
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
