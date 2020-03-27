const db = require('../../dataBase').getInstance();

module.exports = {
  create: humidityObject => {
    const Humidity = db.getModel('HumidityInfo');

    return Humidity.create(humidityObject)
  },

  destroyByParams: destroyObject => {
    const Humidity = db.getModel('HumidityInfo');

    return Humidity.destroy({
      where: destroyObject
    })
  },

  destroyById: id => {
    const Humidity = db.getModel('HumidityInfo');

    return Humidity.destroy({
      where: {id}
    })
  },

  getRoomsLastTwoValues(room_id) {
    const Humidity = db.getModel('HumidityInfo');

    return Humidity.findAll({
      order: [['id', 'DESC']],
      limit: 2,
      where: {room_id}
    })
  },

  getAllInfoByParams: (paramObject = {}, sort = 'id', order, limit = 0, offset = 0) => {
    const Humidity = db.getModel('HumidityInfo');

    order = order === 'DESC' ? 'DESC' : 'ASC';

    return Humidity.findAll({
      where: paramObject,
      order: [[sort, order]],
      limit,
      offset,
      raw: true
    })
  },

  findLastTempByRoomID(room_id) {
    const Humidity = db.getModel('HumidityInfo');

    return Humidity.findOne({where: {room_id}, raw: true})
  }
}
