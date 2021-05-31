//Requires
const modulename = 'latest';
const { emojify, anyUndefined } = require("../lib/utils");
const { MessageEmbed } = require("discord.js");
const { dir, log, logOk, logWarn, logError } = require('../lib/console')(modulename);


module.exports = {
    description: 'Send instructions for the latest FXserver + txAdmin.',
    aliases: [],
    async execute(message, args, config) {
        //Check if we have the data
        if (anyUndefined(
            GlobalData.fxserverVersions.windows,
            GlobalData.fxserverVersions.linux
        )) {
            return message.reply('IDK, FiveM stuff might be offline or something...');
        }

        const tplWindows = 'FXServer windows versions info:\n```json\n{{replace}}```\n';
        const outWindows = tplWindows.replace('{{replace}}', JSON.stringify(GlobalData.fxserverVersions.windows, null, 2));
        message.channel.send(outWindows);
        const tplLinux = 'FXServer linux versions info:\n```json\n{{replace}}```\n';
        const outLinux = tplLinux.replace('{{replace}}', JSON.stringify(GlobalData.fxserverVersions.linux, null, 2));
        message.channel.send(outLinux);
    },
};
