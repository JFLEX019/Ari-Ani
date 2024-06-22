const { AnimeWallpaper } = require("anime-wallpaper");
const wall = new AnimeWallpaper();

module.exports = {
    name: "help",
    alias: ["h", "menu"],
    desc: "List all commands",
    category: "General",
    react: "✅",
    start: async (client, m, { commands, args, prefix, text, toUpper }) => {
        const { pushName, sender } = m;

        if (args[0]) {
            let name = args[0].toLowerCase();
            let cmd = commands.get(name) || Array.from(commands.values()).find(v => v.alias.includes(name));

            if (!cmd || cmd.type == "hide") {
                return m.reply("No Command Found");
            } else {
                let data = [
                    `╭─「 (づ￣ ³￣)づ 」*`,
                    `*│ ɴᴀᴍᴇ:* 𝐆𝐄𝐓𝐎-𝐁𝐎𝐓😈`,
                    `*│ ᴜsᴇʀ: @${pushName} {}⁩*`,
                    `*│ ᴘʀᴇғɪx:* "${prefix}"`,
                    `*│ ᴏᴡɴᴇʀ:* *𝐉𝐅𝐋𝐄𝐗 𝐎𝐆*`,
                    `*╰────────────┈平和*`,
                    ``,
                    `𝐓𝐡𝐞𝐬𝐞 𝐚𝐫𝐞 𝐭𝐡𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐲𝐨𝐮 𝐜𝐚𝐧 𝐮𝐬𝐞~ ツ`,
                    ``,
                    `*${cmd.category.toUpperCase()} :-*`,
                    "```",
                    `${cmd.name}`,
                    "```",
                    ``,
                    `⚠ *Note:*`,
                    `➪ Use ${prefix}help <command_name> for more info of a specific command`,
                    `➪ Example: ${prefix}help ${cmd.name}`,
                    `*> ©️𝐆𝐄𝐓𝐎-𝐁𝐎𝐓😈*`,
                ];

                var buttonss = [
                    { buttonId: `${prefix}help`, buttonText: { displayText: `help` }, type: 1 }
                ];

                let buth = {
                    text: `${data.join("\n")}`,
                    footer: "made by yush",
                    buttons: buttonss,
                    headerType: 1
                };

                return client.sendMessage(m.from, buth, { quoted: m });
            }
        } else {
            let cm = commands.keys();
            let category = {};

            for (let cmd of cm) {
                let info = commands.get(cmd);

                if (!cmd || !info.category || info.category === 'private' || (info.category === "Nsfw" && !nsfw.includes(m.from))) {
                    continue;
                }

                if (Object.keys(category).includes(info.category)) {
                    category[info.category].push(info);
                } else {
                    category[info.category] = [info];
                }
            }

            const emo = nsfw.includes(m.from)
                ? ["📈", "📖", "🍁", "🍀", "🌊", "🎵", "🔞", "🎟", "♨️", "🉐", "⚠️"]
                : ["📈", "📖", "🍁", "🍀", "🌊", "🎵", "🎟", "♨️", "🉐", "⚠️"];

            let txt = `*Hello (｡♡‿♡｡)* ${pushName} l'm *${process.env.NAME}*.\n\n`;
            txt += `*CARD-GAME :-*\n\`\`\`${category["CARD-GAME"].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            txt += `*DEV :-*\n\`\`\`${category["DEV"].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            txt += `*ECONOMY :-*\n\`\`\`${category["ECONOMY"].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            txt += `*FUN :-*\n\`\`\`${category["FUN"].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            txt += `*GENERAL :-*\n\`\`\`${category["GENERAL"].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            txt += `*GROUP :-*\n\`\`\`${category["GROUP"].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            txt += `*MEDIA :-*\n\`\`\`${category["MEDIA"].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            txt += `*UTILS :-*\n\`\`\`${category["UTILS"].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            txt += `📗 Type *${prefix}help* <Command-Name> or <Command-Name> --info\n`;

            const ari = await wall.getAnimeWall3();
            const arilogo = ari[Math.floor(Math.random() * ari.length)];

            client.sendMessage(m.from, { image: { url: arilogo.image }, caption: txt }, { quoted: m });
        }
    }
};
