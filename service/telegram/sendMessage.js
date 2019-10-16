const bot = require('./createNewBot').getBot();
const {TELEGRAM} = require('../../constants');

module.exports = async () => {
    const chatId = TELEGRAM.CHAT;

    console.log(chatId);
    await bot.sendMessage(chatId, 'MOVING DETECTED')
}
