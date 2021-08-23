const chalk = require('chalk');
// const colorize = require('json-colorizer');
const dateFormat = require('dateformat');
const header = 'txChungus';

//Helpers
const getConCtx = (ctx) => { 
    const fullCtx = (ctx !== null)? ctx : header;
    const ts = dateFormat(new Date(), 'HH:MM:ss');
    return `[${ts}][${fullCtx}]`;
};

//Colorize settings:
const colorizeSettings = {
    pretty: true,
    colors: {
        BRACE: 'white',
        BRACKET: 'white',
        COLON: 'white',
        COMMA: 'white',
        STRING_KEY: '#FF450',
        STRING_LITERAL: 'cyan',
        NUMBER_LITERAL: 'green',
        BOOLEAN_LITERAL: 'blue',
        NULL_LITERAL: 'white',
    }
}


//================================================================
function log(msg='', context=null){
    const conCtx = getConCtx(context);
    console.log(chalk.bold.bgBlue(conCtx)+' '+msg);
    return `[INFO][${conCtx}] ${msg}`;
}

function logOk(msg='', context=null){
    const conCtx = getConCtx(context);
    console.log(chalk.bold.bgGreen(conCtx)+' '+msg);
    return `[OK][${conCtx}] ${msg}`;
}

function logWarn(msg='', context=null) {
    const conCtx = getConCtx(context);
    console.log(chalk.bold.bgYellow(conCtx)+' '+msg);
    return `[WARN][${conCtx}] ${msg}`;
}

function logError(msg='', context=null) {
    const conCtx = getConCtx(context);
    console.log(chalk.bold.bgRed(conCtx)+' '+msg);
    return `[ERROR][${conCtx}] ${msg}`;
}

function cleanTerminal(){
    process.stdout.write(`.\n`.repeat(80) + `\x1B[2J\x1B[H`);
}

function setTTYTitle(title){
    title = (title)? `${header}: ${title}` : header;
    process.stdout.write(`\x1B]0;${title}\x07`);
}

function dir(data){
    if(data instanceof Error){
        try {
            console.log(`${chalk.redBright(`[${header} Error]`)} ${data.message}`);
            if(typeof data.type !== 'undefined') console.log(`${chalk.redBright(`[${header} Error] Type:`)} ${data.type}`);
            if(typeof data.code !== 'undefined') console.log(`${chalk.redBright(`[${header} Error] Code:`)} ${data.code}`);
            data.stack.forEach(trace => {
                console.log(`    ${chalk.redBright('=>')} ${trace.file}:${trace.line} > ${chalk.yellowBright(trace.name || 'anonym')}`)
            });
        } catch (error) {
            console.dir(data)
        }
        console.log()
    }else{
        const div = "=".repeat(32);
        let printData;
        if(typeof data == 'undefined'){
            printData = chalk.keyword('moccasin').italic('> undefined');

        }else if(data instanceof Promise){
            printData = chalk.keyword('moccasin').italic('> Promise');

        }else if(typeof data == 'boolean'){
            if(data){
                printData = chalk.keyword('lawngreen')('true');
            }else{
                printData = chalk.keyword('orangered')('false');
            }

        }else if(typeof data == 'object'){
            console.log(chalk.cyan(div));
            console.dir(data)
            console.log(chalk.cyan(div));
            return;

        }else{
            printData = chalk.keyword('orange').italic(typeof data + ': ');
            if(typeof data == 'string'){
                printData += `"${data}"`;
    
            }else if(typeof data == 'number'){
                printData += chalk.green(data);
    
            }else if(typeof data == 'function'){
                printData += "\n";
                printData += data.toString();

            }else{
                console.log(chalk.cyan(div));
                console.dir(data)
                console.log(chalk.cyan(div));
                return;
            }
        }
        console.log(chalk.cyan([div, printData, div].join("\n")));
    }
}


//================================================================
module.exports = (ctx) => {
    const appendSubCtx = (sub) => {return (sub !== null)? `${ctx}:${sub}` : ctx};
    return {
        log: (x, subCtx = null) => log(x, appendSubCtx(subCtx)),
        logOk: (x, subCtx = null) => logOk(x, appendSubCtx(subCtx)),
        logWarn: (x, subCtx = null) => logWarn(x, appendSubCtx(subCtx)),
        logError: (x, subCtx = null) => logError(x, appendSubCtx(subCtx)),
        dir: (x, subCtx = null) => dir(x, appendSubCtx(subCtx)),
        cleanTerminal,
        setTTYTitle
    }
}
