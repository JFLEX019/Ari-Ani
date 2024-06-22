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
                    `*🍁Command :* ${cmd.name.replace(/^\w/, c => c.toUpperCase())}`,
                    `*👾Alias :* ${cmd.alias.join(", ")}`,
                    `*🧾Description :* ${cmd.desc}`,
                    `*💡Example :* ${cmd.usage.replace(/%prefix/gi, prefix).replace(/%command/gi, cmd.name).replace(/%text/gi, text)}`,
                ];

                var buttonss = [
                    { buttonId: `${prefix}help`, buttonText: { displayText: `help` }, type: 1 }
                ];

                let buth = {
                    text: `*ℹ️Command Info*\n\n${data.join("\n")}`,
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

            let txt = `╭─ *「 (づ￣ ³￣)づ 」*\n`;
            txt += `*│ ɴᴀᴍᴇ:* 𝐆𝐄𝐓𝐎-𝐁𝐎𝐓😈\n`;
            txt += `*│ ᴜsᴇʀ: @${pushName} {}⁩*\n`;
            txt += `*│ ᴘʀᴇғɪx:* "${prefix}"\n`;
            txt += `*│ ᴏᴡɴᴇʀ:* *𝐉𝐅𝐋𝐄𝐗 𝐎𝐆*\n`;
            txt += `*╰────────────┈平和*\n\n`;
            txt += `𝐓𝐡𝐞𝐬𝐞 𝐚𝐫𝐞 𝐭𝐡𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐲𝐨𝐮 𝐜𝐚𝐧 𝐮𝐬𝐞~ ツ\n\n`;

            for (const [index, key] of Object.keys(category).entries()) {
                txt += `*${key.toUpperCase()} ${emo[index]} :-*\n\`\`\`${category[key].map(cmd => cmd.name).join(", ")}\`\`\`\n\n`;
            }

            txt += `📗 Type *${prefix}help* <Command-Name> or <Command-Name> --info\n`;
            txt += `⚠ *Note:*\n`;
            txt += `➪ Use ${prefix}help <command_name> for more info of a specific command\n`;
            txt += `➪ Example: ${prefix}help hello\n`;
            txt += `*> ©️𝐆𝐄𝐓𝐎-𝐁𝐎𝐓😈 02*\n`;

            const ari = await wall.getAnimeWall3();
            const arilogo = ari[Math.floor(Math.random() * ari.length)];

            client.sendMessage(m.from, { image: { url: arilogo.image }, caption: txt }, { quoted: m });
        }
    }
};
