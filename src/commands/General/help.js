const now = new Date();
const hour = now.getHours();
let greeting;
if (hour >= 0 && hour < 12) {
    greeting = "🌄 Good Morning"; // Good morning
} else if (hour >= 12 && hour < 18) {
    greeting = "🏞️ Good Afternoon"; // Good afternoon
} else {
    greeting = "🌃 Good Evening"; // Good evening
}

module.exports = {
    name: 'help',
    aliases: ['h', 'menu', 'list'],
    category: 'general',
    react: "😈",
    description: 'Displays the command list or specific command info',
    async execute(client, arg, M) {
        try {
            if (!arg) {
                let pushName = M.pushName.trim();

                if (pushName.split(' ').length === 1) {
                    pushName = `${pushName}`;
                }

                const categories = client.cmd.reduce((obj, cmd) => {
                    if (cmd.category) { // Only include commands with a category
                        const category = cmd.category;
                        obj[category] = obj[category] || [];
                        obj[category].push(cmd.name);
                    }
                    return obj;
                }, {});

                const commandList = Object.keys(categories);

                let commands = '';

                for (const category of commandList) {
                    commands += `*${client.utils.capitalize(
                        category,
                        true
                    )} :-*\n\`\`\`${categories[category].join(' , ')}\`\`\`\n\n`;
                }

                let message = `╭─「 (づ￣ ³￣)づ 」*\n*│ ɴᴀᴍᴇ:* 𝐆𝐄𝐓𝐎-𝐁𝐎𝐓😈\n*│ ᴜsᴇʀ: @⁨𝐉𝐅𝐋𝐄𝐗 𝐎𝐆 ${pushName}⁩*\n*│ ᴘʀᴇғɪx:* "${client.prefix}"\n*│ ᴏᴡɴᴇʀ:* *𝐉𝐅𝐋𝐄𝐗 𝐎𝐆*\n*╰────────────┈平和*\n\n𝐓𝐡𝐞𝐬𝐞 𝐚𝐫𝐞 𝐭𝐡𝐞 𝐜𝐨𝐦𝐦𝐚𝐧𝐝𝐬 𝐲𝐨𝐮 𝐜𝐚𝐧 𝐮𝐬𝐞~ ツ\n\n${commands}⚠ *Note:*\n\n *➪ Use ${client.prefix}help <command_name> for more info of a specific command*\n *➪ Example: ${client.prefix}help hello*\n*> ©️𝐆𝐄𝐓𝐎-𝐁𝐎𝐓😈*`;

                await client.sendMessage(
                    M.from,
                    {
                        text: message
                    },
                    {
                        quoted: M,
                    }
                );

                return;
            }

            const command = client.cmd.get(arg) || client.cmd.find((cmd) => cmd.aliases && cmd.aliases.includes(arg));

            if (!command) return M.reply('Command not found');

            const message = `☠ *Command:* ${command.name}\n🎴 *Aliases:* ${command.aliases.join(', ')}\n🔗 *Category:* ${command.category || 'None'}\n⏰ *Cooldown:* ${command.cooldown || 'None'}\n🎗 *Usage:* ${client.prefix}${command.name}\n🧧 *Description:* ${command.description}`;

            M.reply(message);
        } catch (err) {
            await client.sendMessage(M.from, { text: `${greeting} Error Deryl\n\nError:\n${err}` });
        }
    }
};
