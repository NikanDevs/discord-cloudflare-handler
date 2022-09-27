import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord-api-types/v10';
import { InteractionOptions } from '../typings';

export const pingCommand = {
	name: 'ping',
	description: 'Pong!',
	type: ApplicationCommandType.ChatInput,
	dev: false,
	options: [
		{
			name: 'emojis',
			description: '🏓 👀',
			type: ApplicationCommandOptionType.Boolean,
			required: false,
		},
	],
} as InteractionOptions;

