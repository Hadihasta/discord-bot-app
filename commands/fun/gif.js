const { SlashCommandBuilder } = require('discord.js');

const gifLinks = {
	gif_funny: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
	gif_meme: 'https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif',
	gif_movie: 'https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif',
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('Sends a random gif!')
		.addStringOption((option) =>
			option
				.setName('category')
				.setDescription('The gif category')
				.setRequired(true)
				.addChoices(
					{ name: 'Funny', value: 'gif_funny' },
					{ name: 'Meme', value: 'gif_meme' },
					{ name: 'Movie', value: 'gif_movie' },
				),
		),
	async execute(interaction) {
		const category = interaction.options.getString('category');
		await interaction.reply(gifLinks[category]);
	},
};
