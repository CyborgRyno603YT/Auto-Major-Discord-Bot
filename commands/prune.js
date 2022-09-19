const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Prune up to 99 messages.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addIntegerOption(option => option.setName('amount').setDescription('Number of messages to prune')),
	async execute(interaction) {
		const amount = interaction.options.getInteger('amount');

		if (amount < 1 || amount > 99) {
<<<<<<< HEAD
			return interaction.reply({ content: 'You need to input a number between 1 and 99.', ephemeral: true });
		}
		if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
			await interaction.channel.bulkDelete(amount, true).catch(error => {
				console.error(error);
				interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true});
			return interaction.reply({ content: 'You need the \'Manage Messages\' permission to use that command.', ephemeral: true });
		})
		}
=======
			return interaction.reply({ content: 'You need to input a number between 1 and 99.', ephemeral: true })};
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
		});
>>>>>>> a30f9006e0450e0b15865ce3391b9e12daa2e2f7

		return interaction.reply({ content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true });
	},
};
