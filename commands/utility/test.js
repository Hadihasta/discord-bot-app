const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder().setName('tesbot').setDescription('Test apakah bot aktif'),
	async execute(interaction) {
		await interaction.reply('Bot aktif! Halo dari BotMaster.');
	},
};
