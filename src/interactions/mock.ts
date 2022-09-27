import { ApplicationCommandType } from 'discord-api-types/v10';
import { InteractionOptions } from '../typings';

export const mockCommand = {
	name: 'Mock',
	type: ApplicationCommandType.Message,
	dev: false,
} as InteractionOptions;

