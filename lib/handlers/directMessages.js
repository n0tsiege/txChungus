//Requires
const modulename = 'DM';
const fs = require('fs');
const { dir, log, logOk, logWarn, logError } = require('../console')(modulename);
const { pickRandom } = require("../utils");

let facts;
try {
    const factsFile = fs.readFileSync('data/facts.txt', 'utf8');
    facts = factsFile.trim().split('\n');
} catch (error) {
    logError('Failed to load facts.txt');
    dir(error);
    process.exit(1);
}


module.exports = DirectMessagesHandler = async (message, txChungus) =>{
    logWarn(`[${message.author.tag}] ${message.content}`);
    return message.reply(`Fun fact:\n> ${pickRandom(facts)}`);
}
