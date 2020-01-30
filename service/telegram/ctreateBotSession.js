const chalk = require('chalk');

const bot = require('./getBotInstance');
const {TELEGRAM: {CHAT}} = require('../../constants');
// const {telegram} = require('../../controllers');
const {roomService} = require('../../service');

module.exports = () => {
    console.log(chalk.magentaBright('Session with telegram is created'));

    bot.sendMessage(CHAT, "BOT IS READY ");

    bot.onText(/\/start/, async () => {
        await bot.sendMessage(CHAT, 'hello', {
            reply_markup: {
                keyboard: [['Get room statistic']],
                one_time_keyboard: true
            }
        })
    });

    bot.onText(/Get room statistic/,  async () => {
        console.log(22);
        const rooms = await roomService.getAllRooms();

        return bot.sendMessage(CHAT, JSON.stringify(rooms))
    })
};
