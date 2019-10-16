const Telegraf = require('node-telegram-bot-api');

const {TELEGRAM} = require('../../constants');

module.exports = {
    getBot: () => {
        let bot;

        if (!bot) {
            bot = new Telegraf(TELEGRAM.API_SECRET, {polling: true});
        }

        return bot
    }
}
