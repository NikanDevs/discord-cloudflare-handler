import fetch from 'node-fetch';
import { interactions } from '../src/interactions/index';
import { InteractionOptions } from '../src/typings';
require('dotenv').config();

const token = process.env.DISCORD_TOKEN!;
const applicationId = process.env.DISCORD_APPLICATION_ID!;
const testGuild = process.env.DISCORD_TEST_GUILD_ID;

if (!token) throw new Error('DISCORD_TOKEN must be provided.');
if (!applicationId) throw new Error('DISCORD_APPLICATION_ID must be provided.');

const globalCommands = Object.values(interactions).filter((c) => !c.dev);
const devCommands = Object.values(interactions).filter((c) => c.dev);

async function registerCommands() {
	if (globalCommands.length) {
		const url = `https://discord.com/api/v10/applications/${applicationId}/commands`;
		await deploy(url, globalCommands);
	}

	if (devCommands.length) {
		if (!testGuild) throw new Error('DISCORD_TEST_GUILD_ID must be provided.');

		const url = `https://discord.com/api/v10/applications/${applicationId}/guilds/${testGuild}/commands`;
		await deploy(url, devCommands);
	}
}

async function deploy(url: string, commands: InteractionOptions[]) {
	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bot ${token}`,
		},
		method: 'PUT',
		body: JSON.stringify(commands),
	});

	if (response.ok) {
		console.log(
			`Application commands were registered (${globalCommands.length} globals, ${devCommands.length} devs)`
		);
	} else {
		console.log('Something went wrong whilst registering application commands.');
		console.error(await response.text());
	}

	return response;
}

(async () => {
	await registerCommands();
})();

