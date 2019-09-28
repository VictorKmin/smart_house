const db = require('../../dataBase').getInstance();

const MovingModel = db.getModel('Moving');

module.exports = {
    create: async movingObject => {
        return MovingModel.create(movingObject)
    }
};
