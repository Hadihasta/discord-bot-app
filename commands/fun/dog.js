const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setNameLocalizations({
			pl: 'pies',
			de: 'hund',
		})
		.setDescription('Get a cute picture of a dog!')
		.setDescriptionLocalizations({
			pl: 'Słodkie zdjęcie pieska!',
			de: 'Poste ein niedliches Hundebild!',
		})
		.addStringOption((option) =>
			option
				.setName('breed')
				.setDescription('Breed of dog')
				.setNameLocalizations({
					pl: 'rasa',
					de: 'rasse',
				})
				.setDescriptionLocalizations({
					pl: 'Rasa psa',
					de: 'Hunderasse',
				}),
		),
	async execute(interaction) {
		const breed = interaction.options.getString('breed');
		const url = breed
			? `https://dog.ceo/api/breed/${breed}/images/random`
			: 'https://dog.ceo/api/breeds/image/random';

		await interaction.deferReply();
		try {
			const res = await fetch(url);
			const json = await res.json();
			if (json.status !== 'success') {
				return interaction.editReply('Could not find that breed. Try another one!');
			}
			await interaction.editReply(json.message);
		} catch (error) {
			console.error(error);
			await interaction.editReply('Failed to fetch a dog image. Try again later!');
		}
	},
};
