//Initial start up code
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActivityType, PermissionsBitField } = require('discord.js');
const { token } = require('./config.json');
//I added PermissionsBitField because I'm trying to figure out how to make /prune only work if you have the manage messages permission

//Starts a new client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//Defines where to find the commands and what file to run for each slash command
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

//I'm not 100% sure, but it's something with saying where the commands are I think?
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//Logs when the bot is ready to recieve commands and sets the status.
client.once('ready', () => {
	console.log('Ready!');
    client.user.setPresence({
		activities: [{name: 'my maker devolve into madness', type: ActivityType.Watching}],
		status:'online',
})});

//Tells the bot to execute the command it revieves and says if there's an error
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;
	if (commandName === 'prune') {
		if (!interaction.channel.permissionsFor(client.user).has(PermissionsBitField.Flags.ManageMessages, true)) {
			try {
			 await command.execute(interaction);
		}}}
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

//Login to Discord with the bot token
client.login(token);
