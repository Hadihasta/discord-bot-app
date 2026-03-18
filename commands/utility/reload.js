const { SlashCommandBuilder } = require('discord.js')
// this scipt for hot reloading spesific command for e.g if you change the command you can reload it without restarting the bot
module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads a command.')
    .addStringOption((option) => option.setName('command').setDescription('The command to reload.').setRequired(true)),
  async execute(interaction) {
    console.log(interaction, " test")
    const commandName = interaction.options.getString('command', true).toLowerCase()
    const command = interaction.client.commands.get(commandName)
    if (!command) {
      return interaction.reply(`There is no command with name \`${commandName}\`!`)
    }
    const commandPath = require.resolve(`${__dirname}/${command.data.name}.js`)
    delete require.cache[commandPath]
    try {
      const newCommand = require(`${__dirname}/${command.data.name}.js`)
      interaction.client.commands.set(newCommand.data.name, newCommand)
      await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`)
    } catch (error) {
      console.error(error)
      await interaction.reply(
        `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
      )
    }
  },
}
