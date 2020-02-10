const chalk = require('chalk');

const postgres = require('../../dataBase').getInstance();
const {co2Service, roomService, humidityService} = require('../../service');

/**
 * This method takes last statistic by one room in database
 * @returns {Promise<{id: *, room_temp: *, heater_status: *, auto_mode: *, temp: *, device_ip: *, is_alive: *, humidity: *}>}
 */
module.exports = async roomId => {
  try {
    const TemperatureStat = postgres.getModel('TemperatureStat');

    const room = await roomService.findRoomById(roomId);
    if (!room) throw new Error('Sorry. We have not rooms in database. Code: 5');

    const {id: room_id, temp, device_ip, is_alive, auto_mode} = room;
    const temperatureInfo = await TemperatureStat.findOne({
      order: [['id', 'DESC']],
      where: {
        room_id
      },
      raw: true
    });
    const humidityInfo = await humidityService.findLastTempByRoomID(room_id);

    const co2 = await co2Service.getCO2ByParams({room_id}, 'id', 'DESC');

    let {room_id: id, heater_status, room_temp, full_date} = temperatureInfo;
    let {humidity} = humidityInfo;

    return {
      id,
      room_temp,
      heater_status,
      auto_mode,
      temp,
      device_ip,
      is_alive,
      humidity,
      co2,
      full_date
    };
  } catch (e) {
    console.log(chalk.bgRed(e.message));
  }
};
