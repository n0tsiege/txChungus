const codeBlock = (msg) => `\`${msg}\``;

const emojify = (src) => {
    return src.toString()
        .replace(/0/g, ':zero:')
        .replace(/1/g, ':one:')
        .replace(/2/g, ':two:')
        .replace(/3/g, ':three:')
        .replace(/4/g, ':four:')
        .replace(/5/g, ':five:')
        .replace(/6/g, ':six:')
        .replace(/7/g, ':seven:')
        .replace(/8/g, ':eight:')
        .replace(/9/g, ':nine:')
}

const anyUndefined = (...args) => [...args].some(x => (typeof x === 'undefined'));

const pickRandom = (opts) => opts[Math.floor(Math.random() * opts.length)];

module.exports = {
    codeBlock,
    emojify,
    anyUndefined,
    pickRandom,
};
