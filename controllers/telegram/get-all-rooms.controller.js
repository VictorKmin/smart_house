const {telegramService, roomService} = require('../../service');
const {TELEGRAM: {CHAT}} = require('../../constants');
const bot = telegramService.getBotInstance;

module.exports = async () => {
  const rooms = await roomService.getAllRooms();

  return bot.sendMessage(CHAT, JSON.stringify(rooms))
};
