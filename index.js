// Require the necessary discord.js classes
// node native moduless for reading files and paths
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.cooldowns = new Collection();
client.commands = new Collection();
// First, path.join() helps to construct a path to the commands directory. The first fs.readdirSync() method then reads the path to the directory and returns an array of all the folder names it contains, currently ['utility']. The second fs.readdirSync() method reads the path to this directory and returns an array of all the file names they contain, currently ['ping.js', 'server.js', 'user.js']. To ensure only command files get processed, Array.filter() removes any non-JavaScript files from the array.
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}



const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
// client.once(Events.ClientReady, (readyClient) => {
//   console.log(`Ready! Logged in as ${readyClient.user.tag}`)

//   console.log(process.env.A)
//   console.log(process.env.B + 9) // 1239 (this concatenates the number to the string!)
//   console.log(Number(process.env.C) + 9) // 132
//   console.log(process.env.DISCORD_TOKEN)
// })

// Log in to Discord with your client's token
client.login(token);
