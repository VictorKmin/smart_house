const Telegraf = require('node-telegram-bot-api');

const {TELEGRAM} = require('../../constants');

module.exports = new Telegraf(TELEGRAM.API_SECRET, {polling: true});
