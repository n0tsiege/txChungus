//Requires
const modulename = 'latest';
const { emojify, anyUndefined, pickRandom } = require("../lib/utils");
const { MessageEmbed } = require("discord.js");
const { dir, log, logOk, logWarn, logError } = require('../lib/console')(modulename);

//Consts
const waitGifs = [
    'https://tenor.com/view/shaquille-o-neal-excited-shaking-cant-wait-gif-13783587',
    'https://tenor.com/view/soon-okay-real-soon-very-quickly-in-a-second-just-a-moment-gif-15029375',
    'https://tenor.com/view/daddys-home2-daddys-home2gifs-jon-lithgow-reunion-waiting-gif-9683398',
    'https://tenor.com/view/cat-driving-serious-cat-driving-hold-on-gif-16076083',
    'https://tenor.com/view/judge-judy-double-time-faster-hurry-gif-7566976',
    'https://tenor.com/view/mr-bean-checking-time-waiting-gif-11570520',
    'https://tenor.com/view/off-work-almost-sleepy-gif-13396687',
]


module.exports = {
    description: 'Send instructions for the latest FXserver + txAdmin.',
    aliases: ['update', 'u'],
    async execute(message, args, config) {
        //Well, let's state the obvious: editing here is not ideal, but that's how we gonna do!
        const latest = 'v3.8.0';
        const available = true;
        const fxVer = 3957;
        const fxWin = 'https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/3957-0f5390b6be313fdb49605de4e69d3985d5e0ad1b/server.7z';
        const fxLin = 'https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/3957-0f5390b6be313fdb49605de4e69d3985d5e0ad1b/fx.tar.xz';

        //If mention
        let mentionString = '';
        if (message.mentions.users.size) {
            mentionString = message.mentions.users.map(x => `<@${x.id}>`).join(' ');
        }

        if(message.channel.id === '577993483600658436'){
            await message.reply(`Please use <#589106731376836608>.`);
            await message.delete();
            return;
        }


        //Preparing the message
        let updateMessage;
        if (available) {
            updateMessage = `${mentionString} **To update to ${latest} you just need to update to artifact ${emojify(fxVer)}!**
Please use the two links below to download that _specific_ version:
<:windows:791692679419265044> ${fxWin}
<:linux:780972840454979604> ${fxLin}`;
        } else {
            const gifLink = pickRandom(waitGifs);
            updateMessage = `${mentionString} The ${latest} will be available very very soon!\n${gifLink}`;
        }

        return message.channel.send(updateMessage);
    },
};
