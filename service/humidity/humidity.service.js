const db = require('../../dataBase').getInstance();
const Humidity = db.getModel('HumidityInfo');

module.exports = {
  create: humidityObject => {
    return Humidity.create(humidityObject)
  },

  destroyByParams: destroyObject => {
    return Humidity.destroy({
      where: destroyObject
    })
  },

  getAllInfoByParams: (paramObject = {}, sort = 'id', order, limit = '', offset = '') => {
    order = order === 'DESC' ? 'DESC' : 'ASC';

    return Humidity.findAll({
      where: paramObject,
      order: [sort, order],
      limit,
      offset,
      raw: true
    })
  },

  findLastTempByRoomID(room_id) {
    return Humidity.findOne({where: {room_id}, raw: true})
  }
}
