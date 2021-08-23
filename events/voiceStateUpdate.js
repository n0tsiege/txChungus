//Requires
const modulename = 'voice';
const { dir, log, logOk, logWarn, logError } = require('../lib/console')(modulename);


module.exports = {
    async execute (config, oldState, newState) {
        const guild = oldState.guild;
        const member = await guild.members.fetch(newState.id);
        
        if(newState.channelID == null){
            const oldChannel = await guild.channels.cache.find(c => c.id == oldState.channelID);
            log(`[${member.user.tag}] just left '${oldChannel.name}'`);
        }else if(oldState.channelID !== newState.channelID){
            const newChannel = await guild.channels.cache.find(c => c.id == newState.channelID);
            log(`[${member.user.tag}] just joined '${newChannel.name}'`);
        }
    },
};
