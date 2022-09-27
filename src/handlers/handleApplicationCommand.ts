import {
	APIApplicationCommandInteraction,
	APIChatInputApplicationCommandInteraction,
	APIMessageApplicationCommandInteraction,
	InteractionResponseType,
	MessageFlags,
} from 'discord-api-types/v10';
import { echoResponse } from '../functions/commands/echo';
import { mockResponse } from '../functions/commands/mock';
import { pingResponse } from '../functions/commands/ping';
import { interactions } from '../interactions';
import { ApplicationCommandOptions } from '../structures/ApplicationCommandOptions';
import { InteractionOptions } from '../typings';
import { respond } from '../util/respond';

export async function handleApplicationCommand(message: APIApplicationCommandInteraction) {
	const data = message.data;
	const command: InteractionOptions = interactions[Object.keys(interactions).find((cmd) => cmd === data.name)];
	if (!command)
		return respond({
			type: InteractionResponseType.ChannelMessageWithSource,
			data: { content: "❌ - This command doesn't exist.", flags: MessageFlags.Ephemeral },
		});

	try {
		const options = new ApplicationCommandOptions(message);

		switch (message.data.name) {
			case 'ping':
				return pingResponse(options);
			case 'echo':
				return echoResponse(message as APIChatInputApplicationCommandInteraction, options);

			case 'Mock':
				return mockResponse(message as APIMessageApplicationCommandInteraction);

			default:
				return respond({
					type: InteractionResponseType.ChannelMessageWithSource,
					data: { content: '❌ - This command is not handled.', flags: MessageFlags.Ephemeral },
				});
		}
	} catch (error) {
		return respond({
			type: InteractionResponseType.ChannelMessageWithSource,
			data: { content: 'Something went wrong.', flags: MessageFlags.Ephemeral },
		});
	}
}

