//Requires
const modulename = 'left';
const humanizeDuration = require('humanize-duration');
const { dir, log, logOk, logWarn, logError } = require('../lib/console')(modulename);

module.exports = {
    description: 'How much time left to something',
    async execute(message, args, config) {
        // return await message.reply(`no`);
        const mentionString = message.mentions.users.map(x => `<@${x.id}>`).join(' ');
        const timeleft = humanizeDuration(1622318400000 - Date.now());
        await message.channel.send(`${mentionString} 
**Time until menu delivery deadline:**
${timeleft}`);
    }
};
