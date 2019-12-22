const chalk = require('chalk');

const bot = require('./createNewBot').getBot();
const {TELEGRAM} = require('../../constants');

module.exports = () => {
    console.log(chalk.magentaBright('Session with telegram is created'));
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;

        TELEGRAM.CHAT = chatId;

        console.log(chatId);
        bot.sendMessage(chatId, 'Received your message');
    });
}
