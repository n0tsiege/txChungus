//Requires
const modulename = 'schedule';
const humanizeDuration = require('humanize-duration');
const { dir, log, logOk, logWarn, logError } = require('../lib/console')(modulename);

//Consts
const durationOptions = {
    round: true,
    largest: 2,
};

//TODO: change here
//Format: vername: [txVerBBLastUpdate, txVerBBDelta]
const schedule = [
    ['v3.7.0', 1619440000, 35],
    ['v3.8.0', 1621233333, 21],
    ['v4.0.1', 1622456789, 21],
    ['v4.1.0', 1622456789, 21],
    ['v4.2.0', 1624287000, 21],
    ['v4.3.0', 1624287000, 21],
    ['v4.3.1', 1624287000, 21],
    ['v4.4.0', 1626198000, 21],
    ['v4.4.1', 1626198000, 21],
    ['v4.4.2', 1628000000, 34],
]

module.exports = {
    description: 'Shows the update deadline schedule.',
    async execute(message, args, config) {
        const showZap = (args.length && args[0] == 'zap');
        const now = Date.now();
        const outLines = schedule.map(([ver, txVerBBLastUpdate, deltaDays]) => {
            const txVerBBDelta = deltaDays + ((showZap) ? 10 : 0);
            const txAdminVersionBestBy = (txVerBBLastUpdate + (txVerBBDelta * 86400))*1000;
            // dir({ver, txVerBBLastUpdate, txVerBBDelta, txAdminVersionBestBy})
            const timeDiff = now - txAdminVersionBestBy;
            if(timeDiff > 0){
                return `**${ver}**: ${new Date(txAdminVersionBestBy).toLocaleString()}`;
            }else{
                return `**${ver}**: in ${humanizeDuration(timeDiff, durationOptions)}`;
            }
        }).join('\n');

        const mentionString = message.mentions.users.map(x => `<@${x.id}>`).join(' ');
        const title = (showZap)? 'Scheduled ZAP update deadlines' : 'Scheduled update deadlines';
        await message.channel.send(`${mentionString} **${title}:**\n${outLines}`);
    }
};
