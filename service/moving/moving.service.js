const db = require('../../dataBase').getInstance();

module.exports = {
    create: async movingObject => {
        const MovingModel = db.getModel('Moving');
        return MovingModel.create(movingObject)
    }
};
