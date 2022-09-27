import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord-api-types/v10';
import { InteractionOptions } from '../typings';

export const echoCommand = {
	name: 'echo',
	description: 'Echo 🔈',
	type: ApplicationCommandType.ChatInput,
	dev: false,
	options: [
		{
			name: 'my-message',
			description: 'Echo your custom message!',
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: 'my-selection',
			description: 'Echo something you select!',
			type: ApplicationCommandOptionType.Subcommand,
		},
	],
} as InteractionOptions;

