const bot = require('./getBotInstance');
const {TELEGRAM} = require('../../constants');

module.exports = async () => {
  await bot.sendMessage(TELEGRAM.CHAT,
    'MOVING DETECTED',
    {
      reply_markup: {
        keyboard: [['Turn Off'], ['Show cameras']]
      }
    })
};
