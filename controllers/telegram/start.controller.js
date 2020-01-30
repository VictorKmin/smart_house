const {telegramService} = require('../../service');
const {TELEGRAM: {CHAT}} = require('../../constants');
const bot = telegramService.getBotInstance;

module.exports = async () => {
  await bot.sendMessage(CHAT, 'hello', {
    reply_markup: {
      keyboard: [['Get room statistic']],
      one_time_keyboard: true
    }
  })
};
