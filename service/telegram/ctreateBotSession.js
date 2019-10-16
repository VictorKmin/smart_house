const bot = require('./createNewBot').getBot();
const {TELEGRAM} = require('../../constants');

module.exports = () => {
    console.log(22);
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        TELEGRAM.CHAT = chatId;

        console.log(chatId);
        bot.sendMessage(chatId, 'Received your message');
    });
}
