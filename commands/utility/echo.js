const { SlashCommandBuilder, ChannelType, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('echo')
	.setDescription('Replies with your input!')
	.addStringOption((option) =>
		option
			.setName('input')
			.setDescription('The input to echo back')
			// Ensure the text will fit in an embed description, if the user chooses that option
			.setMaxLength(2_000),
	)
	.addChannelOption((option) =>
		option
			.setName('channel')
			.setDescription('The channel to echo into')
			// Ensure the user can only select a TextChannel for output
			.addChannelTypes(ChannelType.GuildText),
	)
	.addBooleanOption((option) => option.setName('embed').setDescription('Whether or not the echo should be embedded')),
	async execute(interaction) {
		const input = interaction.options.getString('input') ?? 'No input provided!';
		const channel = interaction.options.getChannel('channel') ?? interaction.channel;
		const useEmbed = interaction.options.getBoolean('embed') ?? false;

		if (useEmbed) {
			const embed = new EmbedBuilder().setDescription(input);
			await channel.send({ embeds: [embed] });
		} else {
			await channel.send(input);
		}

		if (channel.id !== interaction.channel.id) {
			await interaction.reply({ content: `Message sent to ${channel}!`, ephemeral: true });
		} else {
			await interaction.reply({ content: 'Done!', ephemeral: true });
		}
	},
};
