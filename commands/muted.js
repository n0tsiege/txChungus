//Requires
const modulename = "unmute";
const { cloneDeep } = require('lodash');
const { codeBlock } = require("../lib/utils");
const { dir, log, logOk, logWarn, logError } = require('../lib/console')(modulename);
const humanizeDuration = require("humanize-duration");

//Consts
const hour = 60 * 60 * 1000;
const day = 24 * hour;
const week = 7 * day;

const durationOptions = {
    round: true,
    largest: 2,
    spacer: "",
    language: "shortEn",
    languages: {
        shortEn: {
            y: () => "y",
            mo: () => "mo",
            w: () => "w",
            w: () => "w",
            d: () => "d",
            h: () => "h",
            m: () => "m",
            s: () => "s",
        },
    },
};


module.exports = {
    description: 'Lists all the mutes',
    async execute(message, args, config) {
        //Check permission
        if (!config.commands.admins.includes(message.author.id)) {
            return message.reply(`You're not allowed to use this command`);
        }
        const guild = message.guild;
        const showFull = (args.length && args[0] == 'full');

        try {
            await guild.members.fetch();
        } catch (error) {
            return await message.channel.send(`Could not refresh members cache.`);
        }


        //Calculating ranges
        let mutedAndLeft = 0;
        const now = Date.now();
        const mutedLessHour = [];
        const mutedLessDay = [];
        const mutedLessWeek = [];
        const mutedOverWeek = [];
        const mutes = cloneDeep(GlobalData.tempRoles).filter(t => t.role == 'muted');

        if (!mutes.length) {
            return await message.channel.send(`Nobody is muted right now.`);
        }

        mutes.forEach(mutedUser => {
            const expiration = mutedUser.expire - now;
            const member = guild.members.cache.get(mutedUser.id);
            if (member) {
                mutedUser.member = member;
                if (expiration < hour) {
                    mutedLessHour.push(mutedUser);
                } else if (expiration < day) {
                    mutedLessDay.push(mutedUser);
                } else if (expiration < week) {
                    mutedLessWeek.push(mutedUser);
                } else {
                    mutedOverWeek.push(mutedUser);
                }
            } else {
                mutedAndLeft++;
            }
        });

        const muteRangeInfo = (range) => {
            if (range.length) {
                const out = [];
                for (let i = 0; i < range.length; i++) {
                    const mute = range[i];
                    const memberName = mute.member.displayName || 'unknown';
                    const expTime = humanizeDuration(mute.expire - now, durationOptions).padStart(7, ' ');
                    const expTimeTag = `[${expTime}]`;
                    out.push(` ➤ ${codeBlock(expTimeTag)} ${codeBlock(memberName)}: ${mute.reason};`);
                }
                return out.join('\n');
            } else {
                return ` ➤ Nobody... yet :eyes:`;
            }
        }

        //Message time :)
        const messageLines = []
        if (mutedLessHour.length || showFull) {
            messageLines.push(
                `:zipper_mouth: **Expiration in less than one hour:**`,
                muteRangeInfo(mutedLessHour),
                null,
            );
        }
        if (mutedLessDay.length || showFull) {
            messageLines.push(
                `:zipper_mouth: **Expiration in less than one day:**`,
                muteRangeInfo(mutedLessDay),
                null,
            );
        }
        if (mutedLessWeek.length || showFull) {
            messageLines.push(
                `:zipper_mouth: **Expiration in less than one week:**`,
                muteRangeInfo(mutedLessWeek),
                null,
            );
        }
        if (mutedOverWeek.length || showFull) {
            if (showFull) {
                messageLines.push(
                    `:zipper_mouth: **Lol forget about those losers:**`,
                    muteRangeInfo(mutedOverWeek),
                    null,
                );
            } else {
                messageLines.push(`<:rip:740790507432574987> **${mutedOverWeek.length} losers that we will never remember**`);
            }
        }
        if (mutedAndLeft) {
            messageLines.push(`<:pog:796969505540538378> **${mutedAndLeft} who bitched out...**`);
        }
        return await message.channel.send(messageLines.join('\n'));
    },
};
