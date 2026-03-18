// Command Files
// The individual command files, containing slash command definitions and functionality.

// Command Handler
// The command handler, dynamically reads the command files and executes commands.

// Command Deployment
// The command deployment script to register your slash commands with Discord.


const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	cooldown: 5, 
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};


// const { SlashCommandBuilder } = require('discord.js');
// module.exports = {
// 	data: new SlashCommandBuilder().setName('user').setDescription('Provides information about the user.'),
// 	async execute(interaction) {
// 		// interaction.user is the object representing the User who ran the command
// 		// interaction.member is the GuildMember object, which represents the user in the specific guild
// 		await interaction.reply(
// 			`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`,
// 		);
// 	},
// };